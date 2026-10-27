import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { BR, SOFT, s } from '../theme';
import { brl } from '../utils/helpers';
import { Tela } from '../components/Tela';
import { Btn, Link } from '../components/Botoes';
import { Menu } from '../components/Menu';
import { loadAsync, saveAsync } from '../storage/asyncStorage';

export const Resumo = ({ ir, ctx }) => {
  const e = (ctx.user && ctx.user.endereco) || {};
  const nomes = { cartao: 'Cartão de Crédito', pix: 'PIX', boleto: 'Boleto' };
  const confirmar = async () => {
    const pedido = {
      id: String(Date.now()).slice(-6),
      data: new Date().toLocaleString('pt-BR'),
      itens: ctx.cart,
      total: ctx.total,
      pagamento: nomes[ctx.pay],
    };
    const lista = (await loadAsync('pedidos')) || [];
    await saveAsync('pedidos', [...lista, pedido]);
    ctx.setOrder(pedido);
    ctx.setCart([]);
    ir('confirmacao');
  };
  return (
    <Tela titulo="Resumo do pedido" ir={ir} ctx={ctx}>
      <View style={s.card}>
        <View>
          {ctx.cart.map((i) => (
            <Text key={i.id}>
              {i.qtd}x {i.nome} — {brl(i.precoNum * i.qtd)}
            </Text>
          ))}
        </View>
      </View>
      <View style={s.card}>
        <Text>
          📍 Entrega: {e.rua}, {e.bairro} — {e.cidade} (CEP {e.cep})
        </Text>
      </View>
      <View style={s.card}>
        <Text>💰 Pagamento: {nomes[ctx.pay]}</Text>
      </View>
      <Text style={s.total}>Valor total: {brl(ctx.total)}</Text>
      <Btn t="Confirmar pedido" onPress={confirmar} />
      <Link t="Editar dados" onPress={() => ir('carrinho')} />
    </Tela>
  );
};

export const Confirmacao = ({ ir, ctx }) => (
  <Tela titulo="Confirmação" ir={ir} ctx={ctx}>
    <View
      style={[
        s.card,
        { height: 110, justifyContent: 'center', backgroundColor: SOFT },
      ]}>
      <Text style={{ fontSize: 54 }}>✅</Text>
    </View>
    <Text style={s.nomeProd}>Pedido realizado com sucesso!</Text>
    <Text style={{ marginBottom: 6 }}>
      Número do pedido: #{ctx.order && ctx.order.id}
    </Text>
    <View style={s.card}>
      <Text>
        {ctx.order && ctx.order.itens.length} item(ns) · total{' '}
        {ctx.order && brl(ctx.order.total)} · entrega em até 5 dias úteis
      </Text>
    </View>
    <Btn t="Ver meus pedidos" onPress={() => ir('pedidos')} />
    <Btn alt t="Voltar ao início" onPress={() => ir('catalogo')} />
  </Tela>
);

export const Pedidos = ({ ir, ctx }) => {
  const [lista, setLista] = useState(null);
  useEffect(() => {
    loadAsync('pedidos').then((l) => setLista((l || []).slice().reverse()));
  }, []);
  return (
    <Tela titulo="Meus pedidos" menu={<Menu ir={ir} />} ir={ir} ctx={ctx}>
      {lista && lista.length === 0 ? (
        <Text style={{ color: '#A00', textAlign: 'center', marginBottom: 8 }}>
          Nenhum pedido realizado
        </Text>
      ) : null}
      {(lista || []).map((p) => (
        <View key={p.id} style={s.card}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>
              📦 Pedido #{p.id} · {p.data}
            </Text>
            <Text>{p.itens.map((i) => `${i.qtd}x ${i.nome}`).join(', ')}</Text>
            <Text style={s.preco}>
              {p.pagamento} · {brl(p.total)}
            </Text>
          </View>
        </View>
      ))}
      <Btn t="Fazer novo pedido" onPress={() => ir('catalogo')} />
    </Tela>
  );
};
