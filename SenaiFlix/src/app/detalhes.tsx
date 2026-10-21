import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { paleta } from '@/constants/paleta';
import { buscarFilme, Filme, juntarInfo } from '@/services/filmes';
import { Estado } from '@/components/Estado';

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={s.linha}>
      <Text style={s.rotulo}>{rotulo}</Text>
      <Text style={s.valor}>{valor}</Text>
    </View>
  );
}

function Botao({ icone, texto, primario, onPress }: { icone: string; texto: string; primario?: boolean; onPress: () => void }) {
  const cor = primario ? paleta.branco : paleta.texto;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.botao, primario ? s.botaoPrimario : s.botaoSecundario, pressed && { opacity: 0.8 }]}
    >
      <Text style={[s.botaoIcone, { color: cor, fontSize: primario ? 16 : 20 }]}>{icone}</Text>
      <Text style={[s.botaoTxt, { color: cor }]}>{texto}</Text>
    </Pressable>
  );
}

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [falha, setFalha] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setCarregando(true);
    setFalha(null);
    buscarFilme(id)
      .then(setFilme)
      .catch((e) => {
        console.error('Falha ao obter filme:', e);
        setFalha('Não foi possível carregar os detalhes do filme.');
      })
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return <View style={s.tela}><Estado carregando mensagem="A carregar detalhes..." /></View>;
  if (falha || !filme) return <View style={s.tela}><Estado erro mensagem={falha ?? 'Filme não encontrado.'} /></View>;

  const titulo = filme.nome || 'Sem título';
  const meta = juntarInfo([filme.ano, filme.duracao], '  ·  ');

  return (
    <View style={s.tela}>
      <StatusBar barStyle="dark-content" backgroundColor={paleta.fundo} />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={s.banner}>
          {filme.poster ? (
            <Image source={{ uri: filme.poster }} style={s.bannerImg} resizeMode="cover" />
          ) : (
            <View style={s.bannerVazio}>
              <Text style={s.selo}>banner do filme</Text>
            </View>
          )}
        </View>

        <View style={s.corpo}>
          <Text style={s.titulo}>{titulo}</Text>
          <View style={s.meta}>
            <Text style={s.metaTxt}>{meta ? `${meta}  ·  ` : ''}</Text>
            <Text style={s.idade}>{filme.classificacao || 'L'}</Text>
          </View>

          <Botao primario icone="▶" texto="Assistir" onPress={() => console.log('Assistir:', titulo)} />
          <Botao icone="+" texto="Minha lista" onPress={() => console.log('Adicionado à lista:', titulo)} />

          <View style={s.separador} />
          <Text style={s.cabecalho}>SINOPSE</Text>
          <Text style={s.sinopse}>{filme.sinopse || 'Nenhuma sinopse disponível.'}</Text>
          <View style={s.separador} />

          <Linha rotulo="Gênero" valor={filme.genero || 'Geral'} />
          <Linha rotulo="Direção" valor={filme.diretor || 'Não informada'} />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },
  banner: {
    width: '100%',
    height: 240,
    backgroundColor: paleta.superficie,
    borderBottomWidth: 1.5,
    borderBottomColor: paleta.linha,
  },
  bannerImg: { width: '100%', height: '100%' },
  bannerVazio: { flex: 1, justifyContent: 'flex-end', padding: 12 },
  selo: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: paleta.borda,
    backgroundColor: paleta.fundo,
    fontFamily: 'monospace',
    fontSize: 13,
    color: paleta.textoMedio,
  },
  corpo: { paddingTop: 16, paddingHorizontal: 16 },
  titulo: { fontSize: 32, fontWeight: '900', letterSpacing: -0.5, color: paleta.texto, marginBottom: 8 },
  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  metaTxt: { fontSize: 15, fontWeight: '500', color: paleta.textoSuave },
  idade: {
    borderWidth: 1.5,
    borderColor: paleta.destaque,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 13,
    fontWeight: '700',
    color: paleta.destaque,
  },
  botao: { height: 50, borderRadius: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  botaoPrimario: { backgroundColor: paleta.destaque, marginBottom: 12 },
  botaoSecundario: { backgroundColor: paleta.chip, borderWidth: 1.5, borderColor: paleta.bordaForte, marginBottom: 16 },
  botaoIcone: { marginRight: 10, fontWeight: '600' },
  botaoTxt: { fontSize: 18, fontWeight: '800' },
  separador: { height: 1.5, marginVertical: 16, backgroundColor: paleta.bordaForte },
  cabecalho: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5, color: paleta.texto, marginBottom: 10, marginTop: 4 },
  sinopse: { fontSize: 15, lineHeight: 22, color: paleta.linha, marginBottom: 4 },
  linha: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  rotulo: { width: 90, fontSize: 15, fontWeight: '500', color: paleta.textoApagado },
  valor: { flex: 1, fontSize: 15, fontWeight: '600', color: paleta.texto },
});
