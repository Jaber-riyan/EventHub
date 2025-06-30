import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface UserPayload {
  name: string;
  email: string;
  password: string;
  _id: string;
  lastLoginTime: string;
  createdAt: string;
  updateAt: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: UserPayload) => Promise<void>;
  // register: (
  //   name: string,
  //   email: string,
  //   password: string,
  //   photoURL: string,
  //   user: object
  // ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (user: UserPayload) => {
    // Simulate API call
    const mockUser = {
      id: user?._id,
      name: user?.name,
      email: user.email,
      photoURL: user?.photoURL,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    photoURL: string,
    user?: { _id: string }
  ) => {
    // Simulate API call
    const mockUser = {
      id: user?._id || "2",
      name,
      email,
      photoURL: photoURL || "/placeholder.svg?height=40&width=40",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
