import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { DARK, s } from '../theme';
import { brl } from '../utils/helpers';
import { Tela } from '../components/Tela';
import { Foto } from '../components/Foto';
import { Menu } from '../components/Menu';
import { Campo } from '../components/Campo';

export const Catalogo = ({ ir, ctx }) => {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroApi, setErroApi] = useState('');

  const qtd = ctx.cart.reduce((a, i) => a + i.qtd, 0);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        setErroApi('');
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
        );
        if (!response.ok) {
          throw new Error('Erro HTTP: ' + response.status);
        }
        const json = await response.json();
        if (!json.meals || json.meals.length === 0) {
          setErroApi('A lista de itens veio vazia.');
          setProdutos([]);
        } else {
          const formatados = json.meals.map((item, index) => ({
            id: item.idMeal,
            nome: item.strMeal,
            cat: item.strCategory || 'Geral',
            descricao: item.strInstructions
              ? item.strInstructions.slice(0, 100) + '...'
              : 'Sem descrição disponível.',
            precoNum: 35.0 + index * 5,
            preco: brl(35.0 + index * 5),
            imagem: item.strMealThumb,
          }));
          setProdutos(formatados);
        }
      } catch (err) {
        setErroApi('Falha de conexão ou erro ao buscar os dados da API.');
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, []);

  const listaFiltrada = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Tela titulo="Catálogo" menu={<Menu ir={ir} />} ir={ir} ctx={ctx}>
      <TouchableOpacity style={s.badge} onPress={() => ir('carrinho')}>
        <Text style={{ fontWeight: 'bold', color: DARK }}>
          🛒 Carrinho ({qtd})
        </Text>
      </TouchableOpacity>
      <Campo
        label="Busca por nome do produto"
        value={busca}
        onChangeText={setBusca}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={DARK}
          style={{ marginVertical: 20 }}
        />
      ) : erroApi ? (
        <Text
          style={{
            color: '#C00',
            textAlign: 'center',
            marginVertical: 20,
            fontWeight: 'bold',
          }}>
          {erroApi}
        </Text>
      ) : (
        <FlatList
          data={listaFiltrada}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          renderItem={({ item: p }) => (
            <TouchableOpacity
              style={s.card}
              onPress={() => {
                ctx.setProd(p);
                ir('detalhes');
              }}>
              <Foto uri={p.imagem} style={s.foto} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{p.nome}</Text>
                <Text style={s.preco}>{p.preco}</Text>
              </View>
              <Text style={{ color: DARK, fontWeight: 'bold' }}>Ver ›</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </Tela>
  );
};
