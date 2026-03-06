import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { getSiteData } from "@/lib/content";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboard() {
  const isAdmin = await getAdminFromCookies();
  if (!isAdmin) redirect("/admin");

  const data = getSiteData();

  return <AdminDashboardClient initialData={data} />;
}
