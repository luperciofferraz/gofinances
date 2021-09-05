import React from 'react';
import { HighlighCard } from '../../components/HighlightCard';
import { 
    Container, 
    Header, 
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards
} from './styles';

export function Dashboard() {

    return(
        
        <Container>

            <Header>

                <UserWrapper>

                    <UserInfo>

                        <Photo 
                            source={{ uri: 'https://avatars.githubusercontent.com/u/5264225?v=4'}}
                        />

                        <User>
                            
                            <UserGreeting>Olá,</UserGreeting>
                            
                            <UserName>Lupércio</UserName>

                        </User>


                    </UserInfo>

                    <Icon name='power' />

                </UserWrapper>


            </Header>

            <HighlightCards>
                <HighlighCard />
                <HighlighCard />
                <HighlighCard />
            </HighlightCards>
            
        </Container>

    );

}