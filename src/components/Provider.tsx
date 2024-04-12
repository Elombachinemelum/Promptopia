"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// this will wrap all components hence we go to the root layout
const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
