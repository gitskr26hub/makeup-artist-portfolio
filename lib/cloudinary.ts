import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process?.env?.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
  api_secret: process?.env?.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export async function uploadImage(
  file: string,
  folder: string = "glamour-studio"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(
  url: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  if (!url.includes("cloudinary.com")) return url;
  const { width = 800, height, quality = "auto" } = options;
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;
  const transforms = [`w_${width}`, `q_${quality}`, "f_auto"];
  if (height) transforms.push(`h_${height}`, "c_fill");
  return `${parts[0]}/upload/${transforms.join(",")}/${parts[1]}`;
}
