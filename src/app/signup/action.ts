"use server";

import { createClient } from "@/utils/supabase/server";
import { signupFormSchema } from "@/lib/schemas/signup-form-schema";

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient();
  const rawFormData = Object.fromEntries(formData);
  const validation = signupFormSchema.safeParse(rawFormData);

  if (validation.success) {
    const { error } = await supabase.auth.signUp({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (error) {
      return { success: false, authError: error.message, validationErrors: [] };
    } else {
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
