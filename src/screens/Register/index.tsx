import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { 
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import uuid from 'react-native-uuid';


import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

import { 

    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,

} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .required('Preço é obrigatório')
        .positive('O valor não pode ser negativo')
});

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const navigation = useNavigation();

    const { 
        control, 
        handleSubmit,
        reset, 
        formState: { errors } 
    } = useForm( { 
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {

        const datakey = '@gofinances:transactions';

        if (!transactionType) {
            return Alert.alert('Selecione o Tipo de Transação');
        }

        if (category.key === 'category') {
            return Alert.alert('Selecione a Categoria');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            
            const data = await AsyncStorage.getItem(datakey);
            
            const currentData = data ? JSON.parse(data) : [];
            
            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(datakey, JSON.stringify(dataFormatted));

            reset();

            setTransactionType('');

            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');

        }
        catch(error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            
            <Header>
            
                <Title>Cadastro</Title>
            
            </Header>

            <Form>
                
                <Fields>

                    <InputForm 
                        name="name"
                        control={control}
                        placeholder="Nome" 
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    
                    <InputForm 
                        name="amount"
                        control={control}
                        placeholder="Preço" 
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
                    />

                    <TransactionsTypes>

                        <TransactionTypeButton
                            onPress={() => handleTransactionsTypeSelect('up')}
                            title='Income'
                            type='up'
                            isActive={transactionType === 'up'}
                        />

                        <TransactionTypeButton
                            onPress={() => handleTransactionsTypeSelect('down')}
                            title='Outcome'
                            type='down'
                            isActive={transactionType === 'down'}
                        />

                    </TransactionsTypes>

                    <CategorySelectButton 
                        title = {category.name} 
                        onPress={handleOpenSelectCategoryModal}
                    />

                </Fields>

                <Button 
                    title='Enviar' 
                    onPress={handleSubmit(handleRegister)}
                />

            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>

        </Container>
        </TouchableWithoutFeedback>
    );
}