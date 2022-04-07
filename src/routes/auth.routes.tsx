import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ValidateResetCode from '../pages/ValidateResetCode';
import ResetPassword from '../pages/ResetPassword';

export type AuthStackParamList = { 
    SignIn: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    ValidateResetCode: undefined;
    ResetPassword: undefined;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="SignIn" component={SignIn}/>
            <AuthStack.Screen name="Register" component={Register}/>
            <AuthStack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <AuthStack.Screen name="ValidateResetCode" component={ValidateResetCode}/>
            <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;