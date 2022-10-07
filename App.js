import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { getAllUsers } from './sevices/userService';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import UserScreen from './pages/users';
import UserDetailsScreen from './pages/userDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="user">
          <Stack.Screen name="user" component={UserScreen} />
          <Stack.Screen name="userDetails" component={UserDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
