import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { useFetch } from "../custom hooks/UseFetch"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"

// Type Definitions
type LoginFormData = {
  email: string;
  password: string;
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
});

export const AuthPage = () => {

  const navigate = useNavigate();

  // State Management
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Signup
  const { data, error, loading, fetchData } = useFetch<{ token?: string; message?: string }>();
  const login = useAuthStore((state) => state.login); // Get & update auth state

  // Reset form when switching between Login and Signup tabs
  useEffect(() => {
  reset({
    name: "",
    email: "",
    password: ""
  });
}, [isLogin]);


  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { name: "" })
    }
  });

  // Type Assertion for errors
  const signupErrors = errors as FieldErrors<SignupFormData>;

  // Handle form submission
  const onSubmit = async (formData: LoginFormData | SignupFormData) => {
    if (isLogin) {
      const response = await fetchData("/auth/login", "POST", formData);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        login(response.token, response.user); // Call Zustand action
        console.log(response?.user?.email);
        console.log(response?.user?.name);
        // Redirect to room page after successful login
        alert("Login Successful!");
        navigate("/room"); 
      }
      else {
        console.log("Login failed. Please check your credentials.", response.message);
      }
    } else {
      await fetchData("/auth/signup", "POST", formData);
    }
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="Login" onValueChange={(val) => setIsLogin(val === "Login")} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to log in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-1 mb-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="example@email.com" {...register("email")} />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1 mb-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register("password")} />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>}
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </CardContent>
            {error && <p className="text-red-500">{error}</p>}
            {data?.message && !isLogin && <p className="text-green-500">{data.message}</p>}
          </Card>
        </TabsContent>

        {/* SignUp Tab */}
        <TabsContent value="SignUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-1 mb-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Write your full name here" {...register("name")} />
                  {signupErrors.name && <p className="text-red-500">{signupErrors.name.message}</p>}

                </div>
                <div className="space-y-1 mb-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="example@email.com" {...register("email")} />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1 mb-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register("password")} />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>}
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </CardContent>
            {error && <p className="text-red-500">{error}</p>}
            {data?.message && !isLogin && <p className="text-green-500">{data.message}</p>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
