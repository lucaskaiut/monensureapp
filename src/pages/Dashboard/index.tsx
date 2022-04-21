import * as React from 'react';
import { useAuth } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-date-picker';

import { Avatar, Box, Container, Loading, Text, Touchable } from './styles';
import theme from '../../theme';
import Bill from './Bill';
import api from '../../services/api';
import Modal from '../../components/Modal';
import { Input } from '../../components/Input';
import moment from 'moment';

interface Bills {
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
}

interface Filters {
    due_after?: string,
    due_before?: string
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showAmounts, setShowAmounts] = React.useState(false);
    const [bills, setBills] = React.useState<Bills[]>([]);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);
    const [billsTotal, setBillsTotal] = React.useState(0);
    const [filters, setFilters] = React.useState<Filters>({});
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);
    const [modalFilter, setModalFilter] = React.useState(false);
    const [dueAfter, setDueAfter] = React.useState(new Date());
    const [datePickerParameter, setDatePickerParameter] = React.useState('');

    React.useEffect(() => {
        loadPage();
    }, []);

    async function refreshList() {
        setRefreshing(true);

        await loadPage(1, true);

        setRefreshing(false);
    }

    const handleChangeFilters = async (key: string, value: any) => {
        setFilters({ ...filters, [key]: value });
    }

    const toggleShowAmounts = () => {
        setShowAmounts(!showAmounts);
    }

    const toggleModalFilter = () => {
        setModalFilter(!modalFilter);
    }

    const toggleDatePickerOpen = () => {
        setDatePickerOpen(!datePickerOpen);
    }

    async function loadPage(pageNumber = page, shouldRefresh = false) {
        if (total && pageNumber > total) return;

        setLoading(true);

        try {

            let queryParams = '';

            for (key in filters) {
                let param = `filter[${key}]=${filters[key]}`;
                queryParams = `${queryParams}&${param}`;
            }

            const response = await api.get(`/bill?page=${pageNumber}&per_page=8${queryParams}`);

            setBillsTotal(response.data.additional.total);

            const data = response.data.data;

            const totalItems = response.data.pagination.total;

            setTotal(Math.floor(totalItems / response.data.pagination.last_page));

            setBills(shouldRefresh ? data : [...bills, ...data]);

            setPage(pageNumber + 1);
        } catch (error: any) {
            showMessage({
                message: `${error.response?.data?.message ?? 'Oops! Algo deu errado em nossos servidores.'}`,
                type: "danger",
                animated: true,
                duration: 5000
            });
        }

        setLoading(false);
    }

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
                <TouchableOpacity onPress={() => toggleModalFilter()}>
                    <Icon name="filter-menu-outline" size={24} color={theme.COLORS.DARK} />
                </TouchableOpacity>
                <Icon name="plus" size={24} color={theme.COLORS.DARK} />
                <TouchableOpacity onPress={() => toggleShowAmounts()}>
                    <Icon name={showAmounts ? "eye-off-outline" : "eye-outline"} size={24} color={theme.COLORS.DARK} />
                </TouchableOpacity>
            </Box>
            <Box alignItems='flex-end'>
                <Text>
                    <NumberFormat
                        value={billsTotal}
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
                data={bills}
                renderItem={({ item }) => (<Bill bill={item} showAmounts={showAmounts} />)}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                onRefresh={refreshList}
                refreshing={refreshing}
                ListFooterComponent={loading ? <Loading /> : <></>}
                onEndReached={() => loadPage()}
            />

            <Modal
                visible={modalFilter}
                onDismiss={() => {
                    toggleModalFilter()
                    loadPage(1, true)
                }}
            >
                <Box justifyContent='space-between' alignItems='center' flexDirection='row'>
                    <Touchable onPress={() => {
                        toggleDatePickerOpen();
                        setDatePickerParameter('due_after');
                    }}>
                        <Icon name="calendar" size={24} color={theme.COLORS.DARK} />
                        <Text fontWeight='bold'>Vencimento Inicial:</Text>
                        <Text>{moment(filters.due_after).format('DD/MM/YYYY')}</Text>
                    </Touchable>

                    <Touchable onPress={() => {
                        toggleDatePickerOpen();
                        setDatePickerParameter('due_before');
                    }}>
                        <Icon name="calendar" size={24} color={theme.COLORS.DARK} />
                        <Text fontWeight='bold'>Vencimento Final:</Text>
                        <Text>{moment(filters.due_before).format('DD/MM/YYYY')}</Text>
                    </Touchable>
                </Box>
            </Modal>

            <DatePicker
                date={new Date()}
                modal
                mode='date'
                onCancel={() => toggleDatePickerOpen()}
                onConfirm={(date) => {
                    handleChangeFilters(datePickerParameter, moment(date).format('YYYY-MM-DD'))
                }}
                open={datePickerOpen}
                title={null}
                confirmText="Confirmar"
                cancelText='Cancelar'
            />


        </Container>
    )
}

export default Dashboard;