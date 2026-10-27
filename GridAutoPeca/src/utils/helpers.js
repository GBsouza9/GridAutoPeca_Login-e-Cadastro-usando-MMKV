export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const FRETE = 15;

export const dig = (s) => s.replace(/\D/g, '');
export const brl = (n) => 'R$ ' + n.toFixed(2).replace('.', ',');

export const check = (v, r) => {
  const e = {};
  Object.keys(r).forEach((k) => {
    if (!v[k] || !v[k].trim()) e[k] = 'Campo obrigatório';
    else if (!r[k][0](v[k])) e[k] = r[k][1];
  });
  return e;
};
