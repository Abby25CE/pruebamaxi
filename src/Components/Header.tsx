"use client";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/Logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0E0E0E] text-white shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 py-4 flex md:justify-around justify-between items-center">
        {/* Logo */}
        <Image
          className="w-auto h-auto"
          src={logoImage || "/placeholder.svg"}
          alt="Logo Empresarial"
          width={100}
          height={100}
          priority
        />

        {/* Menú desktop */}
        <nav className="hidden md:flex flex-row gap-x-7 text-sm">
          {["Inicio", "Vehículos", "Nosotros", "Vende tu auto"].map(
            (label, index) => (
              <div
                key={index}
                className="px-2 py-1 hover:rounded-md hover:border-[#EC5530] hover:border-2 border-2 border-[#0E0E0E]"
              >
                <Link
                  href={
                    label === "Inicio"
                      ? "/"
                      : "/" + label.toLowerCase().replaceAll(" ", "")
                  }
                  className="text-white text-sm rounded-md transition px-2 py-1 hover:text-[#EC5530]"
                >
                  {label}
                </Link>
              </div>
            )
          )}
        </nav>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden p-2 z-50  text-white border"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-red-800">
          <nav className="flex flex-col gap-3 text-sm bg-[#1a1a1a] p-4 rounded-md">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-white hover:text-[#EC5530]"
            >
              Inicio
            </Link>
            <Link
              href="/vehiculos"
              onClick={() => setOpen(false)}
              className="text-white hover:text-[#EC5530]"
            >
              Vehículos
            </Link>
            <Link
              href="/nosotros"
              onClick={() => setOpen(false)}
              className="text-white hover:text-[#EC5530]"
            >
              Nosotros
            </Link>
            <Link
              href="/vender"
              onClick={() => setOpen(false)}
              className="text-white hover:text-[#EC5530]"
            >
              Vende tu auto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
