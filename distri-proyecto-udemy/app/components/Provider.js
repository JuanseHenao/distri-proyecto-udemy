"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ session, children }) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
