// components/Gallery.tsx
"use client";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function Gallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  if (!images.length)
    return <p className="text-gray-500">Sin imágenes disponibles</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal */}
      <img
        src={images[selected]}
        alt={`Imagen ${selected + 1}`}
        className="w-full h-64 md:h-[400px] object-cover rounded-xl"
      />

      {/* Miniaturas */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Thumb ${i + 1}`}
            onClick={() => setSelected(i)}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
              selected === i ? "border-orange" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
