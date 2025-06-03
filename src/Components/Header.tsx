"use client";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/Logo.png";

export default function Header() {
  return (
    <header className="bg-[#0E0E0E] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-around items-center">
        {/* Logo */}
        <Image
          className="w-auto h-auto"
          src={logoImage}
          alt={"Logo Empresarial"}
          width={100}
          height={100}
        />

        {/* Navegación */}
        <nav className="hidden md:flex md flex-row gap-x-7 text-sm">
          <div
            className=" px-4 py-1 hover:rounded-md hover:border-amber-700 hover:border-2 border-2 
          border-[#0E0E0E]"
          >
            <Link
              href="/"
              className="bg-orange hover:bg-orange/90 text-white  text-sm rounded-md transition"
            >
              Inicio
            </Link>
          </div>
          <div
            className=" px-4 py-1 hover:rounded-md hover:border-amber-700 hover:border-2 border-2 
          border-[#0E0E0E]"
          >
            <Link
              href="/vehiculos"
              className="bg-orange hover:bg-orange/90 text-white  text-sm rounded-md transition"
            >
              Vehículos
            </Link>
          </div>

          <div
            className=" px-4 py-1 hover:rounded-md hover:border-amber-700 hover:border-2 border-2 
          border-[#0E0E0E]"
          >
            <Link
              href="/nosotros"
              className="bg-orange hover:bg-orange/90 text-white  text-sm rounded-md transition"
            >
              Nosotros
            </Link>
          </div>

          <div
            className=" px-4 py-1 hover:rounded-md hover:border-amber-700 hover:border-2 border-2 
          border-[#0E0E0E]"
          >
            <Link
              href="/vender"
              className="bg-orange hover:bg-orange/90 text-white  text-sm rounded-md transition"
            >
              Vende tu auto
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
