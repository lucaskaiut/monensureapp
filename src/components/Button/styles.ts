import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 10px;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.DARK};
  margin-bottom: 8px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.COLORS.WHITE};
`;