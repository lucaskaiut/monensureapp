import * as React from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    const HandleSignOut = () => {
        signOut();
    }

    return (
        <View style={styles.container}>
            <Text>{  user?.firstname }</Text>
            <Button title="Sign Out" onPress={HandleSignOut}/>
        </View>
    )
}

export default Dashboard;