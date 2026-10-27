import { StyleSheet } from 'react-native';

export const APP = 'Grid Auto Peças';
export const ALUNO = 'Giovanna Barbosa de Souza';
export const BG = '#A6E147';
export const BW = 2;
export const BR = 7;
export const DARK = '#2F4A0F';
export const SOFT = '#EAF7CF';

export const s = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 15, position: 'relative' },
  logo: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 5 },
  app: { fontSize: 20, fontWeight: 'bold', color: DARK },
  aluno: { fontSize: 13, color: DARK, opacity: 0.8 },
  btnSairTopo: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    borderWidth: BW,
    borderColor: DARK,
    borderRadius: BR,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  btnSairTexto: { fontSize: 12, fontWeight: 'bold', color: DARK },
  titulo: { fontSize: 18, fontWeight: 'bold', color: DARK, marginBottom: 15 },
  input: {
    backgroundColor: '#fff',
    borderWidth: BW,
    borderColor: DARK,
    borderRadius: BR,
    padding: 10,
    marginBottom: 8,
    color: '#000',
  },
  btn: {
    backgroundColor: DARK,
    borderRadius: BR,
    padding: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  btnT: { color: '#fff', fontWeight: 'bold' },
  link: {
    color: DARK,
    textAlign: 'center',
    marginVertical: 6,
    textDecorationLine: 'underline',
  },
  erro: { color: '#C00', fontSize: 12, marginBottom: 6 },
  card: {
    backgroundColor: '#fff',
    borderWidth: BW,
    borderColor: DARK,
    borderRadius: BR,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foto: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  fotoGrande: {
    width: '100%',
    height: 220,
    borderRadius: BR,
    marginBottom: 10,
  },
  nomeProd: { fontSize: 18, fontWeight: 'bold', color: DARK, marginBottom: 5 },
  preco: { fontWeight: 'bold', color: DARK, marginTop: 3 },
  qBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: DARK,
  },
  qtd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: BW,
    borderColor: DARK,
    borderRadius: BR,
    padding: 8,
    marginVertical: 10,
  },
  badge: {
    backgroundColor: '#fff',
    borderWidth: BW,
    borderColor: DARK,
    borderRadius: BR,
    padding: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  totais: {
    backgroundColor: '#fff',
    borderWidth: BW,
    borderColor: DARK,
    borderRadius: BR,
    padding: 10,
    marginVertical: 10,
  },
  total: { fontWeight: 'bold', color: DARK, fontSize: 16, marginTop: 5 },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: BW,
    borderTopColor: DARK,
    paddingVertical: 10,
  },
  menuT: { fontSize: 11, color: DARK, fontWeight: 'bold' },
});
