import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { DARK, s } from '../theme';

export const Btn = ({ t, onPress, alt }) => (
  <TouchableOpacity
    style={[s.btn, alt && { backgroundColor: '#fff' }]}
    onPress={onPress}>
    <Text style={[s.btnT, alt && { color: DARK }]}>{t}</Text>
  </TouchableOpacity>
);

export const Link = ({ t, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={s.link}>{t}</Text>
  </TouchableOpacity>
);
