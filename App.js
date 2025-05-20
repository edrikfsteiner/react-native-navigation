import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const response = await fetch('http://www.omdbapi.com/?s=spider%20man&apikey=1cd66749');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailScreen} />
        <Stack.Screen name="movies" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home</Text>
      <Button
        title="Detalhes"
        onPress={() => navigation.navigate("details")}>
      </Button>
    </View>
  );
}

function DetailScreen({ navigation }) {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detalhes</Text>
      <Button
        title="Home"
        onPress={() => navigation.goBack()}>
      </Button>
      <Button
        title="Listar filmes"
        onPress={() => navigation.navigate("movies")}>
      </Button>
    </View>
  );
}

function MovieScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMovies = async () => {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Filmes</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate("home")}>
      </Button>
      <Button
        title="Detalhes"
        onPress={() => navigation.navigate("details")}>
      </Button>
      {isLoading ? 
        (<ActivityIndicator />) : 
        (
          <View>
            {data.map((item) => (
              <Text key={item.id}>{item.title} - {item.releaseYear}</Text>
            ))}
          </View>
        )
      }
    </View>
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
