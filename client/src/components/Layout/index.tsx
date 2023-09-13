import { Outlet } from "react-router-dom";
import Sidebar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import LoadMapsScript from "./LoadMapsScript";

const Layout = () => {
  return (
    <main className={import.meta.env.PROD ? "" : "debug-screens"}>
      <Sidebar />
      <div className="flex flex-col gap-4 min-h-[100svh] px-4 pt-[4.7rem]">
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>

      <ScrollTop />
      <LoadMapsScript />
    </main>
  );
};
export default Layout;
