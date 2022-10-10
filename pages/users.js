import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Linking, Text } from 'react-native';
import { Button, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { getAllUsers } from '../sevices/userService';

const UserScreen = ({ navigation, route }) => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _getAllUser();
    }, [])

    const _getAllUser = async () => {
        try {
            const res = await getAllUsers();
            if (res?.length > 0) {
                setUserList(res);
                setIsLoading(false);
            } else {
                console.log('error occurs while getting user list!');
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <View>
            <ScrollView>
                {isLoading ? <ActivityIndicator size='large' /> : (
                    userList && userList?.map((el, i) => (
                        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }} key={i}>
                            <Card>
                                <Card.Title title={`${i+1}. ${el?.nickname}`} />
                                <Card.Actions style={{ justifyContent: 'space-between' }}>
                                    <Button mode="contained" onPress={() => navigation.navigate('userDetails', { item: el })}>See Details</Button>
                                    <Button mode="outlined" onPress={() =>
                                        Linking.openURL(el?.github_profile)
                                    }>Github link</Button>
                                </Card.Actions>
                            </Card>
                        </View>
                    ))
                )}
                <View style={{ height: 30 }}></View>
            </ScrollView>
        </View>
    );
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});