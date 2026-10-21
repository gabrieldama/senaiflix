import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { paleta } from '@/constants/paleta';
import { Filme, listarFilmes } from '@/services/filmes';
import { CartaoFilme } from '@/components/CartaoFilme';
import { Estado } from '@/components/Estado';

export default function Catalogo() {
  const [lista, setLista] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setFalha(null);
    try {
      setLista(await listarFilmes());
    } catch (e) {
      console.error('Falha ao obter filmes:', e);
      setFalha('Não foi possível carregar o catálogo. Verifique a sua ligação.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const puxar = () => {
    setAtualizando(true);
    carregar();
  };

  const conteudo = () => {
    if (carregando) return <Estado carregando mensagem="A carregar o catálogo..." />;
    if (falha) return <Estado erro mensagem={falha} aoTentar={carregar} />;
    return (
      <FlatList
        data={lista}
        keyExtractor={(f, i) => String(f.id ?? i)}
        renderItem={({ item }) => (
          <CartaoFilme
            filme={item}
            onPress={() => router.push({ pathname: '/detalhes', params: { id: String(item.id) } })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={atualizando} onRefresh={puxar} colors={[paleta.destaque]} />
        }
        ListEmptyComponent={<Estado mensagem="Nenhum filme encontrado." />}
      />
    );
  };

  return (
    <View style={s.tela}>
      <Text style={[s.faixa, s.marca]}>SENAIFLIX</Text>
      <Text style={[s.faixa, s.secao]}>Catálogo</Text>
      {conteudo()}
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },
  faixa: { paddingHorizontal: 16 },
  marca: {
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: paleta.linha,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: paleta.destaque,
  },
  secao: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: paleta.borda,
    fontSize: 22,
    fontWeight: '800',
    color: paleta.texto,
  },
});
