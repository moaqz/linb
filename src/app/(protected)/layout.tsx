import { Header } from "@/features/ui";
import { Toaster } from "react-hot-toast";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4">
      <Header />
      <main className="max-w-screen-lg mx-auto mt-12">{children}</main>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default ProtectedLayout;
