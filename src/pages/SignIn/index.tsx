import * as React from 'react';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Container, Content, ForgotPassword, RegisterText, CreateAccountText, Image } from './styles';

import logoImg from '../../assets/logomonensure.png';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = ({navigation}) => {
    const { signIn } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    function handleUserLogin(){
        if(email && password){
            signIn({email, password});
        }
    }

    function handleForgotPassword()
    {

    }

    function handleCreateAccount()
    {
        navigation.navigate('Register');
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
                    <Button onPress={handleUserLogin} title="Entrar" />
                    <TouchableOpacity onPress={handleCreateAccount}><RegisterText>Ainda não tem conta? <CreateAccountText>Criar Conta</CreateAccountText></RegisterText></TouchableOpacity>
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default SignIn;