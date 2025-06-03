"use client";
import { Anuncio } from "@/lib/api";

interface Props {
  anuncio: Anuncio;
}

export default function AnuncioDetails({ anuncio }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#EC5530]">{anuncio.title}</h1>
      <p className="text-[#6A6A6A] mt-2">{anuncio.description}</p>

      <ul className="mt-4 text-sm text-[#686868]">
        {anuncio.attributes.map((attr) => (
          <li key={attr.name}>
            <strong>{attr.name}:</strong> {attr.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
