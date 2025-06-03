"use client";
// components/Footer.tsx
import { Phone, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Teléfono */}
        <div>
          <p className="text-orange text-lg font-semibold">Tel. 55 4324 3671</p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          <ul className="space-y-1">
            <li>Inicio</li>
            <li>Vehículos</li>
            <li>Nosotros</li>
          </ul>
          <ul className="space-y-1">
            <li>Privacidad</li>
            <li>Legales</li>
            <li>Contacto</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex md:justify-end items-center gap-4">
          <Facebook className="w-5 h-5 hover:text-orange cursor-pointer" />
          <Twitter className="w-5 h-5 hover:text-orange cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-orange cursor-pointer" />
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} Autonetwork. Todos los derechos reservados.
      </div>
    </footer>
  );
}
