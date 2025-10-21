"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function SignOutpage() {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.signOut();

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }, []);

  return <div>redirecting...</div>;
}
