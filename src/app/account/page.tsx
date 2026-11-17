import type { Metadata } from "next";
import { AccountView } from "@/views/AccountView";

export const metadata: Metadata = { title: "บัญชีและการซิงก์" };

export default function AccountPage() {
  return <AccountView />;
}
