import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const useTheme = () => {
  const esquema = useColorScheme();
  return Colors[esquema === 'dark' ? 'dark' : 'light'];
};
