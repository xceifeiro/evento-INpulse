"use client"

import Image from "next/image"


export function Patrocinios(){
    // Logos dos patrocinadores
  const sponsorLogos = [
    {
      id: 1,
      name: "Empresa Alpha",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Corporação Beta",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Grupo Gamma",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Delta Inc.",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Epsilon Tech",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Zeta Solutions",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    },
  ]
    return (
        <section className="pt-10">
                <div className="container px-4 md:px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#821423] mb-8">Patrocinadores</h2>
                  <p className="text-lg text-gray-700 mb-8">
                    Conheça as empresas que estão impulsionando o INpulse e apoiando o crescimento do ecossistema de
                    negócios.
                  </p>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {sponsorLogos.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24 relative"
                    >
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        className="object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                </div>
            </section>
    );
    }   