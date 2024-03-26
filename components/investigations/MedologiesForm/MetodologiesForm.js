"use client";

import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import { useEffect, useState } from "react";

import { MultiSelect } from "react-multi-select-component";
import Link from "next/link";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { validationSchema } from "./MethodologiesForm.form";
import { Material, Public, Location } from "@/app/api";
import { uploadToS3 } from "@/utils";

export function MetodologiesForm({ investigation }) {
  const router = useRouter();

  const [publics, setPublics] = useState([]);
  const [locations, setLocations] = useState([]);

  const publicCtrl = new Public();
  const materialCtrl = new Material();
  const locationCtrl = new Location();

  const formik = useFormik({
    initialValues: investigation.attributes.investigation_types.data.reduce(
      (acc, methodology) => ({
        ...acc,
        [methodology.id]: {
          publics: [],
          sample: "",
          locations: [],
          tool: "",
          tool_media: null,
        },
      }),
      {}
    ),
    validationSchema: validationSchema(),
    onSubmit: async (values) => {
      try {
        for (const investigationType of investigation.attributes
          .investigation_types.data) {
          const material = {
            investigation_id: investigation.id,
            investigation_type_id: investigationType.id,
            publics: values[investigationType.id].publics.map(
              (item) => item.value
            ),
            sample: values[investigationType.id].sample,
            locations: values[investigationType.id].locations.map(
              (location) => location.value
            ),
            tool: values[investigationType.id].tool,
            tool_media: values[investigationType.id].tool_media,
            investigation: investigation.id,
          };

          if (material.tool_media) {
            const fileUrl = await uploadToS3(material.tool_media);
            material.tool_media = fileUrl;
          }

          let result = await materialCtrl.createMaterial(material);
          router.push("/investigations", { scroll: false });
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const responsePublics = await publicCtrl.getPublics();
        const responseLocations = await locationCtrl.getLocations();

        setPublics(
          responsePublics.data.map((audience) => ({
            value: audience.id,
            label: audience.attributes.name,
          }))
        );

        setLocations(
          responseLocations.data.map((location) => ({
            value: location.id,
            label: location.attributes.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
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
            className={`${libre_franklin700.className} flex flex-col ml-3 text-slate-700 capitalize text-xl`}
          >
            Agregar Materiales
          </h4>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Guardar
        </button>
      </div>
      {investigation.attributes?.investigation_types.data.map(
        (methodology, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6">
            <h4 className={`${libre_franklin700.className} text-xl mb-4`}>
              Material de {methodology.attributes.name}
            </h4>
            <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <label htmlFor="publics" className="flex flex-col w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Público objetivo:
                    </span>
                    <span className="text-xs font-regular">
                      Hacía quienes va dirigido
                    </span>
                  </label>
                  <MultiSelect
                    className="w-full"
                    options={publics}
                    labelledBy="Select"
                    value={formik.values[methodology.id]?.publics}
                    onChange={(value) =>
                      formik.setFieldValue(`${methodology.id}.publics`, value)
                    }
                    error={formik.errors.publics}
                  />
                </li>

                <li className="flex gap-4">
                  <label className="flex flex-col w-80" htmlFor="sample">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Muestra
                    </span>
                    <span className="text-xs font-regular">
                      Escribe la muestra
                    </span>
                  </label>
                  <textarea
                    id="sample"
                    rows="5"
                    className="w-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                    placeholder="Escribir la muestra..."
                    // defaultValue={investigation?.sample}
                    value={formik.values[methodology.id]?.sample || ""}
                    onChange={(event) =>
                      formik.setFieldValue(
                        `${methodology.id}.sample`,
                        event.target.value
                      )
                    }
                    error={formik.errors[methodology.id]?.sample}
                  ></textarea>
                </li>

                <li className="flex items-center gap-4">
                  <label
                    htmlFor="investigation_types"
                    className="flex flex-col w-80"
                  >
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Ámbito geográfico
                    </span>
                    <span className="text-xs font-regular">
                      Lugares de investigacion
                    </span>
                  </label>
                  <MultiSelect
                    className="w-full"
                    options={locations}
                    value={formik.values[methodology.id]?.locations}
                    onChange={(value) =>
                      formik.setFieldValue(`${methodology.id}.locations`, value)
                    }
                    error={formik.errors.locations}
                  />
                </li>
              </ul>
              <ul className="flex flex-col gap-4 pl-6">
                <li className="flex gap-4">
                  <label className="flex flex-col w-80" htmlFor="tool">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Herramienta
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 10 caracteres
                    </span>
                  </label>
                  <input
                    type="text"
                    id="tool"
                    className="
                      self-start 
                      border border-gray-300 
                      text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5"
                    placeholder="Nombre de la herramienta"
                    value={formik.values[methodology.id]?.tool || ""}
                    onChange={(event) =>
                      formik.setFieldValue(
                        `${methodology.id}.tool`,
                        event.target.value
                      )
                    }
                    error={formik.errors[methodology.id]?.tool}
                  />
                </li>
                <li className="flex gap-4">
                  <label className="flex flex-col w-80" htmlFor="tool_media">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Adjuntar herramienta
                    </span>
                    <span className="text-xs font-regular">
                      (Jpg,Png, Pdf, Docx, Xlsx, Pptx)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="tool_media"
                    onChange={(event) => {
                      formik.setFieldValue(
                        `${methodology.id}.tool_media`,
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
        )
      )}
    </form>
  );
}
