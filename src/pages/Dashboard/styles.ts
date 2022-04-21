import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal } from 'react-native-paper';
import styled from 'styled-components/native';

interface BoxProps {
    padding?: string,
    alignItems?: string,
    flexDirection?: string,
    width?: string,
    backgroundColor?: string,
    flexWrap?: string,
    border?: string,
    radius?: number,
    marginBottom?: number,
    justifyContent?: string
}

interface TextProps {
    fontWeight?: string;
    fontSize?: number;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    padding: 20px;
    align-items: center;
`;

export const Header = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    height: 100px;
`;

export const Avatar = styled.Image`
    width: 76px;
    height: 76px;
    border-radius: 200px;
    margin-right: 10px;
`;

export const Box = styled.View<BoxProps>`
    padding: ${props => props.padding ?? '5px'};
    align-items: ${props => props.alignItems ?? 'flex-start'};
    flex-direction: ${props => props.flexDirection ?? 'column'};
    width: ${props => props.width ?? '100%'};
    justify-content: ${props => props.justifyContent ?? 'space-between'};
    background-color: ${props => props.backgroundColor ?? ''};
    flex-wrap: ${props => props.flexWrap ?? 'nowrap'};

    border: ${props => props.border ? 'solid 1px ' + props.border : 'none' };
    border-radius: ${props => props.radius ?? '0'}px;
    margin-bottom: ${props => props.marginBottom ?? '0'}px;
`;

export const Name = styled.Text`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Text = styled.Text<TextProps>`
    font-size: ${props => props.fontSize ?? '14'}px;
    font-weight: ${props => props.fontWeight ?? 'normal'};
`;


export const GroupName = styled.Text``;

export const Buttons = styled.View`
    width: 100%; 
    margin-top: 20px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#999'
})`
    margin: 30px 0;
`;

export const Touchable = styled(TouchableOpacity)`
    align-items: center;
`;