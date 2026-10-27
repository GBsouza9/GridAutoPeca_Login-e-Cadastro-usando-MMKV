import React, { useState } from 'react';
import { Login } from './src/screens/Login';
import { Cad1, Cad2 } from './src/screens/Cadastro';
import { Recuperar } from './src/screens/Recuperar';
import { Catalogo } from './src/screens/Catalogo';
import { Detalhes } from './src/screens/Detalhes';
import { Carrinho } from './src/screens/Carrinho';
import { Pagamento, Cartao, Pix, Boleto } from './src/screens/Pagamento';
import { Resumo, Confirmacao, Pedidos } from './src/screens/Pedidos';

const TELAS = {
  login: Login,
  cad1: Cad1,
  cad2: Cad2,
  recuperar: Recuperar,
  catalogo: Catalogo,
  detalhes: Detalhes,
  carrinho: Carrinho,
  pagamento: Pagamento,
  cartao: Cartao,
  pix: Pix,
  boleto: Boleto,
  resumo: Resumo,
  confirmacao: Confirmacao,
  pedidos: Pedidos,
};

const App = () => {
  const [tela, ir] = useState('login');
  const [user, setUser] = useState(null);
  const [draft, setDraft] = useState({});
  const [cart, setCart] = useState([]);
  const [prod, setProd] = useState(null);
  const [pay, setPay] = useState(null);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(null);

  const ComponenteTela = TELAS[tela] || Login;
  const ctx = {
    user,
    setUser,
    draft,
    setDraft,
    cart,
    setCart,
    prod,
    setProd,
    pay,
    setPay,
    total,
    setTotal,
    order,
    setOrder,
  };

  return <ComponenteTela ir={ir} ctx={ctx} />;
};

export default App;
