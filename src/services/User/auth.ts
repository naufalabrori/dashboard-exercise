/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient";
import Cookies from "universal-cookie";
import useAuthStore from "@/hooks/useAuthStore";
import { AUTH_COOKIES_KEY } from "@/lib/utils";

const cookies = new Cookies();

export const login = async (
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = {
      user: {
        username,
        password,
      },
    };
    const response = await axiosClient.post("/User/login", user);

    if (response.status === 200) {
      const user = response.data.user;
      const token = response.data.user.token;

      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      cookies.set(AUTH_COOKIES_KEY, token, {
        sameSite: "none",
        secure: true,
        path: "/",
        expires: expires
      });

      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setToken(token);

      return { success: true, message: "Login berhasil" };
    }

    return { success: false, message: "Login failed, please try again" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.detail || "Terjadi kesalahan saat login",
    };
  }
};

export const logout = () => {
  cookies.remove(AUTH_COOKIES_KEY, { path: "/" });
  localStorage.clear();

  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setToken(null);
};
