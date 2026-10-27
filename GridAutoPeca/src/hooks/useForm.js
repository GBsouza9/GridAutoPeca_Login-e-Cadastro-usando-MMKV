import { useState } from 'react';

export const useForm = (init) => {
  const [v, setV] = useState(init);
  const [e, setE] = useState({});
  return { v, e, setE, set: (k) => (t) => setV((o) => ({ ...o, [k]: t })) };
};
