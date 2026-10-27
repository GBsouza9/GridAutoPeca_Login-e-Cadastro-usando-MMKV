import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { s } from '../theme';
import { mostrarAlerta } from '../utils/mensagem';

export const Menu = ({ ir }) => (
  <View style={s.menu}>
    {[
      ['🏠', 'Início', 'catalogo'],
      ['🛒', 'Carrinho', 'carrinho'],
      ['📦', 'Pedidos', 'pedidos'],
      ['👤', 'Perfil', 'perfil'],
    ].map((m) => (
      <TouchableOpacity
        key={m[1]}
        style={{ alignItems: 'center' }}
        onPress={() =>
          m[2] === 'perfil' ? mostrarAlerta('Perfil', 'Área do perfil') : ir(m[2])
        }>
        <Text style={{ fontSize: 18 }}>{m[0]}</Text>
        <Text style={s.menuT}>{m[1]}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
