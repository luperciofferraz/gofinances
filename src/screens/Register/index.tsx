import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/Form/InputForm';
import { Modal } from 'react-native';
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
import { Amount } from '../../components/TransactionCard/styles';

interface FormData {
    name: string;
    amount: string;
}

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    const { control, handleSubmit } = useForm();

    function handleRegister(form: FormData) {

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data);
    }

    return (

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
                    />
                    
                    <InputForm 
                        name="amount"
                        control={control}
                        placeholder="Preço" 
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
    );
}