import { NextResponse } from "next/server";

import { deleteImage, getPublicIdFromCloudinaryUrl } from "@/lib/cloudinary";
import { getContentRepo, updateContentRepo } from "@/repositories/admin.repository";
import { getAdminFromCookies } from "@/lib/auth";

export async function POST(req: Request) {

    try {
        const isAdmin = await getAdminFromCookies();
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { imgItem, collectionName, ImgArrName, } = await req.json();


        if (!imgItem) throw new Error(`imgItem is not valid!`);
        if (!collectionName) throw new Error(`Url is not valid!`);
        if (!ImgArrName) throw new Error(`Url is not valid!`);

        console.log({ imgItem });

        let publicId = imgItem.publicId || getPublicIdFromCloudinaryUrl(imgItem?.url);
        console.log({ publicId, });

        if (!publicId) {
            return NextResponse.json(
                { error: "Missing publicId" },
                { status: 400 }
            );
        }

        const result = await deleteImage(publicId);

        const data = await getContentRepo();


        if (!data) {
            throw new Error("Website data not found!");
        }

        let updatedData = {}

        if (collectionName === "portfolio") {
            updatedData = {
                ...data,
                [collectionName]: {
                    ...(data?.[collectionName] ?? {}),
                    [ImgArrName]: (data?.[collectionName]?.[ImgArrName] ?? []).filter(
                        (item: any) => item?.image?.url && item?.image?.publicId !== publicId
                    ),
                },
            };
        }
        else {
            updatedData = {
                ...data,
                [collectionName]: {
                    ...(data?.[collectionName] ?? {}),
                    [ImgArrName]: (data?.[collectionName]?.[ImgArrName] ?? []).filter(
                        (item: any) => item?.url && item?.publicId !== publicId
                    ),
                },
            };
        }

        // console.log({collectionName, },updatedData[collectionName],)

        await updateContentRepo(updatedData);


        return NextResponse.json({
            success: true,
            result,
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Delete failed" },
            { status: 500 }
        );

    }

}