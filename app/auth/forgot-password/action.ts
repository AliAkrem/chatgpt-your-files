"use server";

import { createClient } from "@/lib/supabase/server";

export async function ForgotPassword(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();

  if (!email) {
    return {
      error: "Invalid email address",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password`,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: "Password reset email sent. Please check your inbox.",
  };
}
