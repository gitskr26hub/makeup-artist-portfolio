import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { Loader } from "@/components/sections/Loader";
import { getAdminFromCookies } from "@/lib/auth";
import { getSiteData, SiteData } from "@/lib/content";
import { getContentRepo } from "@/repositories/admin.repository";
import { redirect } from "next/navigation";





export default async function AdminDashBoard() {

    const isAdmin = await getAdminFromCookies();

    if (!isAdmin) redirect("/admin/login");

    // const isAdmin = await getAdminFromCookies();
    // console.log({ isAdmin })
    // if (!isAdmin) redirect("/admin")

    // const data = getSiteData();
    const data = await getContentRepo() as SiteData;;
     console.log("AdminDashBoard==>",{data})   

    if (!data) {return <Loader />}

    return <AdminDashboardClient initialData={data} />
}