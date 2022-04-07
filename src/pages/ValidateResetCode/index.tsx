import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Container, Content, Image } from './styles';

import logoImg from '../../assets/logomonensure.png';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import theme from '../../theme';
import { AuthStackParamList } from '../../routes/auth.routes';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

type ValidateResetProp = NativeStackNavigationProp<AuthStackParamList, 'ValidateResetCode'>

const ValidateResetCode: React.FC = () => {
    const [code, setCode] = React.useState('');

    const { setResetCode } = useAuth();

    const navigation = useNavigation<ValidateResetProp>();

    function handleUserConfirmation(){
        if(code){
            setResetCode(code);
            navigation.navigate("ResetPassword");
        }
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <Image source={logoImg} resizeMode="contain"/>
                    <Input
                        placeholder="Código de Verificação"
                        keyboardType="numeric"
                        onChangeText={(value) => setCode(value)}
                        value={code}
                    />
                    <Button title="Confirmar" onPress={handleUserConfirmation} />
                    <Button title="Voltar" style={{ backgroundColor: theme.COLORS.DANGER }} />
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default ValidateResetCode;