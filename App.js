import axios from 'axios';
import { View } from 'moti';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import Item from './src/components/Item/index'
import { colors } from './src/theme/index'
import { FixedHeader } from './src/components/fixedHeader/index';

function Loading({ hasMoreData }) {
  if (hasMoreData) {
    return <ActivityIndicator size={'large'} />
  }
  return null;
}

export default function App() {

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  
  // Versão com axios
  // const fetchApi = async () => {
  //   if (!hasMoreData) return;
  //   const { data } = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);

  //   if (data.results) {
  //     const current = data.results;
  //     setData(prev => [...prev, ...current]);

  //     if (data.info?.next) {
  //       setPage(prev => prev + 1);
  //     } else {
  //       setHasMoreData(false);
  //     }

  //   }

  // }

  const fetchApi = async () => {
    if (!hasMoreData) return;
    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const data = await response.json();

    if (data.results) {
      const current = data.results;
      // Tive que usar esse lógica: current.filter... para garantir que não haja cópias de itens/objetos no setData/data. Principalmente com o uso do fetch, no qual estava tendo problemas ao renderizar os novos itens/objetos. Com o uso do axios é mais tranquilo. De qualquer forma essa lógica garante que não haja dublicatas.
      setData(prev => [...prev, ...current.filter(item => !prev.some(existingItem => existingItem.id === item.id))]);

      if (data.info?.next) {
        setPage(prev => prev + 1);
      } else {
        setHasMoreData(false);
      }

    }

  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FixedHeader />
      <FlatList
        contentContainerStyle={{
          backgroundColor: colors.secondary,
        }}
        onEndReached={fetchApi}
        onEndReachedThreshold={0.1}
        data={data}
        ListHeaderComponent={<Text style={styles.headerComp}>Rick And Morty</Text>}
        ListFooterComponent={<Loading hasMoreData={hasMoreData} />}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return (
            <Item {...item} />
          )
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  headerComp: {
    backgroundColor: colors.onBackground,
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 5,
    marginBottom: 10,
  }
});