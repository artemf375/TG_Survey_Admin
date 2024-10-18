import Image from "next/image";
import Footer from "@/components/reusable/main/footer";
import vercel from "@/public/assets/icons/vercel.svg";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1
          className="text-2xl sm:text-3xl text-center sm:text-left font-bold"
        >TG Survey Bot</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Log in to admin platform to manage your surveys</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src={vercel}
              alt="Log In Button"
              width={20}
              height={20}
            />
            Log In
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
