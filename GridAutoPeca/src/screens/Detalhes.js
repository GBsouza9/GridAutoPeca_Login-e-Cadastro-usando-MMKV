import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { DARK, s } from '../theme';
import { Tela } from '../components/Tela';
import { Foto } from '../components/Foto';
import { Btn, Link } from '../components/Botoes';
import { mostrarAlerta } from '../utils/mensagem';

export const Detalhes = ({ ir, ctx }) => {
  const produtoInicial = ctx.prod;
  const [detalhe, setDetalhe] = useState(produtoInicial);
  const [loading, setLoading] = useState(true);
  const [erroApi, setErroApi] = useState('');
  const [q, setQ] = useState(1);

  useEffect(() => {
    const buscarDetalhe = async () => {
      if (!produtoInicial || !produtoInicial.id) return;
      try {
        setLoading(true);
        setErroApi('');
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${produtoInicial.id}`
        );
        if (!response.ok) {
          throw new Error('Erro HTTP: ' + response.status);
        }
        const json = await response.json();
        if (!json.meals || json.meals.length === 0) {
          setErroApi('Detalhes não encontrados.');
        } else {
          const m = json.meals[0];
          setDetalhe({
            id: m.idMeal,
            nome: m.strMeal,
            cat: m.strCategory || 'Geral',
            area: m.strArea || 'Desconhecida',
            tags: m.strTags || 'Nenhuma',
            descricao: m.strInstructions || 'Sem instruções.',
            precoNum: produtoInicial.precoNum,
            preco: produtoInicial.preco,
            imagem: m.strMealThumb,
          });
        }
      } catch (err) {
        setErroApi('Falha de conexão ao buscar os detalhes.');
      } finally {
        setLoading(false);
      }
    };
    buscarDetalhe();
  }, [produtoInicial]);

  const add = () => {
    const p = detalhe;
    const ex = ctx.cart.find((i) => i.id === p.id);
    ctx.setCart(
      ex
        ? ctx.cart.map((i) => (i.id === p.id ? { ...i, qtd: i.qtd + q } : i))
        : [...ctx.cart, { ...p, qtd: q }]
    );
    mostrarAlerta('Carrinho', 'Produto adicionado!');
    ir('catalogo');
  };

  return (
    <Tela titulo="Detalhes" ir={ir} ctx={ctx}>
      <Link t="‹ Voltar" onPress={() => ir('catalogo')} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={DARK}
          style={{ marginVertical: 30 }}
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
        <View style={{ flex: 1 }}>
          <Foto uri={detalhe.imagem} style={s.fotoGrande} />
          <Text style={s.nomeProd}>{detalhe.nome}</Text>
          <Text style={s.preco}>{detalhe.preco}</Text>

          <View
            style={[
              s.card,
              {
                marginTop: 10,
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            ]}>
            <Text style={{ fontWeight: 'bold', color: DARK, marginBottom: 5 }}>
              Informações do Item:
            </Text>
            <Text style={{ color: '#333', marginBottom: 2 }}>
              • Categoria: {detalhe.cat}
            </Text>
            <Text style={{ color: '#333', marginBottom: 2 }}>
              • Região/Origem: {detalhe.area}
            </Text>
            <Text style={{ color: '#333', marginBottom: 2 }}>
              • Tags: {detalhe.tags}
            </Text>
            <Text style={{ color: '#333' }}>
              • ID do Sistema: #{detalhe.id}
            </Text>
          </View>

          <Text style={{ marginVertical: 10, color: DARK, lineHeight: 20 }}>
            {detalhe.descricao}
          </Text>

          <View style={s.qtd}>
            <TouchableOpacity onPress={() => setQ(Math.max(1, q - 1))}>
              <Text style={s.qBtn}>–</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Quantidade: {q}</Text>
            <TouchableOpacity onPress={() => setQ(q + 1)}>
              <Text style={s.qBtn}>+</Text>
            </TouchableOpacity>
          </View>

          <Btn t="Adicionar ao carrinho" onPress={add} />
        </View>
      )}
    </Tela>
  );
};
