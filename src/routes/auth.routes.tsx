import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import Register from '../pages/Register';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="SignIn" component={SignIn}/>
            <AuthStack.Screen name="Register" component={Register}/>
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;