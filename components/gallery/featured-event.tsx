"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animations/animated-section"
import { ImageLightbox } from "@/components/image-lightbox"

interface FeaturedEventProps {
  title: string
  date: string
  location: string
  description: string
  attendees: number
  coverImage: string
  images: {
    src: string
    alt: string
    event?: string
    date?: string
  }[]
}

export function FeaturedEvent({
  title,
  date,
  location,
  description,
  attendees,
  coverImage,
  images,
}: FeaturedEventProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <AnimatedSection direction="up" className="mb-16">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cover image */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">{attendees} participantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">{description}</p>

          {/* Preview images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {images.slice(0, 4).map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-24 sm:h-32 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(index)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
                {index === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-medium">+{images.length - 4}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <Button
            onClick={() => {
              setSelectedImageIndex(0)
              setLightboxOpen(true)
            }}
            className="w-full bg-[#821423] hover:bg-[#6a1019]"
          >
            Ver todas as fotos
          </Button>
        </div>
      </div>

      <ImageLightbox
        images={images}
        initialIndex={selectedImageIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </AnimatedSection>
  )
}
