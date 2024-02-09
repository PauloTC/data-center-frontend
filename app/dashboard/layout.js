import SidebarComponent from "@/app/components/sidebar";
import HeaderComponent from "@/app/components/header";

export default function LayoutPage({ children }) {
  return (
    <>
      <SidebarComponent />
      <div className="p-8 sm:ml-64">
        <HeaderComponent />
        {children}
      </div>
    </>
  );
}
