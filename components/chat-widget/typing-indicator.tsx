/* ===================================
 * INDICADOR DE DIGITAÇÃO
 * ===================================
 * Componente que exibe uma animação de "digitando..."
 * com três pontos que pulsam sequencialmente
 */
export function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 items-center p-2">
      {/* Primeiro ponto - sem delay */}
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0ms" }}></span>

      {/* Segundo ponto - delay de 300ms */}
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "300ms" }}></span>

      {/* Terceiro ponto - delay de 600ms */}
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "600ms" }}></span>
    </div>
  )
}
