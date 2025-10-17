import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { auth } from "@/lib/auth";
import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/sign-out";

export async function PublicHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <Link href="/home" className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-8 w-8 text-primary"
          fill="currentColor"
        >
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v10h2V7H7zm4 0v10h2V7h-2zm4 0v10h2V7h-2z" />
        </svg>
        <span className="font-bold text-xl text-foreground">
          Narrato
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/about" passHref><span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</span></Link>
        <Link href="/contactus" passHref><span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact Us</span></Link>
        <ThemeToggle />
        {session ? <SignOut /> : <SignIn />}
      </div>
    </header>
  )
}
