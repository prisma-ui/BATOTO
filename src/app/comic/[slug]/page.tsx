import { getComicDetail } from "@/lib/api";
import { redirect } from "next/navigation";

interface OldParams {
  params: Promise<{ slug: string }>;
}

export default async function OldComicDetailRedirect({ params }: OldParams) {
  const { slug } = await params;
  
  // Fetch comic with default category lookup
  const comic = await getComicDetail("manga", slug);
  if (comic) {
    redirect(`/${comic.type || "manga"}/${slug}`);
  }
  
  // Fallback redirect if not found
  redirect("/browse");
}
