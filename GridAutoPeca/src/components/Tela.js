import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { APP, ALUNO, BG, s } from '../theme';
import { mostrarAlerta } from '../utils/mensagem';

export const Tela = ({ titulo, children, menu, ir, ctx }) => {
  const logout = () => {
    if (ctx && ctx.setUser) ctx.setUser(null);
    mostrarAlerta('Sessão', 'Você saiu da sua conta.');
    if (ir) ir('login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50 }}>
        <View style={s.header}>
          <Image source={require('../../logo.jpg')} style={s.logo} />
          <Text style={s.app}>{APP}</Text>
          <Text style={s.aluno}>{ALUNO}</Text>

          {ctx && ctx.user ? (
            <TouchableOpacity style={s.btnSairTopo} onPress={logout}>
              <Text style={s.btnSairTexto}>X Sair</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={s.titulo}>{titulo}</Text>
        {children}
      </ScrollView>
      {menu}
    </View>
  );
};
