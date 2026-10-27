import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { SOFT } from '../theme';

export const Foto = ({ uri, style }) => {
  const [erro, setErro] = useState(false);
  return erro || !uri ? (
    <View
      style={[
        style,
        {
          backgroundColor: SOFT,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Text style={{ fontSize: 24 }}>🔧</Text>
    </View>
  ) : (
    <Image
      source={{ uri }}
      style={style}
      resizeMode="cover"
      onError={() => setErro(true)}
    />
  );
};
