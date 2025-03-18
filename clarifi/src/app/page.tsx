import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Clarifi</h1>
        <p className="text-xl mb-8">Refine your writing with AI-powered feedback and suggestions</p>
        <Link 
          href="/input" 
          className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
