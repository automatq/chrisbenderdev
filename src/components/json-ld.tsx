import { serializeJsonLd } from "@/lib/structured-data";

/** Renders a schema.org graph as a `<script type="application/ld+json">` tag. */
export default function JsonLd({ graph }: { graph: unknown }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}
