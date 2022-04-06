import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import * as auth from '../services/auth';
import { showMessage } from 'react-native-flash-message';

interface SignInProps {
    email: string,
    password: string
}

interface RegisterProps {
    group_name: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
    phone: string
}

interface UserData {
    id: string,
    group: {
        id: string,
        name: string,
        created_at: string,
        updated_at: string
    },
    firstname: string,
    lastname: string,
    email: string,
    photo: string,
    phone: string,
    created_at: string,
    updated_at: string
}

interface AuthContextData {
    signed: boolean;
    user: UserData | null;
    loading: boolean;
    signIn(user: SignInProps | null): Promise<void>;
    register(user: RegisterProps | null): Promise<void>;
    signOut(): void;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children, navigation }) => {

    const [user, setUser] = React.useState<UserData | null>(null);    
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadStorageData(){
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

            if(storagedToken && storagedUser){
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`; 
                setUser(JSON.parse(storagedUser));
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(user: SignInProps | null) {
        setLoading(true);

        try {
            const response = await auth.signIn(user);
        
            setUser(response.user);
    
            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
            await AsyncStorage.setItem('@RNAuth:token', response.token);
            
        } catch (error) {
            showMessage({
                message: `${error.response?.data?.message}`,
                type: "danger",
            });
        }

        setLoading(false);
    }

    async function register(user: RegisterProps | null) {
        setLoading(true);

        try {
            const response = await auth.register(user);

            showMessage({
                message: "Usuário criado com sucesso. Faça login para continuar.",
                type: "success",
            });
        } catch (error) {
            showMessage({
                message: `${error.response?.data?.message}`,
                type: "danger",
            });
        }

        setLoading(false);
    }
    
    function signOut() {
        setLoading(true);

        AsyncStorage.clear().then(() => {
            setUser(null);
        });

        setLoading(false);
    }

    return (
        <AuthContext.Provider value={ { signed: !!user, user, loading, signIn, register, signOut } }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;

export function useAuth() {
    const context = React.useContext(AuthContext);

    return context;
}