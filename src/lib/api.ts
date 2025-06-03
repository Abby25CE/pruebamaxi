// lib/api.ts
export interface Attribute {
  name: string;
  value: string;
}

export interface Anuncio {
  id: string;
  title: string;
  description: string;
  images: string[];
  attributes: Attribute[];
}

export async function fetchAnuncio(id: string): Promise<Anuncio> {
  const res = await fetch(`https://beta.maxipublica.com/testing/ads/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el anuncio");

  const data = await res.json();

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    images: data.images || [],
    attributes: data.attributes || [],
  };
}
