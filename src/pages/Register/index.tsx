import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';

import { Container, Content } from './styles';

const Register: React.FC = ({ navigation }) => {
    const [groupName, setGroupName] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const { register } = useAuth();

    function handleUserRegister() {
        const user = {
            group_name: groupName,
            firstname,
            lastname,
            email,
            password,
            password_confirmation: passwordConfirmation,
            phone
        }

        register(user);
    }

    function handleBack() {
        navigation.navigate("SignIn");
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <Input
                        placeholder="Nome do grupo"
                        value={groupName}
                        onChangeText={(value) => setGroupName(value)}
                    />
                    <Input
                        placeholder="Nome"
                        value={firstname}
                        onChangeText={(value) => setFirstname(value)}
                    />
                    <Input
                        placeholder="Sobrenome"
                        value={lastname}
                        onChangeText={(value) => setLastname(value)}
                    />
                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <Input
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        value={passwordConfirmation}
                        onChangeText={(value) => setPasswordConfirmation(value)}
                    />
                    <Input
                        placeholder="Telefone"
                        secureTextEntry
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                    />
                    <Button onPress={handleUserRegister} title="Cadastrar" />
                    <Button onPress={handleBack} title="Voltar" />
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default Register;