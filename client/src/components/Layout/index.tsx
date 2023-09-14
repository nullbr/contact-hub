import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import LoadMapsScript from "./LoadMapsScript";

const Layout = () => {
  return (
    <main className={import.meta.env.PROD ? "" : "debug-screens"}>
      <Navbar />
      <div className="flex flex-col min-h-[100svh] px-4 pt-[4.7rem]">
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
