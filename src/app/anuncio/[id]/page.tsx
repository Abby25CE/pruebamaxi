// app/anuncio/[id]/page.tsx
import Description from "@/Components/Description";
import Gallery from "@/Components/Gallery";
import SidebarDetails from "@/Components/SideBarDetails";
import { fetchAnuncio } from "@/lib/api";
import { use } from "react";

export default function AnuncioPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);

  const anuncio = use(fetchAnuncio(id));

  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Gallery images={anuncio.images} />
        <Description text={anuncio.description} />
      </div>
      <SidebarDetails anuncio={anuncio} />
    </main>
  );
}
