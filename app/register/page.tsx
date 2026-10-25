import { redirect } from "next/navigation";

export const metadata = {
  title: "Register | Bihar Fashion League",
  description: "Register to participate in Bihar Fashion League events.",
};

export default function RegisterPage() {
  redirect("/register/model");
}
