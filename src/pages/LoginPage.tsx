import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLogin } from "@/service/auth/useAuth";




// Zod schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required").min(4, "Password must be at least 6 characters"),
});




type LoginFormValues = z.infer<typeof loginSchema>;




export default function LoginPage() {



  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);



  // Login mutation
  const { mutate: login, isPending: loginLoading } = useLogin();



  // React hook form
  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormValues>({

    resolver: zodResolver(loginSchema), defaultValues: { username: "", password: "" },

  });



  // On submit — build FormData and call login mutation
  const onSubmit = (values: LoginFormValues) => {

    const formData = new FormData();

    formData.append("username", values.username);

    formData.append("password", values.password);

    login(formData);


  };




  return (



    <div className="min-h-screen flex">


      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden gradient-primary items-center justify-center">


        <div className="absolute inset-0 opacity-10">


          {[...Array(6)].map((_, i) => (

            <div
              key={i}
              className="absolute rounded-full border border-primary-foreground/20"
              style={{
                width: `${200 + i * 120}px`,
                height: `${200 + i * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

          ))}

        </div>


        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-12"
        >

          <div className="h-28 w-72 mx-auto mb-8 rounded-3xl overflow-hidden bg-primary-foreground/20 backdrop-blur-md p-4 shadow-2xl shadow-primary/40 ring-4 ring-primary-foreground/30">
            <img src="/Nav-Icon.png" alt="Logo" className="h-full w-full object-contain drop-shadow-xl scale-110" />
          </div>

          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">Admin Portal</h1>

          <p className="text-primary-foreground/80 text-lg max-w-md">
            Manage your entire job portal ecosystem from one powerful dashboard.
          </p>

        </motion.div>


      </div>




      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">


        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >

          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">

            <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg shadow-primary/20 p-1">
              <img src="/Nav-Icon.png" alt="Logo" className="h-full w-full object-contain scale-110 drop-shadow-sm" />
            </div>

            <span className="font-display font-bold text-3xl text-foreground">JobPortal</span>

          </div>


          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your admin dashboard</p>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>


            {/* Username Field */}
            <div className="space-y-1.5">

              <label className="text-sm font-medium text-foreground">Username</label>

              <div className="relative">

                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  {...register("username")}
                  className={`pl-10 h-12 bg-muted/50 border-transparent focus:border-primary/40 focus:bg-card transition-all ${errors.username ? "border-destructive/60 focus:border-destructive/60" : ""}`}
                />

              </div>

              {errors.username && (
                <p className="text-xs text-destructive mt-1">{errors.username.message}</p>
              )}

            </div>



            {/* Password Field */}
            <div className="space-y-1.5">

              <label className="text-sm font-medium text-foreground">Password</label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                  className={`pl-10 pr-10 h-12 bg-muted/50 border-transparent focus:border-primary/40 focus:bg-card transition-all ${errors.password ? "border-destructive/60 focus:border-destructive/60" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >

                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}

                </button>

              </div>

              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}

            </div>


            {/* Remember me */}
            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-border accent-primary" />
                Remember me
              </label>

              <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                Forgot password?
              </a>

            </div>


            {/* Submit */}
            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity border-0"
            >

              {loginLoading ? (

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </div>

              ) : (

                "Sign In"

              )}

            </Button>


          </form>


          <p className="text-center text-sm text-muted-foreground mt-8">
            © {new Date().getFullYear()} Students Gigs. All rights reserved.
          </p>

        </motion.div>

      </div>


    </div>

  );


}
