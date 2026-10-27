import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { s } from '../theme';
import { FRETE, brl } from '../utils/helpers';
import { Tela } from '../components/Tela';
import { Foto } from '../components/Foto';
import { Btn } from '../components/Botoes';
import { Menu } from '../components/Menu';
import { Campo } from '../components/Campo';

export const Carrinho = ({ ir, ctx }) => {
  const [cupom, setCupom] = useState('');
  const sub = ctx.cart.reduce((a, i) => a + i.precoNum * i.qtd, 0);
  const desc = cupom.trim().toUpperCase() === 'GRID10' ? sub * 0.1 : 0;
  const total = sub - desc + (sub ? FRETE : 0);
  const mudar = (id, d) =>
    ctx.setCart(
      ctx.cart
        .map((i) => (i.id === id ? { ...i, qtd: i.qtd + d } : i))
        .filter((i) => i.qtd > 0)
    );
  return (
    <Tela titulo="Meu carrinho" menu={<Menu ir={ir} />} ir={ir} ctx={ctx}>
      {ctx.cart.length === 0 ? (
        <View>
          <Text style={{ textAlign: 'center', color: '#A00', marginBottom: 8 }}>
            Seu carrinho está vazio
          </Text>
          <Btn t="Ver produtos" onPress={() => ir('catalogo')} />
        </View>
      ) : (
        <View>
          {ctx.cart.map((i) => (
            <View key={i.id} style={s.card}>
              <Foto uri={i.imagem} style={s.foto} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{i.nome}</Text>
                <Text style={s.preco}>{i.preco}</Text>
              </View>
              <TouchableOpacity onPress={() => mudar(i.id, -1)}>
                <Text style={s.qBtn}>–</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold' }}>{i.qtd}</Text>
              <TouchableOpacity onPress={() => mudar(i.id, 1)}>
                <Text style={s.qBtn}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Campo
            label="Cupom de desconto (opcional) — use GRID10"
            value={cupom}
            onChangeText={setCupom}
            autoCapitalize="characters"
          />
          <View style={s.totais}>
            <Text>Subtotal: {brl(sub)}</Text>
            {desc > 0 ? <Text>Desconto: -{brl(desc)}</Text> : null}
            <Text>Frete: {brl(FRETE)}</Text>
            <Text style={s.total}>Total: {brl(total)}</Text>
          </View>
          <Btn
            t="Continuar para o pagamento"
            onPress={() => {
              ctx.setTotal(total);
              ir('pagamento');
            }}
          />
        </View>
      )}
    </Tela>
  );
};
