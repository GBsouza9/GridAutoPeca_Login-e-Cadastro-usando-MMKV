import React, { useState } from 'react';
import {
  Text,
} from 'react-native';
import { DARK } from '../theme';
import { EMAIL, check } from '../utils/helpers';
import { useForm } from '../hooks/useForm';
import { Tela } from '../components/Tela';
import { F } from '../components/Campo';
import { Btn, Link } from '../components/Botoes';

export const Recuperar = ({ ir, ctx }) => {
  const f = useForm({ email: '' });
  const [msg, setMsg] = useState('');
  const enviar = () => {
    const e = check(f.v, { email: [(x) => EMAIL.test(x), 'E-mail inválido'] });
    f.setE(e);
    setMsg(
      Object.keys(e).length
        ? ''
        : 'Link de recuperação enviado para ' + f.v.email
    );
  };
  return (
    <Tela titulo="Recuperar senha" ir={ir} ctx={ctx}>
      <Text style={{ marginBottom: 10, color: DARK }}>
        Informe seu e-mail: enviaremos um link de recuperação.
      </Text>
      {F(f, 'email', 'E-mail (obrigatório, formato válido)', {
        autoCapitalize: 'none',
      })}
      <Btn t="Enviar link" onPress={enviar} />
      {msg ? (
        <Text style={{ color: DARK, textAlign: 'center', fontWeight: 'bold' }}>
          {msg}
        </Text>
      ) : null}
      <Link t="Voltar ao login" onPress={() => ir('login')} />
    </Tela>
  );
};
