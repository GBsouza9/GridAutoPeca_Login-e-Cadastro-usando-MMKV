import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { BR, DARK, SOFT, s } from '../theme';
import { dig, brl, check } from '../utils/helpers';
import { useForm } from '../hooks/useForm';
import { Tela } from '../components/Tela';
import { F } from '../components/Campo';
import { Btn, Link } from '../components/Botoes';
import { loadAsync, saveAsync } from '../storage/asyncStorage';
import { mostrarAlerta } from '../utils/mensagem';

export const Pagamento = ({ ir, ctx }) => {
  const [erro, setErro] = useState('');
  useEffect(() => {
    loadAsync('pagamento').then((p) => p && !ctx.pay && ctx.setPay(p.tipo));
  }, []);
  const opcoes = [
    ['cartao', '💳  Cartão de Crédito'],
    ['pix', '⚡  PIX'],
    ['boleto', '🧾  Boleto'],
  ];
  return (
    <Tela titulo="Forma de pagamento" ir={ir} ctx={ctx}>
      {opcoes.map((o) => (
        <TouchableOpacity
          key={o[0]}
          style={[s.card, ctx.pay === o[0] && { backgroundColor: DARK }]}
          onPress={() => {
            ctx.setPay(o[0]);
            setErro('');
          }}>
          <Text
            style={{
              color: ctx.pay === o[0] ? '#fff' : '#222',
              fontWeight: 'bold',
            }}>
            {ctx.pay === o[0] ? '● ' : '○ '}
            {o[1]}
          </Text>
        </TouchableOpacity>
      ))}
      <Text style={s.total}>Valor total do pedido: {brl(ctx.total)}</Text>
      <Btn
        t="Continuar"
        onPress={() =>
          ctx.pay ? ir(ctx.pay) : setErro('Selecione uma forma de pagamento')
        }
      />
      {erro ? (
        <Text style={[s.erro, { textAlign: 'center' }]}>{erro}</Text>
      ) : null}
      <Link t="Voltar ao carrinho" onPress={() => ir('carrinho')} />
    </Tela>
  );
};

export const Cartao = ({ ir, ctx }) => {
  const f = useForm({ num: '', nome: '', val: '', cvv: '', parc: '1' });
  const salvar = async () => {
    const e = check(f.v, {
      num: [(x) => dig(x).length === 16, 'Número deve ter 16 dígitos'],
      nome: [(x) => x.trim().length >= 3, 'Nome inválido'],
      val: [(x) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(x), 'Use o formato MM/AA'],
      cvv: [(x) => dig(x).length === 3, 'CVV deve ter 3 dígitos'],
      parc: [(x) => +x >= 1 && +x <= 12, 'Parcelas de 1 a 12'],
    });
    f.setE(e);
    if (Object.keys(e).length) return;
    await saveAsync('pagamento', {
      tipo: 'cartao',
      dados: {
        final: dig(f.v.num).slice(-4),
        nome: f.v.nome,
        parcelas: f.v.parc,
      },
    });
    ir('resumo');
  };
  return (
    <Tela titulo="Pagamento com cartão" ir={ir} ctx={ctx}>
      {F(f, 'num', 'Número do cartão (16 dígitos)', {
        keyboardType: 'numeric',
      })}
      {F(f, 'nome', 'Nome impresso no cartão')}
      {F(f, 'val', 'Validade (MM/AA)')}
      {F(f, 'cvv', 'CVV (3 dígitos)', {
        keyboardType: 'numeric',
        secureTextEntry: true,
      })}
      {F(f, 'parc', 'Parcelas (1x a 12x)', { keyboardType: 'numeric' })}
      <Btn t="Revisar pedido" onPress={salvar} />
      <Link t="Voltar" onPress={() => ir('pagamento')} />
    </Tela>
  );
};

export const Pix = ({ ir, ctx }) => {
  const codigo = '00020126GRIDAUTOPECAS5204000053039865802BR';
  const salvar = async () => {
    await saveAsync('pagamento', { tipo: 'pix', dados: { codigo } });
    ir('resumo');
  };
  return (
    <Tela titulo="Pagamento com PIX" ir={ir} ctx={ctx}>
      <View
        style={[
          s.card,
          { height: 130, justifyContent: 'center', backgroundColor: SOFT },
        ]}>
        <Text style={{ fontWeight: 'bold' }}>QR Code do PIX</Text>
      </View>
      <View style={s.card}>
        <Text selectable>{codigo}</Text>
      </View>
      <Btn
        t="Copiar código"
        onPress={() => mostrarAlerta('PIX', 'Código copiado (simulação)')}
      />
      <Text style={{ marginVertical: 8, color: DARK }}>
        Valor total: {brl(ctx.total)} · validade do código: 30 min
      </Text>
      <Btn alt t="Gravar o pagamento no AsyncStorage" onPress={salvar} />
      <Link t="Voltar" onPress={() => ir('pagamento')} />
    </Tela>
  );
};

export const Boleto = ({ ir, ctx }) => {
  const f = useForm({ nome: '', cpf: '' });
  const barras = '23790.12345 60000.123456 78901.234567 8 90000000000000';
  const venc = new Date(Date.now() + 386400000).toLocaleDateString('pt-BR');
  const salvar = async () => {
    const e = check(f.v, {
      nome: [(x) => x.trim().length >= 3, 'Nome inválido'],
      cpf: [(x) => dig(x).length === 11, 'CPF deve ter 11 dígitos'],
    });
    f.setE(e);
    if (Object.keys(e).length) return;
    await saveAsync('pagamento', {
      tipo: 'boleto',
      dados: { nome: f.v.nome, barras, venc },
    });
    ir('resumo');
  };
  return (
    <Tela titulo="Pagamento com boleto" ir={ir} ctx={ctx}>
      {F(f, 'nome', 'Nome do pagador (obrigatório)')}
      {F(f, 'cpf', 'CPF do pagador (11 dígitos)', { keyboardType: 'numeric' })}
      <View style={s.card}>
        <Text selectable>{barras}</Text>
      </View>
      <Btn
        t="Copiar código de barras"
        onPress={() => mostrarAlerta('Boleto', 'Código copiado (simulação)')}
      />
      <Text style={{ marginVertical: 8, color: DARK }}>
        Valor total: {brl(ctx.total)} · vencimento: {venc}
      </Text>
      <Btn alt t="Revisar pedido" onPress={salvar} />
      <Link t="Voltar" onPress={() => ir('pagamento')} />
    </Tela>
  );
};
