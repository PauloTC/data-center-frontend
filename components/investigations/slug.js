"use client";
import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import Image from "next/image";
import { Investigation } from "@/app/api";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function InvestigationSlugComponent({ params }) {
  const investigationCtrl = new Investigation();

  const [investigation, setInvestigation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await investigationCtrl.getInvestigation(params.slug);
        setInvestigation(response.attributes);
        console.log(`response`, response);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3
          className={`${libre_franklin600.className} text-slate-700 uppercase text-xl`}
        >
          {investigation?.name}
        </h3>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Editar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h4 className={`${libre_franklin700.className} text-xl mb-4`}>
              Detalle de la investigación
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="">
                <label
                  htmlFor="name"
                  className={`${libre_franklin600.className} block mb-3 text-sm font-medium text-gray-900`}
                >
                  Nombre:
                </label>
                <p className="text-sm">{investigation?.name}</p>
                {/* <input
                    type="text"
                    id="name"
                    readOnly
                    value={attributes.name}
                    className="
                      bg-gray-50 
                      border border-gray-300 
                      text-gray-900 
                      text-sm 
                      rounded-lg 
                      focus:ring-blue-500 
                      focus:border-blue-500 
                      block 
                      w-full 
                      p-2.5"
                    placeholder="Paulo Roberto"
                    required
                  /> */}
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
                  rows="5"
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Write a comment..."
                  defaultValue={investigation?.description[0].children[0].text}
                  required
                ></textarea>
              </li>

              <li className="flex flex-col gap-4">
                <div className="flex">
                  <label
                    htmlFor="project"
                    className={`${libre_franklin600.className} w-full text-sm font-medium text-gray-900 max-w-60	`}
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
                        <li className="text-sm capitalize grow">
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
                  <p className="text-sm grow">{investigation?.date}</p>
                </div>
                <div className="flex">
                  <label
                    htmlFor="scope"
                    className="text-sm font-medium text-gray-900 w-full max-w-60"
                  >
                    Amplitud:
                  </label>
                  <p className="text-sm capitalize grow">
                    {investigation?.scope}
                  </p>
                </div>
                <div className="flex gap-8 items-center">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-900 min-w-40"
                  >
                    Estado:
                  </label>
                  <span
                    className={classNames(
                      `${libre_franklin600.className}`,
                      "rounded-lg",
                      "text-xs",
                      "block",
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
                  {/* <select
                      id="phase"
                      className="
                        bg-gray-50 
                        border 
                        border-gray-300 
                        text-gray-900 
                        text-sm rounded-lg 
                        focus:ring-blue-500 
                        focus:border-blue-500 
                        block w-full p-2.5"
                    >
                      <option selected>{`${attributes.status}`}</option>
                      <option value="open">Abierto</option>
                      <option value="in progress">En progreso</option>
                    </select> */}
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
              {investigation?.guide && (
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
                    placeholder="Write a comment..."
                    defaultValue={investigation?.guide[0].children[0].text}
                    required
                  ></textarea>
                </li>
              )}

              <li className="flex gap-4">
                <label className="block mb-3 text-sm font-medium text-gray-900">
                  Guía adjunta:
                </label>
                {investigation?.guide_media ? (
                  <a
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    href={investigation?.guide_media.data.attributes.url}
                  >
                    {investigation?.guide_media.data.attributes.name}
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
              <li className="flex gap-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-900 min-w-40"
                >
                  Publico:
                </label>
                {investigation?.publics.data.map((audience, index) => {
                  return (
                    <p key={index} className="text-gray-900 text-sm mb-2">
                      {audience.attributes.name}
                    </p>
                  );
                })}
              </li>

              <li className="flex gap-4">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 min-w-40"
                >
                  Tipo de investigación:
                </label>
                {investigation?.investigation_types.data.map((type, index) => {
                  return (
                    <p key={index} className="text-gray-900 text-sm">
                      {type.attributes.name}
                    </p>
                  );
                })}
              </li>

              <li>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 min-w-40 mb-3"
                >
                  Muestra:
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Write a comment..."
                  defaultValue={investigation?.sample[0].children[0].text}
                  required
                ></textarea>
              </li>

              <li className="flex gap-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-900 min-w-40"
                >
                  Lugar:
                </label>
                {investigation?.locations.data.map((location, index) => {
                  return (
                    <p key={index} className="text-gray-900 text-sm grow">
                      {location.attributes.name}
                    </p>
                  );
                })}
              </li>

              <li className="flex gap-4 flex-col">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 min-w-40"
                >
                  Researchers:
                </label>
                <ul className="text-gray-900 text-sm flex gap-4">
                  {investigation?.researchers.data.map((researcher, index) => {
                    return (
                      <li className="flex gap-4 items-center grow">
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

              <li>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 min-w-40 mb-3"
                >
                  Objetivo Principal:
                </label>
                <p className="text-gray-900 text-sm">{investigation?.goal}</p>
              </li>

              <li>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-900 min-w-40 mb-3"
                >
                  Objetivos Especificos:
                </label>

                {investigation?.specific_goals.map((goal, index) => {
                  return (
                    <p key={index} className="text-gray-900 text-sm mb-2">
                      {goal.children[0].text}
                    </p>
                  );
                })}
              </li>
            </ul>
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

          {investigation?.media.data && (
            <div className="border border-gray-200 rounded-xl p-6">
              <h4
                className={`${libre_franklin700.className} text-xl mb-3 capitalize`}
              >
                Presentación
              </h4>
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
            </div>
          )}
        </div>
      </div>
    </>
    // <>
    //   <h3>Investigation Detail</h3>

    // </>
  );
}
