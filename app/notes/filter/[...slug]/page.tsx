/*queryclient & hydration*/
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

/*client component*/
import NotesClient from "./Notes.client";

/*fetch function*/
import { fetchNotes } from "@/lib/api";

import { tagType } from "@/lib/api";

type NotesProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Notes({ params }: NotesProps) {
  const firstTag = (await params).slug[0];
  const tag = firstTag !== "all" && (firstTag as tagType);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: tag ? () => fetchNotes({ tag }) : () => fetchNotes({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag ? tag : undefined} />
    </HydrationBoundary>
  );
}