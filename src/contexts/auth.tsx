import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import api from '../services/api';
import * as auth from '../services/auth';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../routes/auth.routes';
import { HeadersDefaults } from 'axios';

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
    signIn(user: SignInProps | null): Promise<void>;
    register(user: RegisterProps | null): Promise<void>;
    signOut(): void;
    forgotPassword(email: string): Promise<boolean>;
}

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}
 

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = React.useState<UserData | null>(null);    

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    React.useEffect(() => {
        async function loadStorageData(){
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

            if(storagedToken && storagedUser){
                
                api.defaults.headers = {
                    Authorization: `Bearer ${storagedToken}`
                } as CommonHeaderProperties;

                setUser(JSON.parse(storagedUser));
            }

        }

        loadStorageData();
    }, []);

    async function signIn(user: SignInProps | null) {

        try {
            const response = await auth.signIn(user);
        
            setUser(response.user);
    
            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
            await AsyncStorage.setItem('@RNAuth:token', response.token);
            
        } catch (error: any) {
            showMessage({
                message: `${error.response?.data?.message}`,
                type: "danger",
            });
        }

    }

    async function register(user: RegisterProps | null) {

        try {
            const response = await auth.register(user);

            showMessage({
                message: "Usuário criado com sucesso. Faça login para continuar.",
                type: "success",
            });
        } catch (error: any) {
            showMessage({
                message: `${error.response?.data?.message}`,
                type: "danger",
            });
        }

    }
    
    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    async function forgotPassword (email: string): Promise<boolean>
    {
        try {
            await auth.forgotPassword(email);

            return true;
        } catch (error: any) {

            showMessage({
                message: `${error.response?.data?.message}`,
                type: "danger",
            });

            return false;
        }

        
    }

    return (
        <AuthContext.Provider value={ { signed: !!user, user, signIn, register, signOut, forgotPassword } }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;

export function useAuth() {
    const context = React.useContext(AuthContext);

    return context;
}