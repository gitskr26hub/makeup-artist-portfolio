import { NextResponse } from "next/server";

import { deleteImage, getPublicIdFromCloudinaryUrl } from "@/lib/cloudinary";
import { getContentRepo, updateContentRepo } from "@/repositories/admin.repository";

export async function POST(req: Request) {

    try {

        const { imgItem, collectionName, ImgArrName, } = await req.json();


        if (!imgItem) throw new Error(`imgItem is not valid!`);
        if (!collectionName) throw new Error(`Url is not valid!`);
        if (!ImgArrName) throw new Error(`Url is not valid!`);

        let publicId;
        if (collectionName == "portfolio") {
            publicId = imgItem.publicId || getPublicIdFromCloudinaryUrl(imgItem.url);
        }
        else { publicId = imgItem.publicId || getPublicIdFromCloudinaryUrl(imgItem.url); }
        console.log({ publicId, })
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

        const updatedData = {
            ...data,
            [collectionName]: {
                ...(data?.[collectionName] ?? {}),
                [ImgArrName]: (data?.[collectionName]?.[ImgArrName] ?? []).filter(
                    (item: any) => item?.image.url && item?.image?.publicId !== publicId
                ),
            },
        };

        await updateContentRepo(updatedData);


        return NextResponse.json({
            success: true,
            result,
        });

    } catch (error) {

        return NextResponse.json(
            { error: "Delete failed" },
            { status: 500 }
        );

    }

}