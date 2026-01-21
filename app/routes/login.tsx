import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { axiosInstance } from "~/lib/axios";
import { useAuth } from "~/components/stores/useAuth";

const formSchema = z.object({
  email: z.email("Email salah."),
  password: z.string().min(5, "Password minimal 5 karakter."),
});

export const clientLoader = () => {
  const user = useAuth.getState().user;
  if (user) return redirect("/");
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/users/login", {
        login: data.email, 
        password: data.password,
      });

      login(response.data);
      navigate("/");
    } catch (error: any) {
      alert(error?.response?.data?.message ?? "Login gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="text-2xl font-bold mb-2">
            Hirealistener
          </Link>
          <CardTitle>Selamat datang!</CardTitle>
          <CardDescription>Masukkan data kredensial anda</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="form-login"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="you@email.com" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="password" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          Anda belum punya akun?{" "}
          <Link to="/register" className="text-primary ml-1">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}