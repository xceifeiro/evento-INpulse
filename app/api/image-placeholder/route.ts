import { type NextRequest, NextResponse } from "next/server"
import { getPlaiceholder } from "plaiceholder"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url")

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    // Fetch the image
    const res = await fetch(url)

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    const buffer = await res.arrayBuffer()

    // Generate placeholder
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    // Return the base64 placeholder
    return NextResponse.json({ base64 })
  } catch (error) {
    console.error("Error generating placeholder:", error)
    return NextResponse.json({ error: "Failed to generate placeholder" }, { status: 500 })
  }
}
