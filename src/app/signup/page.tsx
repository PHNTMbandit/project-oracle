import { BentoBox } from "@/components/bento-box";
import { SignupForm } from "@/components/forms/signup-form";
import { Logo } from "@/components/logo";
import Color from "color";

export default function SignupPage() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-6 h-full">
      <BentoBox
        backgroundColour={Color("#ffecb4")}
        className="space-y-2 h-full">
        <h1>Welcome to Project Oracle</h1>
        <p>Where you&apos;ll live in a world of pure imagination</p>
        <SignupForm />
      </BentoBox>
      <BentoBox className="hidden md:block" />
    </div>
  );
}
