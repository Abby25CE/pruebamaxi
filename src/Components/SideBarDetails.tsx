"use client";
import { Anuncio } from "@/lib/api";

export default function SidebarDetails({ anuncio }: { anuncio: Anuncio }) {
  return (
    <aside className="p-4 bg-white flex flex-col gap-6 font-sans">
      {/*Modelo*/}
      <div className="">
        <div className="flex flex-row justify-start gap-x-1 text-xl font-semibold text-gray-800">
          <div className="flex flex-row gap-2.5">
            {anuncio.brandModel}
            <h1>{anuncio.doors}-Puertas</h1>
          </div>
        </div>

        <div className="flex flex-row gap-x-1.5 text-center items-center text-xs">
          <strong className="bg-[#EC5530] text-white rounded-md px-2 py-1">
            {anuncio.year}
          </strong>
          <p>{anuncio.odometer} KM - </p>
          <p className="text-sm text-gray-500">{anuncio.location.city}</p>
        </div>
      </div>

      <hr className="border-[1px] border-gray-300 " />
      {/*Vendedor*/}
      <div className="grid grid-cols-2 py-5 mb-4 rounded-2xl border  shadow-xl shadow-stone-300">
        <div className=" flex flex-col ml-3">
          <h2 className="text-lg font-bold ml-0.5 text-gray-800">
            {anuncio.sellerName}
          </h2>
          <p className="text-sm text-gray-600">
            <strong className="text-[#EC5530]">
              {anuncio.location.street} #{anuncio.location.extNumber}
            </strong>
            <br />
            CP {anuncio.location.zipCode}
            <br />
            {anuncio.location.city}, {anuncio.location.state}
          </p>
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
      <div className="mt-4 p-6 bg-[#F4F4F4]">
        <h3 className="font-semibold text-gray-700 mb-4">Características</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-2 text-sm text-[#686868]">
          {anuncio.attributes.map((attr) => (
            <div key={attr.id} className="flex justify-between ">
              <span className="font-bold ">{attr.label}</span>
              <span className="text-[#6A6A6A]">{String(attr.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="items-start px-7 py-2 text-[#EC5530] border-[1px] rounded-md w-full md:w-4/6">
        Descargar Ficha Tecnica
      </button>
    </aside>
  );
}
