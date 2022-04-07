import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Container, Content, Image, ForgotPasswordText } from './styles';

import logoImg from '../../assets/logomonensure.png';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import theme from '../../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/auth.routes';
import { useNavigation } from '@react-navigation/native';

type ForgotPasswordProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>

const ForgotPassword: React.FC = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const navigation = useNavigation<ForgotPasswordProp>();

    async function handleUserForgotPassword() {
        setLoading(true);

        const response = await forgotPassword(email);

        setLoading(false);

        if(response){
            navigation.navigate("ValidateResetCode");
        }
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <Image source={logoImg} resizeMode="contain"/>
                    <ForgotPasswordText>
                        Enviaremos um código de redefinição de senha para seu e-mail
                    </ForgotPasswordText>
                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize='none'
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                    />
                    <Button loading={ loading } title="Confirmar" onPress={handleUserForgotPassword} />
                    <Button loading={ loading } title="Voltar" style={{ backgroundColor: theme.COLORS.DANGER }} />
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default ForgotPassword;