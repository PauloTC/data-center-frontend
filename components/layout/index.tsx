import SidebarComponent from "@/components/sidebar";
import HeaderComponent from "@/components/header";

export default function LayoutComponent({ children }: any) {
  return (
    <>
      <SidebarComponent />
      <div className="p-8 sm:ml-64 relative">
        <HeaderComponent />
        {children}
      </div>
    </>
  );
}
