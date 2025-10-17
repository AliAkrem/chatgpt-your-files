import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function SignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${error.message}`);
  }

  redirect("/");
}
