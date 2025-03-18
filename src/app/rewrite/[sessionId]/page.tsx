export default function RewritePage({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="container max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rewrite</h1>
      <p>Session ID: {params.sessionId}</p>
      <p>Rewrite page content will go here</p>
    </main>
  );
} 