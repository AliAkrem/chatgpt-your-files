"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function SignIn(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      error: "Invalid email or password",
    };
  }

  const supabase = await createClient();
  const { data: {
    user
  }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user,
    error,
  };


}
