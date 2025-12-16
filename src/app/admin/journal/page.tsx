import { redirect } from "next/navigation";

export default function AdminJournalPage() {
  redirect("/admin/journal/new");
  return null;
}
