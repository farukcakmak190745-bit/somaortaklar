"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const AUTH_KEY = "adminAuth";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem(AUTH_KEY);
      const token = localStorage.getItem("adminToken");

      if (token === "valid" || auth === "true") {
        setIsAuthenticated(true);
      } else if (!pathname.startsWith("/admin/login")) {
        router.push("/admin/login");
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., from other tabs)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname, router]);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem("adminToken", "valid");
      setIsAuthenticated(true);
      toast.success("Giriş başarılı!");
      return true;
    }
    toast.error("Hatalı kullanıcı adı veya şifre");
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/admin/login");
    toast.success("Çıkış yapıldı");
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}