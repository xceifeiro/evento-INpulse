"use client"
export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-gray-600">A página que você procura não existe.</p>
    </div>
  );
}