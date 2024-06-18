import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailScreen = ({navigation, route}) => {
  const {movie} = route.params;

  const goToHomePage = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.movieContainer}>
        <TouchableOpacity onPress={() => goToHomePage()} style={styles.button}>
          <Text style={styles.buttonText}>Go To Home Screen</Text>
        </TouchableOpacity>
        <Image source={{uri: movie.Poster}} style={styles.moviePoster} />
        <Text style={styles.movieTitle}>{movie.Title}</Text>
        <Text style={styles.movieYear}>{movie.Year}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  movieContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 30,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: 'white',
  },
  movieYear: {
    fontSize: 14,
    color: 'white',
  },
  moviePoster: {
    width: 300,
    height: 400,
    marginTop: 5,
  },
});

export default DetailScreen;
