import NavBar from "@/components/NavBar";
import React from "react";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-white">
      <div className="relative flex flex-col min-h-screen w-full max-w-[400px] mx-auto bg-[#fafafa] p-5 rounded-md pb-[60px]">
        {children}
        <NavBar />
      </div>
    </main>
  );
}

export default UserLayout;
