import { Header } from "@/features/ui";
import Footer from "@/features/ui/footer";
import { Toaster } from "react-hot-toast";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-between max-w-screen-lg mx-auto px-4">
      <Header />
      <main className="mt-12 flex-1">{children}</main>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default ProtectedLayout;
