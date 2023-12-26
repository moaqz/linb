import { Header } from "@/features/ui";
import Footer from "@/features/ui/footer";
import { Toaster } from "react-hot-toast";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col justify-between px-4">
      <Header />
      <main className="mt-12 flex-1">{children}</main>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default ProtectedLayout;
