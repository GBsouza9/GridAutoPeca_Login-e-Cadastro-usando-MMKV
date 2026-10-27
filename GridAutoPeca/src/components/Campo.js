import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { s } from '../theme';

export const Campo = ({ label, erro, ...p }) => (
  <View style={{ marginBottom: 10 }}>
    <TextInput
      style={[s.input, erro && { borderColor: '#C00' }]}
      placeholder={label}
      placeholderTextColor="#666"
      {...p}
    />
    {erro ? <Text style={s.erro}>{erro}</Text> : null}
  </View>
);

export const F = (f, k, label, extra) => (
  <Campo
    key={k}
    label={label}
    value={f.v[k]}
    onChangeText={f.set(k)}
    erro={f.e[k]}
    {...extra}
  />
);
