import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to sign in - users must authenticate first
  redirect("/sign-in");
}
