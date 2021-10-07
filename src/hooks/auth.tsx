import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const CLIENT_ID = process.env.CLIENT_ID;
//const REDIRECT_URI = process.env.REDIRECT_URI;
interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

interface AuthorizationResponse {
    
    params: {
        access_token: string;
    };

    type: string;
}

export const AuthContext = createContext({ } as IAuthContextData);

function AuthProvider({ children } : AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    const userStorageKey = '@gofinances:user';

    async function signInWithGoogle() {

        try {

            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const REDIRECT_URI = process.env.CLIENT_ID;
            const CLIENT_ID = process.env.REDIRECT_URI;

            console.log(CLIENT_ID);
            console.log(REDIRECT_URI);

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
            
            if (type === 'success') {
                
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);   
                
                const userInfo = await response.json();

                const userLogged = {

                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    photo: userInfo.picture

                }

                console.log(userInfo);
                console.log(userLogged);

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }
        }
        catch(error) {
            throw new Error(error);
        }

    }

    async function signOut() {
        await AsyncStorage.removeItem(userStorageKey);
        setUser({} as User);
    }

    async function signInWithApple() {

        try {

            const credential = await AppleAuthentication.signInAsync({

                requestedScopes: [

                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,

                ]

            });

            if (credential) {
                
                const name = credential.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

                const userLogged = {

                    id: String(credential.user),
                    email: credential.email!,
                    name,
                    photo 

                }

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

        }
        catch(error) {
            throw new Error(error);
        }

    }

    useEffect(()=> {

        loadUserStorageData();

    } , []);

    async function loadUserStorageData() {

        const userStoraged = await AsyncStorage.getItem(userStorageKey);

        if (userStoraged) {
            const userLogged = JSON.parse(userStoraged) as User;
            setUser(userLogged);
        }

        setUserStorageLoading(false);

    }

    return (

        <AuthContext.Provider value = { 
            { user, 
              signInWithGoogle, 
              signInWithApple, 
              signOut,
              userStorageLoading 
            } }>

            { children }

        </AuthContext.Provider>

    );
}

function useAuth() {
    
    const context = useContext(AuthContext);

    return context;
}


export { AuthProvider, useAuth };