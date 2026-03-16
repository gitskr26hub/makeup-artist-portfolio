import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

import { validateImageFiles } from "@/utils/validateImageFiles";

import { getContentRepo, updateContentRepo } from "@/repositories/admin.repository";
import { getAdminFromCookies } from "@/lib/auth";


export async function POST(req: Request) {
  try {

    const isAdmin = await getAdminFromCookies();
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }







    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    const collectionName = formData.get("collectionName") as string;
    const ImgArrName = formData.get("ImgArrName") as string;

    console.log({ collectionName, ImgArrName });


    if (!collectionName || !ImgArrName) {
      throw new Error(`collectionName or ImgArrName missing!!`)
    }



    validateImageFiles(files);

    const uploadedImages = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "upload",
            resource_type: "image",
            transformation: [
              { quality: "auto", fetch_format: "auto" }
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(buffer);
      });

      if (!result?.secure_url || !result?.public_id) {
        throw new Error("Cloudinary upload failed");
      }

      if (collectionName == "portfolio") {
        uploadedImages.push(
          {
            "category": "Bridal",
            "title": "Timeless Elegance",
            image: {
              url: result.secure_url,
              publicId: result.public_id,
            }
          }
        );
      }
      else {
        uploadedImages.push(
          {
            // title: file.name.replace(/\.[^/.]+$/, ""),
            url: result.secure_url,
            publicId: result.public_id,
            // width: result.width,
            // height: result.height,
            // createdAt: new Date().toISOString(),
          }
        );
      }
    }


    const data = await getContentRepo();


    if (!data) {
      throw new Error("Website data not found!");
    }

    const existingImages = data[collectionName][ImgArrName] || [];

    const updatedContent = {
      ...data,
      [collectionName]: {
        ...data[collectionName],
        [ImgArrName]: [...existingImages, ...uploadedImages],
      },
    };

    console.log(JSON.stringify(updatedContent))
    await updateContentRepo(updatedContent);


    return NextResponse.json(
      {
        success: true,
        count: uploadedImages.length,
        images: uploadedImages,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Image Upload API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}