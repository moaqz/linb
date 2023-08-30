import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen w-full grid place-content-center">
      {children}
    </main>
  );
}

export default AuthLayout;
