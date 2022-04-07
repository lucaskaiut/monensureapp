import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function Button({ loading, title, ...rest }: Props) {
  return (

    <Container {...rest} disabled={ loading }>

      { loading && (<ActivityIndicator size="small" />) }

      { ! loading && (
        <Title>
          {title}
        </Title>
      )}

    </Container>
  );
}