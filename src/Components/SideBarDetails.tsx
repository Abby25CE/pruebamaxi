"use client";
import { Anuncio } from "@/lib/api";

export default function SidebarDetails({ anuncio }: { anuncio: Anuncio }) {
  return (
    <aside className="p-4 bg-white flex flex-col gap-6 ">
      {/*Modelo*/}
      <div className="">
        <h2 className="flex flex-row justify-between text-xl font-semibold text-gray-800">
          {anuncio.title} <h1>{anuncio.doors}-Puertas</h1>
          <h1>Modelo</h1>
        </h2>
        <div className="flex flex-row text-center items-center text-xs">
          <p>{anuncio.odometer} KM - </p>
          <p className="text-sm text-gray-500">{anuncio.location}</p>
        </div>
      </div>
      <hr className="border-[1px] border-gray-300 " />
      {/*Vendedor*/}
      <div className="grid grid-cols-2 py-5 mb-4 rounded-2xl shadow-xl shadow-stone-300">
        <div className=" flex flex-col ml-3">
          <h2 className="text-lg font-bold ml-0.5 text-gray-800">
            {anuncio.sellerName}
          </h2>
          <p className="text-sm text-[#EC5530]">{anuncio.location}</p>
          <p className="text-sm text-gray-500">{anuncio.sellerPhone}</p>
        </div>
        {anuncio.sellerLogo && (
          <img
            src={anuncio.sellerLogo}
            alt={anuncio.sellerName}
            className="w-20 h-20 object-contain mb-2 ml-5"
          />
        )}
      </div>

      {/*Precio*/}
      <div className="mt-2 text-orange text-2xl font-bold">
        {new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: anuncio.currency || "MXN",
        }).format(anuncio.price)}
      </div>
      {/*Descripcion  General*/}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Características</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {anuncio.attributes.map((attr) => (
            <li key={attr.id}>
              <strong>{attr.label}:</strong> {String(attr.value)}
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
