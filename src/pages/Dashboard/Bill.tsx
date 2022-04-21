import moment from 'moment';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberFormat from 'react-number-format';

import theme from '../../theme';
import { Box, Text } from './styles';


interface Props {
    bill: {
        id: string,
        category: {
            name: string,
            icon: string
        },
        supplier: string,
        description: string,
        amount: number,
        due_at: string,
        is_paid: boolean
    },
    showAmounts: boolean
}

const Bill: React.FC<Props> = ({ bill, showAmounts }) => {

    var localLocale = moment(bill.due_at);
    localLocale.locale('pt-BR');

    return (
        <Box flexDirection='row' >
            <Box flexDirection='row' marginBottom={20} justifyContent='flex-start' alignItems='center' width="50%">
                <Box width="50px" border={ theme.COLORS.PRIMARY } radius={40} alignItems="center" justifyContent='center'>
                    <Icon name={ bill.category.icon ?? 'cart' } size={36} color={ theme.COLORS.PRIMARY } />
                </Box>
                <Box>
                    <Text fontWeight='bold' fontSize={18}>{ bill.description }</Text>
                    <Text fontWeight='300' fontSize={14}>{ bill.category.name }</Text>
                </Box>
            </Box>
            <Box marginBottom={20} width="50%">
                <Box alignItems='flex-end'>
                    <NumberFormat 
                        value={bill.amount}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=','
                        decimalScale={2}
                        prefix="R$"
                        renderText={(value) => <Text>{showAmounts ? value : 'R$....'}</Text>}
                    />
                    <Text fontWeight='300' fontSize={14}>{ localLocale.format('DD [de] MMMM') }</Text>
                </Box>
            </Box>
        </Box>
    )

}

export default Bill;