const BASE = 'http://10.92.198.19:3000/filmes';

export type Filme = {
  id?: number | string;
  nome?: string;
  titulo?: string;
  ano?: string | number;
  year?: string | number;
  duracao?: string;
  duration?: string;
  genero?: string;
  genre?: string;
  imagem?: string;
  poster?: string;
  capa?: string;
  detalhes?: string;
  classificacao?: string;
  sinopse?: string;
  diretor?: string;
};

async function pegar<T>(url: string): Promise<T> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Servidor respondeu com status ${resp.status}`);
  return resp.json();
}

export const listarFilmes = () => pegar<Filme[]>(BASE);

export async function buscarFilme(id: string | number) {
  const dados = await pegar<Filme | Filme[]>(`${BASE}/${id}`);
  return Array.isArray(dados) ? dados[0] : dados;
}

export const juntarInfo = (partes: unknown[], sep: string) =>
  partes.filter(Boolean).join(sep);
