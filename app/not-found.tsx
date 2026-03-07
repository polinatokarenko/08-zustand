/*css*/
import css from "@/app/Home.module.css";

/*metadata*/
import { Metadata } from "next";

export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>);
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 - Page Not Found",
    description: "Mistake 404 has happend",
    openGraph: {
      title: "404 - Page Not Found",
      description: "Mistake 404 has happend",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "An icon of a note with a completed task, with the application name Notehub displayed next to it.",
        },
      ],
    },
  }
}