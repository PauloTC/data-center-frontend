"use client";
import { useEffect, useState } from "react";
import { Research } from "@/app/api";
import { map } from "lodash";
import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";

import Link from "next/link";
import Image from "next/image";

const researchCtrl = new Research();

export default function ResearchComponent() {
  const [researchs, setResearchs] = useState(null);
  console.log(researchs);

  useEffect(() => {
    (async () => {
      try {
        const response = await researchCtrl.getResearchs();
        setResearchs(response.data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex items-center">
          <h4
            className={`${libre_franklin600.className} text-slate-700 capitalize text-3xl mb-6`}
          >
            Researchs
          </h4>
          <ul className="flex flex-wrap gap-1 mb-6 ml-6">
            <li>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Todos
              </span>
            </li>
            <li>
              <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Desarrollate
              </span>
            </li>
            <li>
              <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Hub
              </span>
            </li>
            <li>
              <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Loyalty
              </span>
            </li>
          </ul>
        </div>
        <div>
          <button
            type="button"
            class="
              text-white 
              flex 
              items-center 
              gap-1 
              bg-blue-700 
              hover:bg-blue-800 
              focus:outline-none 
              focus:ring-4 
              focus:ring-blue-300 
              font-medium 
              rounded-full 
              text-sm 
              px-5 py-2.5 
              text-center 
              me-2 mb-2 
              "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
            Research
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <ul className={`grid grid-cols-3 gap-4 w-3/4`}>
          {map(researchs, (research) => (
            <Link
              href={`/research/${research.attributes.slug}`}
              key={research.id}
              className="border border-gray-200 rounded-lg p-5 box-border flex flex-col divide-y divide-gray-300 justify-between hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <div className="mb-3">
                  <span className="text-xs block mb-2">
                    {research.attributes.day}
                  </span>
                  <h4
                    className={`${libre_franklin500.className} text-slate-800 text-lg`}
                  >
                    {research.attributes.name}
                  </h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <span
                      className={`${libre_franklin600.className} text-xs uppercase`}
                    >
                      {research.attributes.UserType}
                    </span>
                    <span className="text-xs">
                      {research.attributes.Distric}
                    </span>
                    <span className="text-xs pb-3">
                      {research.attributes.project.data.attributes.name}
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 py-1 px-3 rounded-md">
                    {research.attributes.BusinessLine}
                  </span>
                </div>
              </div>
              <div className="flex items-center pt-3 justify-between">
                <span
                  className={`${libre_franklin700.className} block text-md`}
                >
                  {research.attributes.Business}
                </span>
                <ul className="flex gap-2 items-center">
                  <li className="relative left-1/4">
                    <img
                      alt="avatar"
                      className="rounded-full"
                      width={40}
                      height={40}
                      src="https://res.cloudinary.com/freelancepaulo/image/upload/v1630075868/small_Person_Curtis_4x5_e1564616444404_156b10afd7.jpg"
                    />
                  </li>
                  <li className="border-2 border-white relative rounded-full">
                    <img
                      alt="avatar"
                      className="rounded-full"
                      width={40}
                      height={40}
                      src="https://res.cloudinary.com/freelancepaulo/image/upload/v1630075868/small_Person_Curtis_4x5_e1564616444404_156b10afd7.jpg"
                    />
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </ul>
        <div className="w-1/4 border border-gray-200 rounded-xl p-6 self-start">
          <h3 className={`${libre_franklin600.className} block text-lg mb-5`}>
            Filtros
          </h3>
          <div>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Negocio
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              <li>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Todos
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  B2B
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Dia Dia
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Nitro
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Mayoristas
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Transversal
                </span>
              </li>
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Rol
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              <li>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Todos
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Analista
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Cliente
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Gerente
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  FFVV
                </span>
              </li>
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Giro
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              <li>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Todos
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  PANI
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  GASTRO
                </span>
              </li>
              <li>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  LAVAN
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
