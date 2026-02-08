import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
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

/* ================= SCHEMA ================= */
const formSchema = z.object({
  name: z.string().min(3, "Nama harus minimal 3 karakter."),
  email: z.string().email("Email salah."),
  password: z.string().min(5, "Password harus terdiri dari 5 karakter."),
});

/* ================= PAGE ================= */
export default function Register() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await axiosInstance.post("/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert("Register berhasil, silakan login");
      navigate("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Register gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 px-4">
      <Card className="w-full max-w-md rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur">
        {/* ================= HEADER ================= */}
        <CardHeader className="space-y-2 text-center">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight text-amber-600"
          >
            Hirealistener
          </Link>

          <CardTitle className="text-2xl font-bold text-gray-800">
            Buat akun baru
          </CardTitle>

          <CardDescription className="text-gray-500">
            Daftar untuk mulai menjaga kesehatan mental Anda
          </CardDescription>
        </CardHeader>

        {/* ================= CONTENT ================= */}
        <CardContent>
          <form
            id="form-register"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-gray-700">
                    Nama
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Nama lengkap"
                    className="h-11 focus-visible:ring-amber-500"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
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
                    placeholder="you@example.com"
                    className="h-11 focus-visible:ring-amber-500"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
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
              {form.formState.isSubmitting ? "Loading..." : "Register"}
            </Button>
          </form>
        </CardContent>

        {/* ================= FOOTER ================= */}
        <CardFooter className="flex justify-center text-sm text-gray-600">
          Sudah punya akun?
          <Link
            to="/login"
            className="ml-1 font-medium text-amber-600 hover:underline"
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
