"use client";
import { Anuncio } from "@/lib/api";

export default function SidebarDetails({ anuncio }: { anuncio: Anuncio }) {
  return (
    <aside className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">{anuncio.title}</h2>
      <p className="text-sm text-gray-500">Guadalajara</p>

      <div className="mt-2 text-orange text-2xl font-bold">
        $
        {Number(
          anuncio.attributes.find((attr) => attr.name === "Precio")?.value || 0
        ).toLocaleString()}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Características</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {anuncio.attributes.map((attr) => (
            <li key={attr.name}>
              <strong>{attr.name}:</strong> {attr.value}
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-6 w-full bg-orange text-white py-2 rounded-md hover:bg-orange/90 transition">
        Descargar ficha
      </button>
    </aside>
  );
}
