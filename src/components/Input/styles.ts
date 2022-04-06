import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const InputText = styled(TextInput) <Props>`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.WHITE};
  color: ${({theme}) => theme.COLORS.GREY};
  padding: 5px 23px;
  border-radius: 8px;

  text-align: center;

  ${({ isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${({theme}) => theme.COLORS.DANGER};    
  `};
`;