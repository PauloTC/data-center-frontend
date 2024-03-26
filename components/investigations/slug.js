"use client";
import Link from "next/link";

import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import Image from "next/image";
import { Investigation } from "@/app/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import classNames from "classnames";

export default function InvestigationSlugComponent({ params }) {
  const investigationCtrl = new Investigation();

  const [investigation, setInvestigation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await investigationCtrl.getInvestigation(params.slug);
        console.log("response", response);
        setInvestigation(response.attributes);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex">
          <Link
            className="text-blue-700 hover:text-blue-800"
            href="/investigations"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h3
            className={`${libre_franklin600.className} ml-3 text-slate-700 uppercase text-xl`}
          >
            {investigation?.name}
          </h3>
        </div>

        <button
          href={`/investigations/${params.slug}/edit`}
          className="disabled text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Editar
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h4 className={`${libre_franklin700.className} text-xl mb-4 flex`}>
              Ficha Técnica
            </h4>
            <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Título de la investigación:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.name}
                  </p>
                </li>
                <li className="flex gap-4 flex-col">
                  <label className="flex w-80" htmlFor="description">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Contexto de investigación:
                    </span>
                  </label>
                  <p className="text-sm w-full">{investigation?.description}</p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Proyecto:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.project}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de inicio:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.initial_date &&
                      format(new Date(investigation?.initial_date), "dd/MM/yy")}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de cierre:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.end_date &&
                      format(new Date(investigation?.end_date), "dd/MM/yy")}
                  </p>
                </li>
              </ul>
              <ul className="flex flex-col gap-6 pl-6">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Áreas involucradas:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.teams?.data
                      .map((team) => team.attributes.name)
                      .join(", ")}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Estado:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.status}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Metodología:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.investigation_types?.data
                      .map((methodology) => methodology.attributes.name)
                      .join(", ")}
                  </p>
                </li>
                <li className="flex flex-col gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Researchers:
                    </span>
                  </label>

                  <ul className="text-sm  w-full capitalize grid grid-cols-2">
                    {investigation?.researchers.data.map(
                      (researcher, index) => (
                        <li className="flex gap-4 items-center" key={index}>
                          <Image
                            alt={
                              researcher.attributes.photo?.data?.[0]?.attributes
                                ?.name
                            }
                            src={
                              researcher.attributes.photo?.data?.[0]?.attributes
                                ?.url
                            }
                            width={30}
                            height={30}
                          />
                          <span>{researcher.attributes.name}</span>
                        </li>
                      )
                    )}
                  </ul>
                </li>
                <li className="flex flex-col gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Equipo extendido:
                    </span>
                  </label>

                  <ul className="text-sm  w-full capitalize grid grid-cols-2">
                    {investigation?.team_extended.data.map((team, index) => (
                      <li className="flex gap-4 items-center" key={index}>
                        <Image
                          className="rounded-full"
                          alt={
                            team.attributes.photo?.data?.[0]?.attributes?.name
                          }
                          src={
                            team.attributes.photo?.data?.[0]?.attributes?.url
                          }
                          width={30}
                          height={30}
                        />
                        <span>{team.attributes.name}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-6">
              <h4
                className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
              >
                Objetivo
              </h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Objetivo Principal:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.goal}
                  </p>
                </li>
                <li className="flex gap-4 flex-col">
                  <label className="flex w-80" htmlFor="description">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Objetivos Especificos:
                    </span>
                  </label>
                  <p className="text-sm w-full">
                    {investigation?.specific_goals}
                  </p>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h4
                className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
              >
                Presentación
              </h4>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Archivo adjunto:
                    </span>
                  </label>

                  <a
                    href={investigation?.guide_media_link}
                    className="text-sm w-full capitalize text-blue-600 hover:underline"
                  >
                    Descargar aquí
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      A quién se presentó:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.presented_to}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de Presentación:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.initial_date &&
                      format(
                        new Date(investigation?.presented_date),
                        "dd/MM/yy"
                      )}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {investigation?.materials.data.map((material, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6">
              <h4 className={`${libre_franklin700.className} text-xl mb-4`}>
                Material de
                {" " +
                  investigation?.investigation_types?.data[index]?.attributes
                    .name}
              </h4>
              <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-4">
                    <label htmlFor="name" className="w-80">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Público objetivo:
                      </span>
                    </label>

                    <p className="text-sm  w-full capitalize">
                      {material?.attributes?.publics?.data
                        .map((item) => item.attributes.name)
                        .join(", ")}
                    </p>
                  </li>
                  <li className="flex gap-4 flex-col">
                    <label className="flex w-80" htmlFor="description">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Muestra:
                      </span>
                    </label>
                    <div className="text-sm w-full">
                      {material.attributes.sample
                        .split("\n")
                        .map((line, index) => (
                          <p key={index}>
                            {line}
                            <br />
                          </p>
                        ))}
                    </div>
                  </li>
                </ul>
                <ul className="flex flex-col gap-4 pl-6">
                  <li className="flex items-center gap-4">
                    <label htmlFor="name" className="w-80">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Ámbito geográfico:
                      </span>
                    </label>

                    <p className="text-sm  w-full capitalize">
                      {material?.attributes?.locations?.data
                        .map((item) => item.attributes.name)
                        .join(", ")}
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <label htmlFor="name" className="w-80">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Herramienta:
                      </span>
                    </label>

                    <p className="text-sm w-full capitalize">
                      {material.attributes.tool}
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <label htmlFor="name" className="w-80">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Herramienta adjunta:
                      </span>
                    </label>

                    <a
                      href={material.attributes.tool_media}
                      className="text-sm w-full capitalize text-blue-600 hover:underline"
                    >
                      Descargar aquí
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h4 className={`${libre_franklin700.className} text-xl mb-4`}>
              Detalle de la investigación
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="">
                <label
                  htmlFor="name"
                  className={`${libre_franklin600.className} mb-3 text-sm font-medium text-gray-900`}
                >
                  Nombre:
                </label>
                <p className="text-sm">{investigation?.name}</p>
              </li>
              <li className="flex flex-col">
                <label
                  className="block mb-3 text-sm font-medium text-gray-900 min-w-40"
                  htmlFor="description"
                >
                  Descripcion
                </label>
                <textarea
                  id="description"
                  readOnly
                  rows="5"
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Write a comment..."
                  defaultValue={investigation?.description}
                ></textarea>
              </li>

              <li className="flex flex-col gap-4">
                <div className="flex">
                  <label
                    htmlFor="project"
                    className={`${libre_franklin600.className} w-full text-sm font-medium text-gray-900 max-w-60`}
                  >
                    Proyecto:
                  </label>
                  <p className="text-sm capitalize grow">
                    {investigation?.project}
                  </p>
                </div>
                <div className="flex">
                  <label
                    htmlFor="project"
                    className={`${libre_franklin600.className} text-sm font-medium text-gray-900 w-full max-w-60`}
                  >
                    Equipos involucrados:
                  </label>
                  <ul className="flex flex-col grow gap-4">
                    {investigation?.teams.data.map((team, index) => {
                      return (
                        <li key={index} className="text-sm capitalize grow">
                          {team?.attributes.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex ">
                  <label
                    htmlFor="date"
                    className={`${libre_franklin600.className} text-sm font-medium text-gray-900 w-full max-w-60`}
                  >
                    Fecha:
                  </label>
                  <p className="text-sm grow">{investigation?.initial_date}</p>
                </div>
                <div className="flex  items-center">
                  <label
                    className="
                      block text-sm 
                      font-medium 
                      text-gray-900 
                      w-full max-w-60"
                  >
                    Estado:
                  </label>
                  <span
                    className={classNames(
                      `${libre_franklin600.className}`,
                      "rounded-lg",
                      "text-xs",
                      "capitalize",
                      "text-white",
                      "px-3",
                      "py-1",
                      "self-start",
                      {
                        "bg-stone-600": investigation?.status === "finalizado",
                        "bg-green-600": investigation?.status === "en curso",
                      }
                    )}
                  >
                    {investigation?.status}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h4
              className={`${libre_franklin700.className} text-xl mb-3 capitalize`}
            >
              Herramienta
            </h4>
            <ul className="flex flex-col gap-8">
              <li className="flex flex-col">
                <label
                  className="block mb-3 text-sm font-medium text-gray-900 min-w-40"
                  htmlFor="guide"
                >
                  Detalle de la guía, cuestionario o herramienta:
                </label>
                <textarea
                  id="guide"
                  rows="15"
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="No hay guía..."
                  defaultValue={investigation?.guide}
                  required
                ></textarea>
              </li>

              <li className="flex gap-4">
                <label className="block mb-3 text-sm font-medium text-gray-900">
                  Guía adjunta:
                </label>
                {investigation?.guide_media ? (
                  <a
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    href={investigation?.guide_media?.data?.attributes?.url}
                  >
                    {investigation?.guide_media?.data?.attributes?.name}
                  </a>
                ) : (
                  <p>No hay guía</p>
                )}
              </li>
              <li className="flex gap-4">
                <label className="block mb-3 text-sm font-medium text-gray-900 w-80">
                  Guía adjunta link:
                </label>
                {investigation?.guide_media_link ? (
                  <a
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    href={investigation?.guide_media_link}
                  >
                    Descargar Guía aquí
                  </a>
                ) : (
                  <p>No hay guía</p>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h4
              className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
            >
              Ficha técnica
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 mb-3">
                  Pùblico objetivo:
                </label>
                <ul className="flex">
                  {investigation?.publics.data.map((audience, index) => {
                    return (
                      <li key={index} className="text-sm capitalize grow">
                        {audience?.attributes.name}
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="flex flex-col">
                <label
                  className={`${libre_franklin600.className} mb-3 text-sm font-medium text-gray-900`}
                >
                  Tipo de investigación:
                </label>
                <ul className="flex">
                  {investigation?.investigation_types.data.map(
                    (type, index) => {
                      return (
                        <li key={index} className="text-gray-900 text-sm grow">
                          {type.attributes.name}
                        </li>
                      );
                    }
                  )}
                </ul>
              </li>

              <li>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 mb-3"
                >
                  Muestra:
                </label>
                <textarea
                  rows="8"
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Escribe la muestra..."
                  defaultValue={investigation?.sample}
                ></textarea>
              </li>

              <li className="flex flex-col">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-900 w-full mb-3"
                >
                  Lugar:
                </label>
                <ul className="flex gap-4">
                  {investigation?.locations.data.map((location, index) => {
                    return (
                      <li key={index} className="text-gray-900 text-sm grow">
                        {location.attributes.name}
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="flex flex-col gap-4">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 w-full max-w-60"
                >
                  Responsables:
                </label>
                <ul className="text-gray-900 text-sm flex  gap-4">
                  {investigation?.researchers.data.map((researcher, index) => {
                    return (
                      <li key={index} className="flex gap-4 items-center grow">
                        <Image
                          alt={
                            researcher.attributes.photo.data[0].attributes.name
                          }
                          src={
                            researcher.attributes.photo.data[0].attributes.url
                          }
                          width={30}
                          height={30}
                        />
                        <span
                          key={index}
                          className="text-gray-900 flex grow text-sm"
                        >
                          {researcher.attributes.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h4
              className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
            >
              Objetivos
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <label className="block text-sm font-medium text-gray-900 min-w-40 mb-3">
                  Objetivo Principal:
                </label>
                <p className="text-gray-900 text-sm">{investigation?.goal}</p>
              </li>
              <li>
                <p className="block text-sm font-medium text-gray-900 min-w-40 mb-3">
                  Objetivos Especificos:
                </p>

                <textarea
                  rows="5"
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Obejtivos especificos..."
                  defaultValue={investigation?.specific_goals}
                ></textarea>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h4
              className={`${libre_franklin700.className} text-xl mb-3 capitalize`}
            >
              Presentación
            </h4>
            {investigation?.media.data ? (
              <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                <li className="w-full block px-4 py-2 border-b border-gray-200">
                  <a
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    href={investigation?.media.data.attributes.url}
                  >
                    {investigation?.media.data.attributes.name}
                  </a>
                </li>
              </ul>
            ) : (
              <p>No se ajuntaron archivos</p>
            )}
          </div>

          {investigation?.insights.data.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-6">
              <h4
                className={`${libre_franklin700.className} text-xl mb-3 capitalize`}
              >
                Insights
              </h4>
              <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                {investigation?.insights?.data.map((insight, index) => (
                  <p
                    key={index}
                    className="w-full block px-4 py-2 border-b border-gray-200"
                  >
                    {insight.attributes.title}
                  </p>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div> */}
    </>
  );
}
