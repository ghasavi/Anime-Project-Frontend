import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
