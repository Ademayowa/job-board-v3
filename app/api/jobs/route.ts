import { NextRequest, NextResponse } from "next/server";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const API_URL = process.env.API_URL;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const sort = searchParams.get("sort") || "";

    let endpoint = `${API_URL}/jobs`;

    if (sort === "recent") {
      endpoint = `${API_URL}/jobs/recent`;
    } else if (sort === "highest-salary") {
      endpoint = `${API_URL}/jobs/highest-salary`;
    }

    if (query) {
      endpoint += `?query=${encodeURIComponent(query)}`;
    }

    const response = await fetch(endpoint, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in jobs API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
