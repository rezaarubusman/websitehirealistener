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

const formSchema = z.object({
  name: z.string().min(3, "Nama harus minimal 3 karakter."),
  email: z.string().email("Email salah."),
  password: z.string().min(5, "Password harus terdiri dari 5 karakter."),
});

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
      // ✅ BACKENDLESS REGISTER
      await axiosInstance.post("/users/register", {
        name: data.name,     // custom field (harus ada di Users table)
        email: data.email,   // WAJIB
        password: data.password, // WAJIB
      });

      alert("Register berhasil, silakan login");
      navigate("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Register gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="text-2xl font-bold mb-2">
            Hirealistener
          </Link>
          <CardTitle className="text-xl">Buat akun baru</CardTitle>
          <CardDescription>
            Masukkan data anda untuk dapat menggunakan layanan
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="form-register"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} placeholder="Your name" />
                  {fieldState.invalid && (
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
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="you@example.com" />
                  {fieldState.invalid && (
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
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}