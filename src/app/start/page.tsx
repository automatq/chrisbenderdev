import type { Metadata } from "next";

import InquiryForm from "@/components/inquiry/inquiry-form";
import { DATA } from "@/data/resume";
import { alternates } from "@/lib/seo";

const description = `Tell ${DATA.name} about the website, application or software you need built. A few short questions, and you'll hear back by email.`;

export const metadata: Metadata = {
  title: "Start a project",
  description,
  alternates: alternates("/start"),
  openGraph: {
    title: `Start a project | ${DATA.name}`,
    description,
    url: `${DATA.url}/start`,
  },
};

export default function StartPage() {
  return (
    <main>
      <InquiryForm contactEmail={DATA.contact.email} />
    </main>
  );
}
