"use server";
import { createClient } from "@/lib/supabase/server";

export async function SignUp(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      error: "Invalid email or password",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: "Check your email to confirm your account",
  };
}
