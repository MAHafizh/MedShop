"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useGetUser from "@/hooks/getUser";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, loading } = useGetUser();

  useEffect(() => {
    const protectRoute = async () => {
      if (!pathname.startsWith("/account")) {
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