"use client";
import { useContext, useEffect, useState } from "react";
import { Investigation, Project, Public } from "@/app/api";
import { map } from "lodash";
import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { format } from "date-fns";
import { InvestigationsContext } from "@/contexts";

import "./styles.scss";

const projectCtrl = new Project();
const publicCtrl = new Public();

export default function InvestigationsComponent() {
  const {
    investigations,
    pagination,
    getInvestigations,
    filterInvestigations,
  } = useContext(InvestigationsContext);

  const [projects, setProjects] = useState([]);
  const [filterPublics, setFilterPublics] = useState([]);
  const [filters, setFilters] = useState({
    project: "Todos",
    objectivePublic: "Todos",
    sort: "desc",
  });

  const sortOptions = [
    { value: "desc", label: "Más Actual" },
    { value: "asc", label: "Más Antiguo" },
  ];

  const handleFilterClick = async (type, value) => {
    if (type === "reset") {
      setFilters({
        project: "Todos",
        objectivePublic: "Todos",
        sort: "desc",
      });
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const responseProjects = await projectCtrl.getProjects();
        const responsePublics = await publicCtrl.getPublics();

        // Agregar la opción "Todos" al inicio del array de proyectos
        const projectsWithAllOption = [
          { attributes: { name: "Todos", alias: "Todos" } },
          ...responseProjects?.data,
        ];

        // Agregar la opción "Todos" al inicio del array de públicos
        const publicsWithAllOption = [
          { attributes: { name: "Todos", alias: "Todos" } },
          ...responsePublics?.data,
        ];

        setProjects(projectsWithAllOption);
        setFilterPublics(publicsWithAllOption);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (
        filters.project ||
        filters.objectivePublic ||
        filters.sort ||
        filters.page
      ) {
        try {
          if (
            filters.project === "Todos" &&
            filters.objectivePublic === "Todos" &&
            filters.sort === "desc" &&
            filters.page === 1
          ) {
            await getInvestigations();
          } else {
            await filterInvestigations({
              project: filters.project === "Todos" ? "" : filters.project,
              objectivePublic:
                filters.objectivePublic === "Todos"
                  ? ""
                  : filters.objectivePublic,
              sort: filters.sort,
              pagination: { page: filters.page || 1 },
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [filters]);

  //Setea la pagina a 1 cuando se cambia el proyecto o el publico objetivo
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
  }, [filters.project, filters.objectivePublic]);

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex items-center">
          <h4
            className={`${libre_franklin600.className} text-slate-700 capitalize text-3xl mb-6`}
          >
            Investigaciones
          </h4>
          {/* <ul className="flex flex-wrap gap-1 mb-6 ml-6">
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
          </ul> */}
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
            Agregar Investigación
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4 self-start">
          <ul className="grid grid-cols-3 gap-4 ">
            {map(investigations, (investigation) => {
              let locationNames =
                investigation.attributes?.materials?.data.flatMap((material) =>
                  material.attributes.locations.data.map(
                    (location) => location.attributes.name
                  )
                );

              let publics = investigation.attributes?.materials?.data.flatMap(
                (material) =>
                  material.attributes.publics.data.map(
                    (publicName) => publicName.attributes.name
                  )
              );

              //removing duplicates
              publics = [...new Set(publics)];

              locationNames = locationNames?.map((name) =>
                name === "Lima" ? "Lima" : "Provincia"
              );

              locationNames = [...new Set(locationNames)];

              locationNames.sort((a, b) =>
                a === "Lima" ? -1 : b === "Lima" ? 1 : 0
              );

              return (
                <li
                  className="
                      border border-gray-200 
                      rounded-lg p-5 box-border
                      self-start
                      justify-between 
                      hover:shadow-md transition-all 
                      duration-300 ease-in-out cursor-pointer"
                  key={investigation?.id}
                >
                  <Link
                    className="divide-y divide-gray-300 "
                    href={`/investigations/${investigation?.attributes?.slug}`}
                  >
                    <div>
                      <div className="mb-3">
                        <h4
                          title={investigation?.attributes?.name}
                          className={`${libre_franklin500.className} capitalize min-h-10 text-slate-800 text-sm`}
                        >
                          {investigation?.attributes?.name}
                        </h4>
                      </div>

                      <div className="flex mb-3 min-h-4 items-center">
                        <div className="flex gap-2 ">
                          {locationNames.length ? (
                            locationNames.map((name, index) => (
                              <p
                                key={index}
                                className="text-xs align-center flex border px-2 rounded-md"
                              >
                                {name}
                              </p>
                            ))
                          ) : (
                            <p style={{ minHeight: 8 }}></p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mb-3 min-h-4">
                        {publics?.length > 0 &&
                          publics?.slice(0, 2).map((publicItem, index) => (
                            <span
                              key={index}
                              className={`${libre_franklin600.className} text-xs capitalize`}
                            >
                              {publicItem}
                            </span>
                          ))}

                        {publics?.length > 2 && (
                          <span
                            className={`${libre_franklin600.className} text-xs capitalize`}
                          >
                            {`+ ${publics?.length - 2}`}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span
                          className={`${libre_franklin500.className} text-xs block mb-2`}
                        >
                          <strong>Inicio:{"  "}</strong>
                          {investigation?.attributes?.initial_date &&
                            format(
                              new Date(investigation?.attributes?.initial_date),
                              "dd/MM/yy"
                            )}
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
                            "px-2",
                            "py-1",
                            {
                              "bg-stone-600":
                                investigation?.attributes?.status ===
                                "finalizado",
                              "bg-teal-600":
                                investigation?.attributes?.status ===
                                "en curso",
                              "bg-rose-600":
                                investigation?.attributes?.status ===
                                "bloqueado",
                              "bg-sky-600":
                                investigation?.attributes?.status ===
                                "por iniciar",
                            }
                          )}
                        >
                          {investigation?.attributes?.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex pt-2 ">
                      <p
                        className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                      >
                        {
                          investigation?.attributes?.project?.data?.attributes
                            .name
                        }
                      </p>
                      <ul className="flex items-center investigations-researchers justify-between grow relative w-40">
                        {investigation?.attributes?.researchers.data
                          .slice(0, 2)
                          .map((researcher, index) => {
                            return (
                              <li
                                className="
                                  investigations-researcher 
                                  relative border-2 border-white
                                  rounded-full"
                                key={index}
                              >
                                <Image
                                  src={
                                    researcher.attributes.photo.data[0]
                                      .attributes.url
                                  }
                                  alt={
                                    researcher.attributes.photo.data[0]
                                      .attributes.name
                                  }
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              </li>
                            );
                          })}
                        {investigation?.attributes?.researchers.data.length >
                          2 && (
                          <li className="absolute right-0 bottom-0 w-8">
                            <span
                              className={`${libre_franklin600.className} rounded-md text-xs flex justify-center bg-stone-600 text-white`}
                            >
                              +{" "}
                              {investigation?.attributes?.researchers.data
                                .length - 2}{" "}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {pagination?.pageCount > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <ul>
                {
                  <ul className="flex gap-2">
                    {Array.from(
                      { length: pagination?.pageCount },
                      (_, index) => index + 1
                    ).map((page) => (
                      <li key={page}>
                        <button
                          onClick={() => handleFilterClick("page", page)}
                          className={classNames(
                            pagination?.page === page
                              ? "bg-blue-100"
                              : "bg-gray-100",
                            pagination?.page === page
                              ? "text-blue-800"
                              : "text-gray-800",
                            "text-xs",
                            "font-medium",
                            "h-7",
                            "w-7",
                            "rounded-lg"
                          )}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                }
              </ul>
              <p className="text-xs">
                Muestra{" "}
                {pagination?.page * pagination?.pageSize -
                  pagination?.pageSize +
                  1}{" "}
                a{" "}
                {Math.min(
                  pagination?.page * pagination?.pageSize,
                  pagination?.total
                )}{" "}
                de {pagination?.total} resultados
              </p>
            </div>
          )}
        </div>
        <div className="w-1/4 border border-gray-200 rounded-xl p-4 self-start">
          <div className="flex items-center justify-between mb-5">
            <h3 className={`${libre_franklin600.className} block text-lg`}>
              Filtros
            </h3>
            <button
              className="text-xs underline text-blue-800"
              onClick={() => handleFilterClick("reset")}
            >
              Limpiar todo
            </button>
          </div>
          <div>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Ordenar por
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {sortOptions.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleFilterClick("sort", option.value)}
                    className={classNames(
                      filters.sort === option.value
                        ? "bg-blue-100"
                        : "bg-gray-100",
                      filters.sort === option.value
                        ? "text-blue-800"
                        : "text-gray-800",
                      "text-xs",
                      "font-medium",
                      "me-2",
                      "px-3",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Proyecto
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {projects?.map((project, index) => (
                <li key={index}>
                  <button
                    onClick={() =>
                      handleFilterClick("project", project.attributes.name)
                    }
                    className={classNames(
                      filters.project === project.attributes.name
                        ? "bg-blue-100"
                        : "bg-gray-100",
                      filters.project === project.attributes.name
                        ? "text-blue-800"
                        : "text-gray-800",
                      "text-xs",
                      "font-medium",
                      "me-2",
                      "px-3",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {project.attributes.alias}
                  </button>
                </li>
              ))}
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Público objetivo
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {filterPublics.map((publicItem, index) => (
                <li key={index}>
                  <button
                    onClick={() =>
                      handleFilterClick(
                        "objectivePublic",
                        publicItem.attributes.name
                      )
                    }
                    className={classNames(
                      filters.objectivePublic === publicItem.attributes.name
                        ? "bg-blue-100"
                        : "bg-gray-100",
                      filters.objectivePublic === publicItem.attributes.name
                        ? "text-blue-800"
                        : "text-gray-800",
                      "text-xs",
                      "font-medium",
                      "me-2",
                      "px-3",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {publicItem.attributes.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
