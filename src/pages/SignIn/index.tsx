import * as React from 'react';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Container, Content, ForgotPassword, RegisterText, CreateAccountText, Image } from './styles';

import logoImg from '../../assets/logomonensure.png';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/auth.routes';
import { useNavigation } from '@react-navigation/native';

type SignInProp = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>

const SignIn: React.FC = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const navigation = useNavigation<SignInProp>();
    
    function handleUserLogin(){
        setLoading(true);

        if(email && password){
            signIn({ email, password });
        }

        setLoading(false);
    }

    function handleForgotPassword()
    {
        navigation.navigate("ForgotPassword");
    }

    function handleCreateAccount()
    {
        navigation.navigate("Register");
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <Image source={logoImg} resizeMode="contain"/>
                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize='none'
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                    />
                    <Input
                        placeholder="Senha"
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={handleForgotPassword}><ForgotPassword>Esqueci minha senha</ForgotPassword></TouchableOpacity>
                    <Button loading={ loading } onPress={handleUserLogin} title="Entrar" />
                    <TouchableOpacity onPress={handleCreateAccount}><RegisterText>Ainda não tem conta? <CreateAccountText>Criar Conta</CreateAccountText></RegisterText></TouchableOpacity>
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default SignIn;