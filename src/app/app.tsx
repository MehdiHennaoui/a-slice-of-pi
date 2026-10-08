import { HomePage } from "@/pages/home";

export function App() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen p-2 gap-2">
      <h1 className="text-2xl font-bold">A Slice of Pi</h1>
      <main className="flex flex-col grow">
        <HomePage />
      </main>
    </div>
  );
}
