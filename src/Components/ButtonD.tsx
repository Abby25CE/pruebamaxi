"use client";
import { useState } from "react";
import { Download, FileText, Loader2, AlertCircle } from "lucide-react";

interface PDFDownloaderProps {
  anuncioId: string;
  className?: string;
  variant?: "button" | "card" | "minimal";
}

// Mapeo de IDs a URLs de PDFs
const PDF_MAPPING: Record<
  string,
  { url: string; name: string; description?: string }
> = {
  "20895027": {
    url: "/Files/20895027.pdf",
    name: "Seat Arona 2018 - Especificaciones",
    description: "Ficha técnica completa y características",
  },
  "20902517": {
    url: "/Files/20902517.pdf",
    name: "Mazda 3 2020 - Especificaciones",
    description: "Manual de usuario y mantenimiento",
  },
  "20901821": {
    url: "/pdfs/20901821.pdf",
    name: "JAC J7 2023 - Especificaciones",
    description: "Catálogo oficial con precios y versiones",
  },
  "1686009875347": {
    url: "/Files/1686009875347.pdf",
    name: "Chevrolete Aveo 2020 - Especificaciones",
    description: "Catálogo oficial con precios y versiones",
  },
  // Agregar más mapeos según necesites
};

export default function ButtonD({
  anuncioId,
  className = "",
  variant = "button",
}: PDFDownloaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener información del PDF basado en el ID
  const pdfInfo = PDF_MAPPING[anuncioId];

  const downloadPDF = async () => {
    if (!pdfInfo) {
      setError("No hay PDF disponible para este anuncio");
      return;
    }

    setIsDownloading(true);
    setError(null);

    try {
      // Opción 1: Descarga directa (si el PDF está en public/)
      const link = document.createElement("a");
      link.href = pdfInfo.url;
      link.download = pdfInfo.name + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      /* 
      // Opción 2: Descarga vía fetch (para PDFs dinámicos desde API)
      const response = await fetch(`/api/pdf/${anuncioId}`);
      
      if (!response.ok) {
        throw new Error('Error al descargar el PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfInfo.name + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsDownloading(false);
    }
  };

  // Si no hay PDF disponible para este ID
  if (!pdfInfo) {
    return (
      <div className={`text-gray-500 text-sm ${className}`}>
        <AlertCircle className="w-4 h-4 inline mr-1" />
        No hay documentos disponibles
      </div>
    );
  }

  // Renderizado según la variante
  if (variant === "minimal") {
    return (
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        className={`inline-flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors ${className}`}
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          <Download className="w-4 h-4 mr-1" />
        )}
        Descargar PDF
      </button>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${className}`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {pdfInfo.name}
            </h3>
            {pdfInfo.description && (
              <p className="text-sm text-gray-500 mt-1">
                {pdfInfo.description}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </p>
            )}
          </div>
          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="flex-shrink-0 bg-[#EC5530] hover:bg-[#d14420] text-white px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // Variante por defecto: button
  return (
    <div className={className}>
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        className="bg-[#EC5530] hover:bg-[#d14420] text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
      >
        {isDownloading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        <span>{isDownloading ? "Descargando..." : "Descargar PDF"}</span>
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}
