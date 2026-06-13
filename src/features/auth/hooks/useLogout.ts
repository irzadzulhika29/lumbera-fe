"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/src/features/auth/api/authApi";
import { isApiError } from "@/src/shared/api";

import { getAuthSession } from "../utils/authSessionStorage";
import { clearAuthClientState } from "../utils/clearAuthClientState";

export function useLogout() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    const authSession = getAuthSession();

    setError("");
    setIsSubmitting(true);

    try {
      if (authSession?.refreshToken) {
        await logout({
          refreshToken: authSession.refreshToken,
        });
      }
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat keluar dari akun",
      );
    } finally {
      clearAuthClientState();
      setIsSubmitting(false);

      startTransition(() => {
        router.push("/role-select");
      });
    }
  };

  return {
    error,
    isSubmitting,
    handleLogout,
  };
}
