import Image from "next/image"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"

export function Testimonials() {
  // Depoimentos com imagens de capa
  const testimonials = [
    {
      id: 1,
      title: "João Silva - Empresário",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Maria Oliveira - CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Carlos Santos - Diretor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Ana Costa - Empreendedora",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500&auto=format&fit=crop",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="text-center mb-12">
          <AnimatedText as="h2" className="text-3xl md:text-4xl font-bold text-[#821423] mb-4">
            Depoimentos
          </AnimatedText>
          <AnimatedText as="p" delay={0.3} className="text-xl text-gray-700 max-w-3xl mx-auto">
            Veja o que os participantes das edições anteriores têm a dizer sobre o INpulse.
          </AnimatedText>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.id}
              direction="up"
              delay={0.2 + index * 0.1}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              
              <div className="aspect-video bg-gray-200 relative">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{testimonial.title}</h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
