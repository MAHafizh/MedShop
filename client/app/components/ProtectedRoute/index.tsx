"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useGetUser from "@/hooks/getUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, loading } = useGetUser();

  useEffect(() => {
    if (loading) return;

    if (error || !user) {
      router.push("/login");
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      router.push("/account");
      return;
    }
  }, [loading, error, user, router, requiredRole]);

  return <>{children}</>;
};
export default ProtectedRoute;