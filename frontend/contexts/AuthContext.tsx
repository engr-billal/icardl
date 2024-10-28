import React, { createContext, useState, useEffect } from "react";
import server from "@/misc/axios";
import { RegistrationDetails, User } from "@/misc/interfaces";
import Logo from "@/components/Logo";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { routes } from "@/misc/routes";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (credentials: RegistrationDetails) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (data: object) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("🚀 ~ user:", user);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await server.get("/users/login");
        if (res.status === 200 && res.data) {
          setUser(res.data);
        }
      } catch (err) {
        setUser(null);
        console.log("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const updateUser = (data: object) => {
    setUser({ ...user, ...(data as User) });
  };

  const register = async (credentials: RegistrationDetails) => {
    setLoading(true);
    try {
      const res = await server.post("/users/register", credentials);
      if (res.status === 201) {
        setLoading(false);
        toast({
          title: "Registration Successfull",
          description:
            "Please check your email and confirm your email using confirmation link.",
          status: "success",
          position: "top",
          isClosable: true,
          duration: 5000,
        });
        return router.push(routes.login.path);
      }
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError)
        toast({
          title: err.response?.data.message,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 1000,
        });
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await server.post("/users/login", credentials);
      if (res.status === 200) {
        setUser(res.data);
        setLoading(false);
        toast({
          title: "Login Successful",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (err) {
      if (err instanceof AxiosError)
        toast({
          title: err.response?.data.message || err.response?.data.error,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 1000,
        });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await server.get("/users/logout");
      if (res.status === 200) {
        setUser(null);
        router.push(routes.login.path);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        loading,
        register,
        login,
        logout,
      }}
    >
      {loading ? (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="pulse-animation">
            <Logo />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return React.useContext(AuthContext);
};

export default AuthContext;
