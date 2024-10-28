import React from "react";
import AdminNavBar from "./AdminNavBar";
import CheckAdmin from "./CheckAdmin";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex justify-center m-auto">
      <CheckAdmin />
      <div className="flex h-screen w-screen bg-zinc-50 max-w-[1440px] border border-zinc-200">
        <AdminNavBar />
        <div className="flex-1 w-full h-full overflow-hidden p-5">
          <div className="w-full h-full overflow-y-scroll scrollbar-hidden p-5">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
