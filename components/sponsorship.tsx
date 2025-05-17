import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"
import { Patrocinios } from "@/components/patrocinios"
import { Parceiros } from "@/components/parceiros"

export function Sponsorship() {

  return (
    <section className="py-16 md:py-24 bg-gray-200 z-[7] shadow-xl">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#821423] mb-4">Patrocínios</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Associe sua marca a um evento premium de networking e aumente sua visibilidade entre empresários de alto
            nível.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {/* Gold */}
          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden border-t-4">
            
              <div className="flex justify-between z-[2] items-center mb-4 w-full p-4 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFA500] text-white shadow-md">
                <h3 className="text-2xl text-yellow-600 font-bold">Gold</h3>
                <div className="text-white bg-slate-600/20 backdrop-blur-sm px-2 rounded-lg font-bold">R$ 5.800</div>
              </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Vídeo institucional de 2 min</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Logo no telão</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Camarim exclusivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Stand 4×2</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>3 credenciais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Leads dos participantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Entrevistas</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                <Link href="#contato">Seja um Patrocinador</Link>
              </Button>
            </div>
          </div>

          {/* Prata */}
                      <div className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden border-t-4">
              {/* Badge de destaque */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-b-lg z-10 shadow">
                Popular
              </div>

              {/* Cabeçalho do plano */}
              <div className="flex justify-between z-[2] items-center mb-4 w-full p-4 bg-gradient-to-r from-[#dcdcdc] via-[#c0c0c0] to-[#a9a9a9] text-gray-800 shadow-md">
                <h3 className="text-2xl font-bold text-gray-800">Prata</h3>
                <div className="bg-white/20 backdrop-blur-sm px-2 rounded-lg font-bold text-gray-800">R$ 3.700</div>
              </div>

              {/* Conteúdo do plano */}
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>Testemunhal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>Logo no telão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>Stand 3×2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>2 credenciais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>Leads dos participantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>Entrevistas</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-0 hover:bg-gradient-to-r hover:text-white hover:from-gray-500 hover:to-gray-600 bg-gradient-to-r from-[#c5c5c5] via-[#c0c0c0] to-[#a9a9a9] text-gray-800 shadow-lg">
                  <Link href="#contato">Seja um Patrocinador</Link>
                </Button>
              </div>
            </div>

          {/* Bronze */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4">
            
              <div className="flex justify-between items-center mb-4 w-full p-4 bg-gradient-to-r from-[#cd7f32] via-[#b87333] to-[#8c5a2c] text-white shadow-md">
                <h3 className="text-2xl font-bold text-white">Bronze</h3>
                <div className="bg-white/10 backdrop-blur-sm px-2 rounded-lg font-bold text-white">R$ 2.300</div>
              </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>Logo no telão</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>Balcão adesivado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>1 credencial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>Leads dos participantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>Entrevistas</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link href="#contato">Seja um Patrocinador</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border shadow-xl">
          <Table className="bg-gray-500">
            <TableHeader className="bg-slate-500">
              <TableRow>
                <TableHead className="text-white w-[180px]">Benefícios</TableHead>
                <TableHead className="text-yellow-400 text-center">Gold</TableHead>
                <TableHead className="text-slate-200 text-center">Prata</TableHead>
                <TableHead className="text-amber-500 text-center">Bronze</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-gray-300">
              <TableRow>
                <TableCell className="font-medium">Vídeo institucional</TableCell>
                <TableCell className="text-center">2 min</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Testemunhal</TableCell>
                <TableCell className="text-center">✓</TableCell>
                <TableCell className="text-center">✓</TableCell>
                <TableCell className="text-center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Logo no telão</TableCell>
                <TableCell className="text-center">✓</TableCell>
                <TableCell className="text-center">✓</TableCell>
                <TableCell className="text-center">✓</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Espaço físico</TableCell>
                <TableCell className="text-center">Stand 4×2</TableCell>
                <TableCell className="text-center">Stand 3×2</TableCell>
                <TableCell className="text-center">Balcão</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Credenciais</TableCell>
                <TableCell className="text-center">3</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Camarim exclusivo</TableCell>
                <TableCell className="text-center">✓</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Valor</TableCell>
                <TableCell className="text-center font-bold">R$ 5.800</TableCell>
                <TableCell className="text-center font-bold">R$ 3.700</TableCell>
                <TableCell className="text-center font-bold">R$ 2.300</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* SECAO DE PATROCINIOS E PARCEIROS COMENTADA        
        <Patrocinios />
        <Parceiros />*/}
      </div>
    </section>
  )
}
