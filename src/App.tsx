import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { ThemeProvider } from 'styled-components/native';
import theme from './theme';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <GestureHandlerRootView style={{flex: 1}}>
                <ThemeProvider theme={theme}>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                    <FlashMessage position="bottom" />
                </ThemeProvider>
            </GestureHandlerRootView>
        </NavigationContainer>
    );
}

export default App;