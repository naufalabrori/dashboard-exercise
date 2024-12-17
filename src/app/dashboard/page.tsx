"use client"
import useAuthStore from "@/hooks/useAuthStore";

export default function Dashboard() {
  const { user } = useAuthStore();

  return <div>Welcome {user?.fullname}</div>;
}
