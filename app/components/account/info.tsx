"use client";
import { useAuth } from "@/app/hooks";

export default function AccountInfo() {
  const { user } = useAuth();

  console.log(user);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl">Datos personales</h2>

        <div className="flex gap-4">
          <button
            type="button"
            className=" w-36 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10"
          >
            Cancelar
          </button>

          <button
            type="button"
            className="flex gap-2 w-36 justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H9.621a1.5 1.5 0 0 1-1.06-.44L7.439 2.44A1.5 1.5 0 0 0 6.38 2H3.5ZM8 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 6Z"
                clipRule="evenodd"
              />
            </svg>
            Guardar
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="border border-gray-200 rounded-lg p-5 box-border flex flex-col divide-y divide-gray-300 justify-between hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer">
          <h2 className="text-xl capitalize">
            {user?.firstname} {user?.lastname}
          </h2>
        </div>
        <div>personal info</div>
        <div>another info</div>
        <div>proyectos</div>
      </div>
    </>
  );
}
