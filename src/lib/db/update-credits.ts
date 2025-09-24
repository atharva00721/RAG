"use server";

import { prisma } from "./prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function decrementCreditsByOne() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: new Headers(hdrs) });

  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" as const };
  }

  const result = await prisma.$transaction(async (tx) => {
    const update = await tx.user.updateMany({
      where: { id: userId, credits: { gt: 0 } },
      data: { credits: { decrement: 1 } },
    });

    if (update.count === 0) {
      return null;
    }

    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    return user;
  });

  if (!result) {
    return { ok: false, error: "INSUFFICIENT_CREDITS" as const };
  }

  return { ok: true as const, credits: result.credits };
}
