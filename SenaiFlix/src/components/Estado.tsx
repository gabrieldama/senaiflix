import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';

type Props = {
  carregando?: boolean;
  mensagem: string;
  erro?: boolean;
  aoTentar?: () => void;
};

export function Estado({ carregando, mensagem, erro, aoTentar }: Props) {
  return (
    <View style={s.caixa}>
      {carregando && <ActivityIndicator size="large" color={paleta.destaque} />}
      <Text style={[s.msg, carregando && s.msgCarregando, erro && s.msgErro]}>{mensagem}</Text>
      {aoTentar && (
        <Pressable style={s.botao} onPress={aoTentar}>
          <Text style={s.botaoTxt}>Tentar Novamente</Text>
        </Pressable>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  caixa: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  msg: { fontSize: 16, color: paleta.textoApagado, textAlign: 'center' },
  msgCarregando: { marginTop: 12 },
  msgErro: { color: paleta.destaque, marginBottom: 16 },
  botao: { backgroundColor: paleta.destaque, borderRadius: 4, paddingVertical: 10, paddingHorizontal: 20 },
  botaoTxt: { color: paleta.branco, fontWeight: '700' },
});
