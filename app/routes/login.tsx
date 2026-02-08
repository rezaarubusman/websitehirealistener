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

/* ================= SCHEMA ================= */
const formSchema = z.object({
  email: z.email("Email salah."),
  password: z.string().min(5, "Password minimal 5 karakter."),
});

export const clientLoader = () => {
  const user = useAuth.getState().user;
  if (user) return redirect("/");
};

/* ================= PAGE ================= */
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur">
        {/* ================= HEADER ================= */}
        <CardHeader className="space-y-2 text-center">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight text-amber-600"
          >
            Hirealistener
          </Link>

          <CardTitle className="text-2xl font-bold text-gray-800">
            Selamat datang kembali
          </CardTitle>

          <CardDescription className="text-gray-500">
            Masuk untuk melanjutkan ke akun Anda
          </CardDescription>
        </CardHeader>

        {/* ================= CONTENT ================= */}
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="you@email.com"
                    className="h-11 focus-visible:ring-amber-500"
                  />
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
                  <FieldLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    className="h-11 focus-visible:ring-amber-500"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-11 w-full rounded-xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition"
            >
              {form.formState.isSubmitting ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>

        {/* ================= FOOTER ================= */}
        <CardFooter className="flex justify-center text-sm text-gray-600">
          Belum punya akun?
          <Link
            to="/register"
            className="ml-1 font-medium text-amber-600 hover:underline"
          >
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
