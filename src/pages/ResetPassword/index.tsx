import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Container, Content, Image } from './styles';

import logoImg from '../../assets/logomonensure.png';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import theme from '../../theme';
import { useAuth } from '../../contexts/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/auth.routes';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

type ResetPasswordProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>

const ResetPassword: React.FC = () => {

    const navigation = useNavigation<ResetPasswordProp>();

    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const { email, code, resetPassword } = useAuth();

    async function handleUserConfirmation()
    {
        const payload = {
            email,
            token: code,
            password,
            password_confirmation: passwordConfirmation
        }

        const response = await resetPassword(payload);
    
        if(response){
            navigation.navigate("SignIn");
        }
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <Image source={logoImg} resizeMode="contain"/>
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <Input
                        placeholder="Confirmação de Senha"
                        secureTextEntry
                        value={passwordConfirmation}
                        onChangeText={(value) => setPasswordConfirmation(value)}
                    />
                    <Button title="Confirmar" onPress={handleUserConfirmation}/>
                    <Button title="Voltar" style={{ backgroundColor: theme.COLORS.DANGER }} />
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default ResetPassword;