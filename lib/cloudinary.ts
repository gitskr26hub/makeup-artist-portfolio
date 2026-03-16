import { v2 as cloudinary } from "cloudinary";

/**
 * Validate environment variables
 */
const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (
  !NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  !CLOUDINARY_API_KEY ||
  !CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary environment variables");
}

/**
 * Cloudinary configuration
 */
cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Upload Image
 */
export async function uploadImage(
  file: string,
  folder: string = "uploads"
): Promise<{ url: string; publicId: string }> {
  try {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    const result = await cloudinary.uploader.upload(file, {
      folder,
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    if (!result?.secure_url || !result?.public_id) {
      throw new Error("Invalid response from Cloudinary");
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);

    throw new Error(
      error?.message || "Failed to upload image to Cloudinary"
    );
  }
}

/**
 * Delete Image
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    if (!publicId) {
      throw new Error("publicId is required to delete image");
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Cloudinary deletion failed");
    }

    return true;
  } catch (error: any) {
    console.error("Cloudinary Delete Error:", error);

    throw new Error(
      error?.message || "Failed to delete image from Cloudinary"
    );
  }
}

/**
 * Generate Optimized Image URL
 */
export function getOptimizedUrl(
  url: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  try {
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL provided");
    }

    if (!url.includes("cloudinary.com")) {
      return url;
    }

    const { width = 800, height, quality = "auto" } = options;

    const parts = url.split("/upload/");
    if (parts.length !== 2) return url;

    const transforms = [`w_${width}`, `q_${quality}`, "f_auto"];

    if (height) {
      transforms.push(`h_${height}`, "c_fill");
    }

    return `${parts[0]}/upload/${transforms.join(",")}/${parts[1]}`;
  } catch (error) {
    console.error("Cloudinary URL Optimization Error:", error);

    return url; // fallback
  }
}


export function getPublicIdFromCloudinaryUrl(url: string): string | null {
  try {
    if (!url || typeof url !== "string") return null;

    const decodedUrl = decodeURIComponent(url);

    // find upload segment
    const uploadIndex = decodedUrl.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    let path = decodedUrl.substring(uploadIndex + 8); // after /upload/

    // remove query params
    path = path.split("?")[0];

    const segments = path.split("/");

    // remove version if exists (v123456)
    if (/^v\d+$/.test(segments[0])) {
      segments.shift();
    }

    const publicIdWithExt = segments.join("/");

    // remove extension
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

    return publicId || null;
  } catch (error) {
    console.error("Invalid Cloudinary URL:", url);
    return null;
  }
}
