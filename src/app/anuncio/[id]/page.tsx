"use client";
import Description from "@/Components/Description";
import Gallery from "@/Components/Gallery";
import Loader from "@/Components/Loader";
import Nav from "@/Components/Nav";
import SidebarDetails from "@/Components/SideBarDetails";
import { fetchAnuncio, type Anuncio } from "@/lib/api";
import { use, useState, useEffect } from "react";

export default function AnuncioPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadAnuncio = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAnuncio(id);

        if (!isCancelled) {
          setAnuncio(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadAnuncio();

    // Cleanup function para cancelar la petición si el componente se desmonta
    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </main>
    );
  }

  if (!anuncio) {
    return (
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">No se encontró el anuncio</div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      <div className="md:col-span-2">
        <Nav anuncio={anuncio} />
        <Gallery images={anuncio.images} />
        <Description text={anuncio.description} />
      </div>
      <SidebarDetails anuncio={anuncio} />
    </main>
  );
}
