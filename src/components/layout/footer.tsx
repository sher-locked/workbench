export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Clarifi. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Improve your writing with AI
        </p>
      </div>
    </footer>
  );
} 