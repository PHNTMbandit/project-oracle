"use server";

import { createClient } from "@/utils/supabase/server";
import { loginFormSchema } from "@/lib/schemas/login-form-schema";
import { revalidatePath } from "next/cache";

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient();
  const rawFormData = Object.fromEntries(formData);
  const validation = loginFormSchema.safeParse(rawFormData);

  if (validation.success) {
    const { error } = await supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (error) {
      return { success: false, authError: error.message, validationErrors: [] };
    } else {
      revalidatePath("/", "layout");
      return { success: true, authError: "", validationErrors: [] };
    }
  } else {
    return {
      success: false,
      authError: "",
      validationErrors: validation.error.issues,
    };
  }
}
