import { useEffect, useState } from 'react';
import { useColorScheme as useEsquemaNativo } from 'react-native';

export function useColorScheme() {
  const [montado, setMontado] = useState(false);
  const esquema = useEsquemaNativo();
  useEffect(() => setMontado(true), []);
  return montado ? esquema : 'light';
}
