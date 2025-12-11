import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import WelcomeView from './screens/WelcomeView';
import ButtonIncrementView from './screens/ButtonIncrementView';
import ButtonDecrementView from './screens/ButtonDecrementView';
import SummaryView from './screens/SummaryView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='WelcomeView' component={WelcomeView} />
        <Stack.Screen name='ButtonIncrementView' component={ButtonIncrementView} />
        <Stack.Screen name='ButtonDecrementView' component={ButtonDecrementView} />
        <Stack.Screen name='SummaryView' component={SummaryView} />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
