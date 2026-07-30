"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const ADMIN_USERNAME = "admin";
const AUTH_KEY = "adminAuth";
const PASSWORD_KEY = "adminPassword";

function getStoredPassword(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(PASSWORD_KEY) || "admin";
  }
  return "admin";
}

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("admin");

  useEffect(() => {
    setCurrentPassword(getStoredPassword());
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem(AUTH_KEY);
      const token = localStorage.getItem("adminToken");

      if (token === "valid" || auth === "true") {
        setIsAuthenticated(true);
      } else if (!pathname.startsWith("/admin/giris")) {
        router.push("/admin/giris");
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname, router]);

  const login = (username: string, password: string): boolean => {
    const storedPassword = getStoredPassword();
    if (username === ADMIN_USERNAME && password === storedPassword) {
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
    document.cookie = "adminAuth=; path=/; max-age=0";
    setIsAuthenticated(false);
    router.push("/admin/giris");
    toast.success("Çıkış yapıldı");
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}