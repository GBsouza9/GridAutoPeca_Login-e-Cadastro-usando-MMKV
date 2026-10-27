import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage: usado pelas telas de Pagamento, Resumo e Pedidos
export const saveAsync = (k, v) => AsyncStorage.setItem(k, JSON.stringify(v));
export const loadAsync = async (k) => {
  const v = await AsyncStorage.getItem(k);
  return v ? JSON.parse(v) : null;
};
