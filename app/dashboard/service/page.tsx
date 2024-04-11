import { API_URL } from "@/config";
import { libre_franklin600 } from "@/app/fonts";
import Link from "next/link";

async function getResearchs() {
  const res = await fetch(`${API_URL}/api/researchs?researchs`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const { data } = await res.json();

  return data;
}

export default async function ServicePage() {
  const researchs = await getResearchs();

  return (
    <>
      <h4 className={`${libre_franklin600.className} capitalize text-3xl mb-6`}>
        Service
      </h4>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo de Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Fase
              </th>
              <th scope="col" className="px-6 py-3">
                Negocio
              </th>
              <th scope="col" className="px-6 py-3">
                Giro
              </th>
              <th scope="col" className="px-6 py-3">
                Proyecto
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {researchs.map(({ attributes, id }: any) => (
              <tr key={id} className="odd:bg-white hover:bg-gray-50 border-b">
                <td className="px-6 py-4">{attributes.day}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {attributes.name}
                </th>
                <td className="px-6 py-4">{attributes.UserType}</td>
                <td className="px-6 py-4">Fase {attributes.phase}</td>
                <td className="px-6 py-4">{attributes.Business}</td>
                <td className="px-6 py-4">{attributes.BusinessLine}</td>
                <td className="px-6 py-4">{attributes.Project}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`researchs/${id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </>
  );
}
