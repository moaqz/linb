import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto px-4">{children}</main>
      <Toaster position="bottom-center" />
    </>
  );
}

export default ProtectedLayout;
