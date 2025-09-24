"use client";
import React from "react";
import { useSession, signOut } from "@/lib/auth/auth-client";
import Link from "next/link";

const Home = () => {
  const { data, isPending } = useSession();
  const user = data?.user as
    | { name?: string; email?: string; image?: string; credits?: number }
    | undefined;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
      </div>

      <div className="px-6 text-center">
        <h1 className="font-serif text-6xl font-semibold tracking-tight md:text-7xl">
          codebased
        </h1>
        {!user ? (
          <>
            <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
              Build, iterate, and ship faster with a clean Next.js + Prisma
              setup.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isPending ? "Loading..." : "Sign in"}
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Create account
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-6 mx-auto max-w-md rounded-2xl border border-border bg-background/70 p-6 text-left shadow-sm backdrop-blur">
            <div className="flex items-center gap-4">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt="avatar"
                  className="h-12 w-12 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-lg font-medium">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">
                  Signed in as
                </p>
                <p className="truncate text-lg font-medium">
                  {user.name || user.email}
                </p>
                {typeof user.credits === "number" && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Credits: {user.credits}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => void signOut()}
                className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Sign out
              </button>
              <Link
                href="/dashboard/chat"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
