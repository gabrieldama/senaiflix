import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';
import { Filme, juntarInfo } from '@/services/filmes';

export function CartaoFilme({ filme, onPress }: { filme: Filme; onPress: () => void }) {
  const titulo = filme.nome ?? filme.titulo ?? 'Sem título';
  const genero = filme.genero ?? filme.genre ?? 'Geral';
  const capa = filme.imagem ?? filme.poster ?? filme.capa;
  const info =
    filme.detalhes ||
    juntarInfo([filme.ano ?? filme.year, filme.duracao ?? filme.duration], ' · ');

  return (
    <Pressable style={({ pressed }) => [s.linha, pressed && { opacity: 0.7 }]} onPress={onPress}>
      {capa ? <Image source={{ uri: capa }} style={[s.capa, s.capaImg]} /> : <View style={[s.capa, s.capaVazia]} />}
      <View style={s.corpo}>
        <Text style={s.titulo}>{titulo}</Text>
        {!!info && <Text style={s.info}>{info}</Text>}
        <Text style={s.tag}>{genero}</Text>
      </View>
      <Text style={s.seta}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: paleta.fundo,
    borderBottomWidth: 1,
    borderBottomColor: paleta.borda,
  },
  capa: { width: 75, height: 105, marginRight: 16, backgroundColor: paleta.superficie },
  capaImg: { borderRadius: 2 },
  capaVazia: { borderWidth: 1.5, borderColor: paleta.bordaForte },
  corpo: { flex: 1, justifyContent: 'center' },
  titulo: { fontSize: 18, fontWeight: '800', color: paleta.texto, marginBottom: 4 },
  info: { fontSize: 14, fontWeight: '500', color: paleta.textoApagado, marginBottom: 8 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: paleta.chip,
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '500',
    color: paleta.textoMedio,
    overflow: 'hidden',
  },
  seta: { marginLeft: 8, fontSize: 22, color: paleta.texto },
});
