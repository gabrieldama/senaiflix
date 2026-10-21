import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import fotoCinema from '../../assets/images/tabIcons/cinema.jpg';
import { paleta } from '@/constants/paleta';

export default function Inicio() {
  return (
    <View style={s.tela}>
      <Image source={fotoCinema} style={s.foto} />
      <View style={s.textos}>
        <Text style={s.marca}>SENAIFLIX</Text>
        <Text style={s.slogan}>Filmes e séries ilimitados. Assista onde quiser.</Text>
      </View>
      <Pressable
        style={({ pressed }) => [s.entrar, pressed && { opacity: 0.8 }]}
        onPress={() => router.push('/catalogo')}
      >
        <Text style={s.entrarTxt}>Entrar</Text>
        <Text style={s.entrarSeta}>→</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: paleta.fundo,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  foto: {
    width: '100%',
    height: '63%',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: paleta.bordaForte,
    backgroundColor: paleta.superficie,
  },
  textos: { marginVertical: 10 },
  marca: { fontSize: 44, fontWeight: '900', letterSpacing: -1, color: paleta.destaque, marginBottom: 8 },
  slogan: { fontSize: 18, lineHeight: 26, fontWeight: '500', color: paleta.texto },
  entrar: {
    height: 56,
    borderRadius: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: paleta.destaque,
  },
  entrarTxt: { fontSize: 20, fontWeight: '700', color: paleta.branco },
  entrarSeta: { fontSize: 22, fontWeight: '600', color: paleta.branco },
});
