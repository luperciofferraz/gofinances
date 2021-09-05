import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlighCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
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
    HighlightCards,
    Transactions,
    Title,
    TransactionList
} from './styles';

const data = [

    {
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
        name: 'Vendas',
        icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },
    {
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
        name: 'Vendas',
        icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },
    {
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
        name: 'Vendas',
        icon: 'dollar-sign'
        },
        date: "13/04/2020"
    }

];


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
                <HighlighCard 
                    type = 'up'
                    title = 'Entradas'
                    amount = 'R$ 17.400,00'
                    lastTransaction = 'Últma entrada dia 13 de abril'
                />
                <HighlighCard 
                    type = 'down'
                    title = 'Saídas'
                    amount = 'R$ 1.259,00'
                    lastTransaction = 'Última saída dia 03 de abril'
                />
                <HighlighCard 
                    type = 'total'
                    title = 'Total'
                    amount = 'R$ 16.141,00'
                    lastTransaction = '01 à 16 de abril'
                />
            </HighlightCards>
            
            <Transactions>

                <Title>Listagem</Title>

                <TransactionList 
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={item} /> }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ 
                        paddingBottom: getBottomSpace()
                    }}
                />

            </Transactions>

        </Container>

    );

}