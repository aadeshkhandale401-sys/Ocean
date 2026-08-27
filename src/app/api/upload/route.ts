// ============================================
// Next.js API Route: /api/upload
// Handles file uploads to Cloudinary securely
// ============================================

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      return NextResponse.json(
        { error: "Cloudinary Cloud Name is not configured." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const isVideo = file.type.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", base64Data);
    cloudinaryFormData.append("folder", "ocean_mgps");

    let uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    if (uploadPreset) {
      cloudinaryFormData.append("upload_preset", uploadPreset);
    } else if (apiKey && apiSecret) {
      const timestamp = Math.round(Date.now() / 1000).toString();
      cloudinaryFormData.append("timestamp", timestamp);
      cloudinaryFormData.append("api_key", apiKey);

      // Sign the request using SHA-1
      const crypto = await import("crypto");
      const stringToSign = `folder=ocean_mgps&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");
      cloudinaryFormData.append("signature", signature);
    } else {
      return NextResponse.json(
        {
          error:
            "Cloudinary credentials missing. Provide NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET or CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Cloudinary upload failed:", result);
      return NextResponse.json(
        { error: result.error?.message || "Cloudinary upload failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      duration: result.duration,
      width: result.width,
      height: result.height,
    });
  } catch (error: any) {
    console.error("Upload API route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during upload" },
      { status: 500 }
    );
  }
}
