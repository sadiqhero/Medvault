import { NextRequest, NextResponse } from "next/server";
import { searchPatients } from "@/lib/data";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") ?? "";
  const results = searchPatients(query);
  return NextResponse.json(results);
}
