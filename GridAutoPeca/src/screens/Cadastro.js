import React from 'react';
import { EMAIL, dig, check } from '../utils/helpers';
import { useForm } from '../hooks/useForm';
import { Tela } from '../components/Tela';
import { F } from '../components/Campo';
import { Btn, Link } from '../components/Botoes';
import { storage } from '../storage/storage'; // MMKV
import { mostrarAlerta } from '../utils/mensagem';

// --- TELA CADASTRO 1 (dados pessoais; guarda o rascunho no estado) ---
export const Cad1 = ({ ir, ctx }) => {
  const f = useForm({ nome: '', email: '', tel: '', senha: '', conf: '' });
  const proximo = () => {
    const e = check(f.v, {
      nome: [(x) => x.trim().length >= 3, 'Nome muito curto'],
      email: [(x) => EMAIL.test(x), 'E-mail inválido'],
      tel: [
        (x) => [10, 11].includes(dig(x).length),
        'Telefone deve ter 10 ou 11 dígitos',
      ],
      senha: [(x) => x.length >= 6, 'Mínimo 6 caracteres'],
      conf: [(x) => x === f.v.senha, 'As senhas não são iguais'],
    });
    f.setE(e);
    if (!Object.keys(e).length) {
      ctx.setDraft(f.v);
      ir('cad2');
    }
  };
  return (
    <Tela titulo="Cadastro 1/2 — Dados pessoais" ir={ir} ctx={ctx}>
      {F(f, 'nome', 'Nome completo (obrigatório)')}
      {F(f, 'email', 'E-mail (formato válido)', {
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      })}
      {F(f, 'tel', 'Telefone (10 ou 11 dígitos)', {
        keyboardType: 'phone-pad',
      })}
      {F(f, 'senha', 'Senha (mín. 6 caracteres)', { secureTextEntry: true })}
      {F(f, 'conf', 'Confirmar senha', { secureTextEntry: true })}
      <Btn t="Próximo" onPress={proximo} />
      <Link t="Já tenho conta" onPress={() => ir('login')} />
    </Tela>
  );
};

// --- TELA CADASTRO 2 (endereço; salva o usuário no MMKV) ---
export const Cad2 = ({ ir, ctx }) => {
  const f = useForm({ cep: '', rua: '', comp: '', bairro: '', cidade: '' });
  const finalizar = () => {
    const e = check(f.v, {
      cep: [(x) => dig(x).length === 8, 'CEP deve ter 8 dígitos'],
      rua: [(x) => x.trim().length >= 3, 'Informe a rua e o número'],
      bairro: [(x) => x.trim().length >= 2, 'Informe o bairro'],
      cidade: [(x) => x.trim().length >= 2, 'Informe cidade e UF'],
    });
    f.setE(e);
    if (Object.keys(e).length) return;

    const u = { ...ctx.draft, endereco: f.v };
    // Salvamento síncrono no MMKV
    storage.set('usuario', JSON.stringify(u));

    mostrarAlerta('Sucesso', 'Cadastro finalizado!');
    ir('login');
  };

  return (
    <Tela titulo="Cadastro 2/2 — Endereço" ir={ir} ctx={ctx}>
      {F(f, 'cep', 'CEP (obrigatório, 8 dígitos)', { keyboardType: 'numeric' })}
      {F(f, 'rua', 'Rua e número (obrigatório)')}
      {F(f, 'comp', 'Complemento (opcional)')}
      {F(f, 'bairro', 'Bairro (obrigatório)')}
      {F(f, 'cidade', 'Cidade e UF (obrigatórios)')}
      <Btn t="Finalizar cadastro" onPress={finalizar} />
      <Link t="Voltar" onPress={() => ir('cad1')} />
    </Tela>
  );
};
