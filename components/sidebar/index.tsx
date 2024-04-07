"use client";
import { useAuth } from "@/hooks";
import Image from "next/image";
import { libre_franklin600, libre_franklin500 } from "../../app/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ENV } from "@/utils/constants";

export default function SidebarComponent() {
  const { user, updateUser } = useAuth();

  const updateUserDemo = () => {
    updateUser("username", "pepito");
  };

  const pathname = usePathname();

  const links = [
    // {
    //   name: "Dashboard",
    //   href: "/dashboard",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 16 16"
    //       fill="currentColor"
    //       className="w-4 h-4"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
    //         clipRule="evenodd"
    //       />
    //       <path
    //         fillRule="evenodd"
    //         d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Investigaciones",
      href: "/investigations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Cliente Amigo",
      href: "/subscribers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M6 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          <path
            fillRule="evenodd"
            d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm3.5 2.5a3 3 0 1 0 1.524 5.585l1.196 1.195a.75.75 0 1 0 1.06-1.06l-1.195-1.196A3 3 0 0 0 7.5 4.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="
          inline-flex items-center 
          p-2 mt-2 ms-3 text-sm 
          text-gray-500 rounded-lg 
          sm:hidden hover:bg-gray-100 
          focus:outline-none focus:ring-2 
          focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="
          fixed top-0 left-0 
          z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div
          className="
          flex-col h-full px-3 py-4 overflow-y-auto bg-gray-900 flex items-center"
        >
          <Image
            src="/logo.png"
            className="mt-5 mb-10"
            width={145}
            height={32}
            alt="logo"
          ></Image>
          <figure className="flex flex-col items-center mb-10">
            <Image
              className="rounded-full"
              loader={() => {
                return `${user?.photo.url}`;
              }}
              src={user?.photo.url}
              alt={user?.photo.name}
              width={80}
              height={80}
            ></Image>
            <figcaption className="mt-2 text-white text-center ">
              <p
                className={`${libre_franklin600.className} capitalize text-lg`}
              >
                {user?.firstname} {user?.lastname}
              </p>
              <p
                className={`${libre_franklin500.className} text-sm capitalize`}
              >
                {user?.position}
              </p>
              {/* <span className="text-white">{user?.position}</span> */}
            </figcaption>
          </figure>
          {/* </div> */}
          <ul className="space-y-2 w-full">
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`
                      flex 
                      items-center 
                      p-2
                      rounded-lg 
                      text-white 
                      hover:bg-gray-700 group
                    ${pathname === link.href ? "bg-gray-700" : ""}
                    `}
                  >
                    <span
                      className={`${libre_franklin600.className} text-md ms-3 flex items-center gap-2`}
                    >
                      {link.icon}

                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
