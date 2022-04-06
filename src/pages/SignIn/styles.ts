import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.PRIMARY};
`;

export const Content = styled.View`
    padding: 0 40px;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ForgotPassword = styled.Text`
    margin-bottom: 30px;
    margin-top: 5px;
    color: ${({theme}) => theme.COLORS.DARK};
    font-weight: bold;
`;

export const RegisterText = styled.Text`
    margin-top: 30px;
    color: ${({theme}) => theme.COLORS.ICE};
`;

export const CreateAccountText = styled.Text`
    color: ${({theme}) => theme.COLORS.DARK}
`;

export const Image = styled.ImageBackground`
    width: 100%;
    height: 250px;
`;