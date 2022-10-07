import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
    </PaperProvider>
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
