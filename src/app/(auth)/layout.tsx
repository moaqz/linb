import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid h-screen w-full place-content-center">
      {children}
    </main>
  );
}

export default AuthLayout;
