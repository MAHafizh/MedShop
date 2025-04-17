"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import useGetUser from "@/hooks/getUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, loading } = useGetUser();

  useEffect(() => {
    const protectRoute = async () => {
      if (!pathname.startsWith("/account/admin")) {
        return;
      }
      if (loading) return;
      if (error || !user) {
        router.push("/login");
        return;
      }
      if(user.role !== "admin") {
        router.push("/account");
        return;
      }
    };
    protectRoute();
  }, [loading, error, user, pathname, router]);

  return <>{children}</>;
};
export default ProtectedRoute;
