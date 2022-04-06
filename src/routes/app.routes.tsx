import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from "../pages/Dashboard";

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Dashboard" component={Dashboard}/>
        </AppStack.Navigator>
    )
}

export default AppRoutes;