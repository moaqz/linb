import Header from "@/components/header";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto px-4">{children}</main>
    </>
  );
}

export default ProtectedLayout;
