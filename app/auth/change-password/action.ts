"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function ChangePassword(prevState: any, formData: FormData) {
  const currentPassword = formData.get("currentPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();

  if (!currentPassword || !newPassword) {
    return {
      error: "Current password and new password are required",
    };
  }

  if (newPassword.length < 6) {
    return {
      error: "New password must be at least 6 characters",
    };
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "User not authenticated",
    };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  if (signInError) {
    return {
      error: "Current password is incorrect",
    };
  }

  const { error } = await supabase.auth.updateUser({

    password: newPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: "Password changed successfully",
  };
}
