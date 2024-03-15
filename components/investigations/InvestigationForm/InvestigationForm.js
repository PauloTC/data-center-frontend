"use client";
import slugify from "slugify";
import Link from "next/link";
import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import { useEffect, useState } from "react";

import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";

import { Investigation } from "@/app/api";
import { Team, Public, InvestigationType, Researcher } from "@/app/api";

import { useFormik } from "formik";
import { initialValues, validationSchema } from "./InvestigationForm.form";
import { useRouter } from "next/navigation";

import AWS from "aws-sdk";

export function InvestigationForm({ params, title }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      console.log("formValues", formValues);
      try {
        const slug = slugify(formValues.name, { lower: true, strict: true });
        const teams = formValues.teams.map((team) => team.value);
        const publics = formValues.publics.map((audience) => audience.value);
        const locations = formValues.locations.map(
          (location) => location.value
        );
        const investigation_types = formValues.investigation_types.map(
          (type) => type.value
        );
        const researchers = formValues.researchers.map(
          (researcher) => researcher.value
        );

        const file = formValues.guide_media_link;

        const guide_media_link = await uploadToS3(file);

        console.log("s3Url", guide_media_link);

        await investigationCtrl.createInvestigation({
          ...formValues,
          slug,
          teams,
          publics,
          locations,
          investigation_types,
          researchers,
          guide_media_link,
        });
        formik.handleReset();
        router.push("/investigations", { scroll: false });
      } catch (error) {
        console.error(error);
      }
    },
  });

  AWS.config.update({
    accessKeyId: "AKIARUO3BI5AIKALEON6",
    secretAccessKey: "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",
    region: "sa-east-1", // ej. 'us-east-1'
  });

  const s3 = new AWS.S3();

  // Función para subir un archivo a S3
  async function uploadToS3(file) {
    const params = {
      Bucket: "data-center-strapi",
      Key: file.name, // Nombre del archivo en tu bucket S3
      Body: file,
      ACL: "public-read", // Si quieres que el archivo sea público
    };

    try {
      const data = await s3.upload(params).promise();
      console.log(`Archivo subido exitosamente en ${data.Location}`);
      return data.Location;
    } catch (error) {
      console.log("Error al subir el archivo:", error);
      throw error;
    }
  }

  const investigationCtrl = new Investigation();
  const investigationTypeCtrl = new InvestigationType();
  const teamCtrl = new Team();
  const publicCtrl = new Public();
  const researcherCtrl = new Researcher();

  const [investigation, setInvestigation] = useState(null);
  const [teams, setTeams] = useState([]);
  const [investigationTypes, setInvestigationTypes] = useState([]);
  const [publics, setPublics] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        //si se le pasa parametros a la funcion, se obtiene la investigacion
        if (params) {
          const response = await investigationCtrl.getInvestigation(
            params?.slug
          );

          console.log("response", response);
          setInvestigation(response?.attributes);
        }

        const responseTeams = await teamCtrl.getTeams();
        const responsePublics = await publicCtrl.getPublics();
        const responseInvestigationTypes =
          await investigationTypeCtrl.getInvestigationTypes();
        const responseResearchers = await researcherCtrl.getResearchers();

        setTeams(
          responseTeams.data.map((team) => ({
            value: team.id,
            label: team.attributes.name,
          }))
        );

        setPublics(
          responsePublics.data.map((audience) => ({
            value: audience.id,
            label: audience.attributes.name,
          }))
        );

        setInvestigationTypes(
          responseInvestigationTypes.data.map((type) => ({
            value: type.id,
            label: type.attributes.name,
          }))
        );

        setResearchers(
          responseResearchers.data.map((researcher) => ({
            value: researcher.id,
            label: researcher.attributes.name,
          }))
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (params) {
      const selectedTeams = teams?.filter((team) =>
        investigation?.teams?.data.some((t) => t.id === team.value)
      );

      if (selectedTeams) setSelected(selectedTeams);
    }
  }, [teams, investigation]);

  const projects = [
    { value: "dexarrollate", label: "Dexarrollate" },
    { value: "diadia", label: "Diadía" },
    { value: "diadia dex", label: "Diadía Dex" },
    { value: "insuma", label: "Insuma" },
    { value: "loyalty", label: "Loyalty" },
    { value: "planeamiento financiero", label: "Planeamiento Financiero" },
    { value: "web de clientes", label: "Web de Clientes" },
    { value: "web del vendedor", label: "Web del Vendedor" },
    { value: "nitro", label: "Nitro" },
    { value: "propuesta valor B2B", label: "Propuesta Valor B2B" },
    { value: "genia", label: "Genia" },
    { value: "eficiencias", label: "Eficiencias" },
  ];

  const dates = [
    { value: "Q1 2024", label: "Q1 2024" },
    { value: "Q2 2024", label: "Q2 2024" },
    { value: "Q3 2024", label: "Q3 2024" },
    { value: "Q4 2024", label: "Q4 2024" },
  ];

  const scopes = [
    { value: "macro", label: "Macro" },
    { value: "mixto", label: "Mixto" },
    { value: "puntual", label: "Puntual" },
  ];

  const status = [
    { value: "en curso", label: "En curso" },
    { value: "finalizado", label: "Finalizado" },
    { value: "por iniciar", label: "Por iniciar" },
    { value: "bloqueado", label: "Bloqueado" },
  ];

  const locations = [
    {
      value: 1,
      label: "Lima",
    },
    {
      value: 2,
      label: "Provincias",
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
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
          <h4
            className={`${libre_franklin600.className} ml-3 text-slate-700 uppercase text-xl`}
          >
            {title}
          </h4>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Guardar
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h4 className={`${libre_franklin700.className} text-xl mb-4`}>
              Ficha Técnica
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="flex flex-col w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Título de la investigación*
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 20 caracteres
                    </span>
                  </label>

                  <input
                    defaultValue={investigation?.name}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                    maxLength={20}
                    type="text"
                    id="name"
                    className="
                      bg-gray-50 self-start 
                      border border-gray-300 
                      text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5"
                    placeholder="Titulo de la investigación"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label className="flex flex-col w-80" htmlFor="description">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Contexto de investigación
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 200 caracteres
                    </span>
                  </label>
                  <textarea
                    id="description"
                    rows="5"
                    maxlength="200"
                    className="w-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                    placeholder="Escribir la descripción..."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.errors.description}
                    required
                  ></textarea>
                </li>

                <li className="flex items-center gap-4">
                  <label htmlFor="project" className="flex flex-col w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Proyecto*
                    </span>
                    <span className="text-xs font-regular">
                      Proyecto de la investigación
                    </span>
                  </label>
                  <select
                    value={formik.values.project}
                    onChange={formik.handleChange}
                    error={formik.errors.project}
                    required
                    id="project"
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
                    <option value="">Seleccionar proyecto</option>
                    {projects.map((project) => (
                      <option key={project.value} value={project.value}>
                        {project.label}
                      </option>
                    ))}
                  </select>
                </li>

                <li>Fecha de inicio</li>
                <li>Fecha de fin </li>

                {/* <li className="flex items-center">
                  <label
                    htmlFor="date"
                    className={`
                      ${libre_franklin600.className} 
                      block text-sm font-medium
                      w-full
                      max-w-60
                      text-gray-900`}
                  >
                    Trimestre*
                  </label>
                  <select
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.errors.date}
                    required
                    id="date"
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
                    <option value="">Seleccionar Fecha</option>
                    {dates.map((date) => (
                      <option key={date.value} value={date.value}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                </li> */}

                {/* <li className="flex items-center">
                  <label
                    htmlFor="scope"
                    className={`
                      ${libre_franklin600.className} 
                      block text-sm font-medium
                      w-full
                      max-w-60
                      text-gray-900`}
                  >
                    Amplitud*
                  </label>

                  <select
                    value={formik.values.scope}
                    onChange={formik.handleChange}
                    error={formik.errors.scope}
                    required
                    id="scope"
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
                    <option value="">Seleccionar Amplitud</option>
                    {scopes.map((scope) => (
                      <option key={scope.value} value={scope.value}>
                        {scope.label}
                      </option>
                    ))}
                  </select>
                </li> */}
              </ul>
              <ul className="flex flex-col gap-6">
                <li className="flex gap-4">
                  <label htmlFor="teams" className="flex flex-col w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Áreas involucradas:
                    </span>
                    <span className="text-xs font-regular">
                      Areas que participan
                    </span>
                  </label>

                  <MultiSelect
                    className="w-full"
                    required
                    options={teams}
                    placeholder="Seleccionar equipos"
                    value={formik.values.teams}
                    onChange={(value) => formik.setFieldValue("teams", value)}
                    error={formik.errors.teams}
                    labelledBy="Select"
                  />
                </li>

                <li className="flex items-center gap-4">
                  <label htmlFor="status" className="flex flex-col w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Estado:
                    </span>
                    <span className="text-xs font-regular">
                      Estado de la investigación
                    </span>
                  </label>
                  <select
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.errors.status}
                    required
                    id="status"
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
                    {status.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </li>

                <li className="flex gap-4">
                  <label
                    className="flex flex-col w-80"
                    htmlFor="investigation_types"
                  >
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Metodologías:
                    </span>
                    <span className="text-xs font-regular">
                      Tipo de investigación
                    </span>
                  </label>
                  <MultiSelect
                    className="w-full"
                    options={investigationTypes}
                    value={formik.values.investigation_types}
                    onChange={(value) =>
                      formik.setFieldValue("investigation_types", value)
                    }
                    error={formik.errors.investigation_types}
                    labelledBy="Select"
                  />
                </li>

                <li className="flex gap-4">
                  <label className="flex flex-col w-80" htmlFor="researchers">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Researchers:
                    </span>
                    <span className="text-xs font-regular">
                      Principales responsables
                    </span>
                  </label>
                  <MultiSelect
                    className="w-full"
                    options={researchers}
                    value={formik.values.researchers}
                    onChange={(value) =>
                      formik.setFieldValue("researchers", value)
                    }
                    error={formik.errors.researchers}
                    labelledBy="Select"
                  />
                </li>

                <li className="flex gap-4">
                  <label className="flex flex-col w-80" htmlFor="researchers">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Extended Team:
                    </span>
                    <span className="text-xs font-regular">
                      Personas involucradas
                    </span>
                  </label>
                  <MultiSelect
                    className="w-full"
                    options={researchers}
                    value={formik.values.researchers}
                    onChange={(value) =>
                      formik.setFieldValue("researchers", value)
                    }
                    error={formik.errors.researchers}
                    labelledBy="Select"
                  />
                </li>
              </ul>
            </div>
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
                  rows="10"
                  value={formik.values.guide}
                  onChange={formik.handleChange}
                  error={formik.errors.description}
                  className="w-full min-h-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Escribe el detalle de la guía, cuestionario o herramienta..."
                ></textarea>
              </li>
              <li className="flex flex-col">
                <label
                  className="block mb-3 text-sm font-medium text-gray-900 min-w-40"
                  htmlFor="guide_media"
                >
                  Guia multimedia
                </label>
                <input
                  type="file"
                  id="guide_media_link"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "guide_media_link",
                      event.currentTarget.files[0]
                    );
                  }}
                />
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
                <label
                  htmlFor="publics"
                  className="block text-sm font-medium text-gray-900 w-full mb-3"
                >
                  Público objetivo:
                </label>
                <MultiSelect
                  className="w-full"
                  options={publics}
                  value={formik.values.publics}
                  onChange={(value) => formik.setFieldValue("publics", value)}
                  error={formik.errors.publics}
                  labelledBy="Select"
                />
              </li>

              <li className="flex flex-col">
                <label
                  className="block mb-3 text-sm font-medium text-gray-900 min-w-40"
                  htmlFor="sample"
                >
                  Muestra
                </label>
                <textarea
                  id="sample"
                  rows="5"
                  className="w-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Escribir la muestra..."
                  defaultValue={investigation?.sample}
                  value={formik.values.sample}
                  onChange={formik.handleChange}
                  error={formik.errors.sample}
                ></textarea>
              </li>

              <li className="flex flex-col">
                <label
                  htmlFor="investigation_types"
                  className="block text-sm font-medium text-gray-900 w-full mb-3"
                >
                  Lugar:
                </label>
                <MultiSelect
                  className="w-full"
                  options={locations}
                  value={formik.values.locations}
                  onChange={(value) => formik.setFieldValue("locations", value)}
                  error={formik.errors.locations}
                  labelledBy="Select"
                />
              </li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h4
              className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
            >
              Objetivo
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="">
                <label
                  htmlFor="goal"
                  className={`
                    ${libre_franklin600.className} 
                    block mb-3 text-sm font-medium 
                    text-gray-900`}
                >
                  Principal:
                </label>

                <input
                  defaultValue={investigation?.goal}
                  value={formik.values.goal}
                  onChange={formik.handleChange}
                  error={formik.errors.goal}
                  type="text"
                  id="goal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Escribe el principal objetivo de la investigación"
                />
              </li>

              <li className="flex flex-col">
                <label
                  className={`${libre_franklin600.className} block mb-3 text-sm font-medium text-gray-900 min-w-40`}
                  htmlFor="specific_goals"
                >
                  Especificos:
                </label>
                <textarea
                  id="specific_goals"
                  rows="5"
                  className="w-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                  placeholder="Escribir los objetivos especificos..."
                  defaultValue={investigation?.specific_goals}
                  value={formik.values.specific_goals}
                  onChange={formik.handleChange}
                  error={formik.errors.specific_goals}
                ></textarea>
              </li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h4
              className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
            >
              Presentación
            </h4>
            <li className="flex flex-col">
              <label
                className="block mb-3 text-sm font-medium text-gray-900 min-w-40"
                htmlFor="guide_media"
              >
                Adjuntar archivo
              </label>
              <input
                type="file"
                id="guide_media"
                onChange={(event) => {
                  formik.setFieldValue(
                    "guide_media",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </li>
          </div>
        </div>
      </div>
    </form>
  );
}
