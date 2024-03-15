"use client";
import { useEffect, useState } from "react";
import { Investigation } from "@/app/api";
import { map } from "lodash";
import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import "./styles.scss";

const investigationCtrl = new Investigation();

export default function InvestigationsComponent() {
  const [investigations, setInvestigations] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await investigationCtrl.getInvestigations();
        setInvestigations(response.data);
        console.log(response.data);
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
            Investigaciones
          </h4>
          <ul className="flex flex-wrap gap-1 mb-6 ml-6">
            <li>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Todos
              </span>
            </li>
            <li>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Dexarrollate
              </span>
            </li>
            <li>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                DiaDia Dex
              </span>
            </li>
            <li>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Insuma
              </span>
            </li>
            <li>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                Web de clientes
              </span>
            </li>
          </ul>
        </div>
        <div>
          <Link
            href={"/investigations/create"}
            className="
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
            Agregar
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <ul className={`grid grid-cols-3 gap-4 w-3/4`}>
          {map(investigations, (investigation) => (
            <Link
              href={`/investigations/${investigation.attributes.slug}`}
              key={investigation.id}
              className="
                border border-gray-200 
                rounded-lg p-5 box-border 
                divide-y self-start
                divide-gray-300 justify-between 
                hover:shadow-md transition-all 
                duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <div className="mb-3">
                  <h4
                    title={investigation.attributes.name}
                    className={`${libre_franklin500.className} text-slate-800 text-sm`}
                  >
                    {investigation.attributes.name}
                  </h4>
                </div>

                <div className="flex mb-3 items-center">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                  <div className="flex gap-2">
                    {map(
                      investigation.attributes.locations.data,
                      (location, index) => (
                        <span
                          key={index}
                          className="text-xs align-center flex border px-2 rounded-md"
                        >
                          {location.attributes.name}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {map(investigation.attributes.publics.data, (item, index) => (
                    <span
                      key={index}
                      className={`${libre_franklin600.className} text-xs capitalize`}
                    >
                      {item.attributes.name}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`${libre_franklin500.className} text-xs block mb-2`}
                  >
                    {investigation.attributes.date}
                  </span>
                  <span
                    className={classNames(
                      `${libre_franklin600.className}`,
                      "rounded-lg",
                      "text-xs",
                      "block",
                      "mb-2",
                      "capitalize",
                      "text-white",
                      "px-3",
                      "py-1",
                      {
                        "bg-stone-600":
                          investigation.attributes.status === "finalizado",
                        "bg-green-600":
                          investigation.attributes.status === "en curso",
                      }
                    )}
                  >
                    {investigation.attributes.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col pt-3 ">
                <div className="flex items-center">
                  <span
                    className={`${libre_franklin700.className} capitalize text-md block w-full`}
                  >
                    {investigation.attributes.project}
                  </span>
                  <ul className="flex items-center investigations-researchers justify-between grow relative w-40">
                    {investigation.attributes.researchers.data.map(
                      (researcher, index) => {
                        return (
                          <li
                            className="investigations-researcher relative border-2 border-white"
                            key={index}
                          >
                            <Image
                              src={
                                researcher.attributes.photo.data[0].attributes
                                  .url
                              }
                              alt={
                                researcher.attributes.photo.data[0].attributes
                                  .name
                              }
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </li>
                        );
                      }
                    )}

                    {/* <li className="border-2 border-white relative rounded-full">
                      <img
                        alt="avatar"
                        className="rounded-full"
                        width={40}
                        height={40}
                        src="https://res.cloudinary.com/freelancepaulo/image/upload/v1630075868/small_Person_Curtis_4x5_e1564616444404_156b10afd7.jpg"
                      />
                    </li> */}
                  </ul>
                </div>
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
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Todos
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  B2B
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Dia Dia
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Nitro
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Mayoristas
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Transversal
                </span>
              </li>
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Rol
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              <li>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Todos
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Analista
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Cliente
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Gerente
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  FFVV
                </span>
              </li>
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Giro
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              <li>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  Todos
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  PANI
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                  GASTRO
                </span>
              </li>
              <li>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
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
