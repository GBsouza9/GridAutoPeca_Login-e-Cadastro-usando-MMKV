import React, { useState } from 'react';
import {
  Text,
} from 'react-native';
import { s } from '../theme';
import { EMAIL, check } from '../utils/helpers';
import { useForm } from '../hooks/useForm';
import { Tela } from '../components/Tela';
import { F } from '../components/Campo';
import { Btn, Link } from '../components/Botoes';
import { storage } from '../storage/storage'; // MMKV

// --- TELA DE LOGIN (usa MMKV) ---
export const Login = ({ ir, ctx }) => {
  const f = useForm({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const entrar = () => {
    const e = check(f.v, {
      email: [(x) => EMAIL.test(x), 'E-mail inválido'],
      senha: [(x) => x.length >= 6, 'Mínimo 6 caracteres'],
    });
    f.setE(e);
    setErro('');
    if (Object.keys(e).length) return;

    // Leitura síncrona do MMKV
    const salvo = storage.getString('usuario');
    const u = salvo ? JSON.parse(salvo) : null;

    if (u && u.email === f.v.email && u.senha === f.v.senha) {
      ctx.setUser(u);
      ir('catalogo');
    } else {
      setErro('E-mail ou senha não conferem');
    }
  };

  return (
    <Tela titulo="Login" ir={ir} ctx={ctx}>
      {F(f, 'email', 'E-mail (obrigatório)', {
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      })}
      {F(f, 'senha', 'Senha (mín. 6 caracteres)', { secureTextEntry: true })}
      <Btn t="Entrar" onPress={entrar} />
      {erro ? (
        <Text style={[s.erro, { textAlign: 'center' }]}>{erro}</Text>
      ) : null}
      <Link t="Esqueci minha senha" onPress={() => ir('recuperar')} />
      <Link t="Criar conta" onPress={() => ir('cad1')} />
    </Tela>
  );
};
