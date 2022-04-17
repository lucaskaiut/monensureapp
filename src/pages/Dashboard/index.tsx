import * as React from 'react';
import { useAuth } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, FlatList, ListRenderItem, Touchable, TouchableOpacity, View } from 'react-native';

import { Avatar, Box, Container, GroupName, Loading, Name, Text } from './styles';
import theme from '../../theme';
import Bill from './Bill';
import { ScrollView } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';

interface Bills {
    id: string,
    category: {
        name: string,
        icon: string
    },
    description: string,
    supplier: {
        id: string,
        name: string
    },
    amount: number,
    due_date: string
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showAmounts, setShowAmounts] = React.useState(false);

    const HandleSignOut = () => {
        signOut();
    }

    const refreshList = () => {
        setRefreshing(true);
        setRefreshing(false);
    }

    const toggleShowAmounts = () => {
        setShowAmounts(!showAmounts);
    }

    const data: Bills[] = [
        {
            id: "1978914655464",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "15678994894",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "197898789712165",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "147894798789",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "15648949789",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "21315151",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "21312521",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "65123651412",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        },
        {
            id: "156489798789",
            category: {
                name: "Alimentação",
                icon: "cart-variant",
            },
            description: "Compra",
            supplier: {
                id: "huiodsahoiu21h3u2io3h",
                name: "Jacomar"
            },
            amount: 49.13,
            due_date: "2022-04-09"
        }

    ]

    return (
        <Container>
            <Box flexDirection='row' alignItems='center'>
                <Box flexDirection='row' width="90%" alignItems='center'>
                    <Avatar source={{ uri: user?.photo }} resizeMode="contain" />
                    <Box>
                        <Text fontWeight='bold'>{user?.firstname} {user?.lastname}</Text>
                        <Text>{user?.group?.name}</Text>
                    </Box>
                </Box>
                <Box flexWrap='wrap'>
                    <Icon name="menu" size={24} color={theme.COLORS.DARK} />
                </Box>
            </Box>

            <Box flexDirection='row' width="90%">
                <TouchableOpacity onPress={(event) => HandleSignOut()}>
                    <Icon name="calendar-month-outline" size={24} color={theme.COLORS.DARK} />
                </TouchableOpacity>
                <Icon name="plus" size={24} color={theme.COLORS.DARK} />
                <TouchableOpacity onPress={() => toggleShowAmounts()}>
                    <Icon name={showAmounts ? "eye-off-outline" : "eye-outline"} size={24} color={theme.COLORS.DARK} />
                </TouchableOpacity>
            </Box>
            <Box alignItems='flex-end'>
                <Text>
                    <NumberFormat
                        value={999999.99}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=','
                        decimalScale={2}
                        prefix="R$"
                        renderText={(value) => <Text>{showAmounts ? value : 'R$....'}</Text>}
                    />
                </Text>
            </Box>

            <FlatList
                data={data}
                renderItem={({ item }) => (<Bill bill={item} showAmounts={showAmounts} />)}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                onRefresh={refreshList}
                refreshing={refreshing}
            />

        </Container>
    )
}

export default Dashboard;