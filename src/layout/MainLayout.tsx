
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      {/* <Navbar text="data">


        <h2>hello from main layout</h2>
        <h2>hello from main layout</h2>
        <h2>hello from main layout</h2>
      </Navbar> */}

      <Outlet />
    </div>
  );
}
