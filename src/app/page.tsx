"use client";

import { FiCreditCard } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen">
      <a className="w-full lg:h-60 h-72 p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

        <FiCreditCard
          className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100
  group-hover:text-sky-500 group-hover:rotate-12 transition-transform duration-300"
        />
        <FiCreditCard className="mb-2 text-2xl text-sky-600 group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-medium text-end text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
          efvg
        </h3>
        <p className="text-slate-400 text-end group-hover:text-violet-200 relative z-10 duration-300">
          egerg
        </p>
        <p className="text-slate-400 text-justify lg:text-base text-sm group-hover:text-violet-200 relative z-10 duration-300">
          erg
        </p>
      </a>
    </div>
  );
}
