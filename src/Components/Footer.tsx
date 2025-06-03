"use client";
// components/Footer.tsx
import { Phone, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#343A45] py-10 mt-12 px-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 px-7 py-5 gap-8">
        {/* Teléfono */}
        <div className="flex flex-col text-white ">
          <ul className="space-y-2">
            <li className="flex flex-row">
              Tel.
              <p className="text-[#EC5530]">(55) 4324 3671</p>
            </li>
            <li>ventas@automotors.com</li>
            <li>Av Central No.209, Col. Nueva</li>
            <li>Industrial Vallejo, Gustavo A. Madero</li>
            <li>CP 07700 CDMX</li>
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <ul className="space-y-4">
            <li>Inicio</li>
            <li>Nosotros</li>
            <li>Listado</li>
            <li>Vende tu auto</li>
          </ul>
        </div>
        {/*Privacidad */}
        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <ul className="space-y-4">
            <li>Privacidad</li>
            <li>Terminos y condiciones</li>
            <li>Preguntas Frecuentes</li>
            <li>Lista de precios</li>
          </ul>
        </div>
        {/*Contacto*/}

        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <ul className="space-y-4">
            <li>Ayuda</li>
            <li>Contacto</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>
      </div>
      <hr className="border-[1px] border-gray-500 " />
      <div className="flex flex-row justify-between text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} Autonetwork. Todos los derechos reservados.{" "}
        {/* Redes sociales */}
        <div className="flex md:justify-end items-center gap-4">
          <Facebook className="w-5 h-5 hover:text-orange cursor-pointer" />
          <Twitter className="w-5 h-5 hover:text-orange cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-orange cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
