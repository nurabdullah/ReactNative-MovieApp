import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
// react kullanırken component isimleri dışında tüm isimlendirmeler camelCase olarak yazılımalı
type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const HomeScreen = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const goToDetailPage = movie => {
    navigation.navigate('Detail', {movie});
  };

  const renderItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => goToDetailPage(item)}>
      <Image source={{uri: item.Poster}} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{item.Title}</Text>
      <Text style={styles.movieYear}>{`Year: ${item.Year}`}</Text>
    </TouchableOpacity>
  );

  const onPress = () => {
    if (inputText.trim()) {
      const apiUrl = `https://www.omdbapi.com/?s=${inputText}&apikey=32327789`;
      axios
        .get(apiUrl)
        .then(res => {
          if (res.data.Search) {
            setMovies(res.data.Search);
          }
          setInputText('');
        })
        .catch(e => console.log(e));
    } else {
      Alert.alert('Lütfen bir film adı girin.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setInputText}
            value={inputText}
            placeholder="Film adı girin"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Arama yap</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },

  movieContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingBottom: 15,
  },
  moviePoster: {
    width: 200,
    height: 300,
    marginTop: 5,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    color: 'white',
  },
  movieYear: {
    fontSize: 14,
    color: 'white',
  },
});

export default HomeScreen;
