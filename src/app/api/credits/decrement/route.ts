import { NextResponse } from "next/server";
import { decrementCreditsByOne } from "@/lib/db/update-credits";

export async function POST() {
  const result = await decrementCreditsByOne();

  if (!result.ok) {
    const status = result.error === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
