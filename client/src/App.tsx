import { Routes, Route } from "react-router-dom";

// layout
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/Sessions/ProtectedRoutes";

// session pages
import LogIn from "./components/Sessions/LogIn";
import EditUser from "./components/Sessions/EditUser";
import PersistLogin from "./components/Sessions/PersistLogin";

// crud pages

// error pages
import Maintenance from "./components/ErrorPages/Maintenance";
import NotFound from "./components/ErrorPages/NotFound";
import SignUp from "./components/Sessions/SignUp";
// import Contacts from "./components/Contacts";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/cadastrar" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/session" element={<EditUser />} />

            {/* <Route path="/contatos" element={<Contacts />} /> */}

            <Route path="/documentos" element={<Maintenance />} />

            {/* Page not found */}
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
