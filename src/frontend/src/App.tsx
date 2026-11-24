import { Toaster } from "@/components/ui/sonner";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors closeButton />
    </ThemeProvider>
  );
}
