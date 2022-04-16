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

export const Image = styled.ImageBackground`
    width: 100%;
    height: 200px;
    margin-bottom: 60px;
`;
