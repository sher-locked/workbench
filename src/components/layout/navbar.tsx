"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Settings, History } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tight"
          >
            Clarifi
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/input">
            <Button variant="ghost">Write</Button>
          </Link>
          <Link href="/history">
            <Button variant="ghost">
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </Link>
          <Link href="/config">
            <Button variant="ghost">
              <Settings className="mr-2 h-4 w-4" />
              Config
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
} 