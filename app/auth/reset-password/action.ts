"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function ResetPassword(prevState: any, formData: FormData) {
  const password = formData.get("password")?.toString();

  if (!password) {
    return {
      error: "Invalid password",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/auth/sign-in");
}
