"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#0E0E0E] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          <span className="text-orange">autonetwork</span>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <Link href="/" className="hover:text-orange transition">
            Inicio
          </Link>
          <Link href="/vehiculos" className="hover:text-orange transition">
            Vehículos
          </Link>
          <Link href="/nosotros" className="hover:text-orange transition">
            Nosotros
          </Link>
        </nav>

        {/* Botón */}
        <Link
          href="/vender"
          className="bg-orange hover:bg-orange/90 text-white px-4 py-2 text-sm rounded-md transition"
        >
          Vende tu auto
        </Link>
      </div>
    </header>
  );
}
