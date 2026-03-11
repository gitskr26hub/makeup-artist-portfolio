import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { getAdminFromCookies } from "@/lib/auth";
import { getSiteData } from "@/lib/content";
import { getContentRepo } from "@/repositories/admin.repository";
import { redirect } from "next/navigation";



export default async function AdminDashBoard() {


    const isAdmin = await getAdminFromCookies();
    console.log({ isAdmin })
    // if (!isAdmin) redirect("/admin")

    // const data = getSiteData();
    const data = await getContentRepo();

    return <AdminDashboardClient initialData={data} />
}