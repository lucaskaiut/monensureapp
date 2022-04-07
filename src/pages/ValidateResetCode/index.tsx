import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Container, Content, Image } from './styles';

import logoImg from '../../assets/logomonensure.png';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import theme from '../../theme';

const ValidateResetCode: React.FC = () => {
    const [code, setCode] = React.useState('');

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
                    <Button title="Confirmar" />
                    <Button title="Voltar" style={{ backgroundColor: theme.COLORS.DANGER }} />
                </Content>
            </TouchableWithoutFeedback>

        </Container>
    );
}

export default ValidateResetCode;