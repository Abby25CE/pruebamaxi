"use client";
import AnuncioDetails from "@/Components/AnuncioDetails";
import Gallery from "@/Components/Gallery";
import { fetchAnuncio } from "@/lib/api";

interface Params {
  params: {
    id: string;
  };
}

export default async function AnuncioPage({ params }: Params) {
  const anuncio = await fetchAnuncio(params.id);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <AnuncioDetails anuncio={anuncio} />
      <Gallery images={anuncio.images} />
    </main>
  );
}
