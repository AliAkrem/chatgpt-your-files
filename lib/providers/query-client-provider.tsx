"use client";

import { QueryClient, QueryClientProvider as QAprovider  } from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";

export default function QueryClientProvider({ children }: PropsWithChildren<{}>) {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QAprovider client={queryClient}>{children}</QAprovider>
  );
}
