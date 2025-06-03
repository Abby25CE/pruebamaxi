// components/Gallery.tsx
"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images: string[];
}

export default function Gallery({ images }: Props) {
  const [selected, setSelected] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Cerrar fullscreen con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEsc);
      // Prevenir scroll del body cuando está en fullscreen
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  // Navegación con flechas del teclado
  useEffect(() => {
    const handleArrows = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      if (e.key === "ArrowLeft") {
        setSelected((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setSelected((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    document.addEventListener("keydown", handleArrows);
    return () => document.removeEventListener("keydown", handleArrows);
  }, [isFullscreen, images.length]);

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextImage = () => {
    setSelected((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setSelected((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  if (!images.length)
    return <p className="text-gray-500">Sin imágenes disponibles</p>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Imagen principal */}
        <img
          src={images[selected]}
          alt={`Imagen ${selected + 1}`}
          onClick={openFullscreen}
          className="w-full h-64 md:h-[400px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
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
                selected === i ? "border-orange-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Botón cerrar */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>

          {/* Contador de imágenes */}
          <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
            {selected + 1} / {images.length}
          </div>

          {/* Flecha izquierda */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Imagen principal fullscreen */}
          <img
            src={images[selected]}
            alt={`Imagen ${selected + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Flecha derecha */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight size={48} />
          </button>

          {/* Miniaturas en fullscreen */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumb ${i + 1}`}
                onClick={() => setSelected(i)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                  selected === i
                    ? "border-white"
                    : "border-transparent opacity-70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
