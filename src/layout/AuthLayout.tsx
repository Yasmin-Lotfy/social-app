
import AuthIntro from "../components/AuthIntro.tsx/AuthIntro";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-sec">

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-5">
            <section className="order-2 lg:order-0">
              <AuthIntro/>
            </section>
            <section className="">
              <Outlet/>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
