import { ThemeToggle } from "@/components/theme-toggle";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="p-12 h-full">{children}</section>;
}
