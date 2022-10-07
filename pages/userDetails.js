import React, { useState, useEffect } from 'react';
import { View, Text, Linking, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { getUserByName } from '../sevices/userService';

const UserDetailsScreen = ({ navigation, route }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { item } = route?.params

    useEffect(() => {
        _getAllUserDetails();
    }, [])

    const _getAllUserDetails = async () => {
        try {
            const res = await getUserByName(item?.nickname);
            if (res) {
                setUser(res);
                setIsLoading(false);
            } else {
                console.log('error occurs while getting user details!');
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <View style={{ margin: 10 }}>
            {isLoading ? <ActivityIndicator size='large' /> : (
                <ScrollView>
                    <Text style={{ textAlign: 'center', fontSize: 20, padding: 5 }}>Basic Data Section</Text>
                    <Card>
                        <Card.Title title={user?.nickname} />
                        <Card.Actions style={{ justifyContent: 'space-between', marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, color: 'green' }}>Contribution count: {user?.contributions_count}</Text>
                            <Button mode="outlined" onPress={() =>
                                Linking.openURL(user?.github_profile)
                            }>Github link</Button>
                        </Card.Actions>
                    </Card>

                    {user?.organisations?.length > 0 && (
                        <Text style={{ textAlign: 'center', fontSize: 20, padding: 5, marginTop: 10 }}>Organization section</Text>
                    )}
                    {user && user?.organisations?.map((el, i) => (
                        <View key={i} style={{ marginBottom: 1 }}>
                            <Card>
                                <Card.Actions style={{ justifyContent: 'space-between', marginHorizontal: 10 }}>
                                    <View style={{ width: '70%', flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source={{
                                                uri: el?.avatar_url,
                                            }}
                                        />
                                        <Text style={{ fontSize: 16, color: 'green', marginLeft: 10 }}>{el?.login}</Text>
                                    </View>
                                    <Button mode="outlined" onPress={() =>
                                        Linking.openURL(el?.link)
                                    }>Link</Button>
                                </Card.Actions>
                            </Card>
                        </View>
                    ))
                    }

                    {user?.pull_requests?.length > 0 && (
                        <Text style={{ textAlign: 'center', fontSize: 20, padding: 5, marginTop: 10 }}>Pull requests</Text>
                    )}
                    {user && user?.pull_requests?.map((el, i) => (
                        <View key={i} style={{ borderWidth: 1, borderColor: '#DDD', backgroundColor: '#FFFF', marginBottom: 5, borderRadius: 9 }}>
                            <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
                                <Text style={{ flex: 1, color: 'green', fontSize: 16, fontWeight: '700' }}>Title:</Text>
                                <Text style={{ flex: 2, color: 'green', fontSize: 16, fontWeight: '700' }}>{el?.title}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 10 }}>
                                <Text style={{ flex: 1 }}>Repo Name:</Text>
                                <Text style={{ flex: 2 }}>{el?.repo_name}</Text>
                            </View>

                            <TouchableOpacity style={{ backgroundColor: 'gray', padding: 5, marginTop: 10 }} mode="outlined" onPress={() =>
                                Linking.openURL(el?.issue_url)
                            }><Text style={{ color: '#FFFF', textAlign: 'center', fontSize: 14, fontWeight: '700' }}>Link to the PR</Text></TouchableOpacity>
                        </View>
                    ))
                    }

                </ScrollView>
            )}
        </View>
    );
}

export default UserDetailsScreen;