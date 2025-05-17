"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ImageLightbox } from "@/components/image-lightbox"
import { AnimatedSection } from "@/components/animations/animated-section"

interface GalleryImage {
  src: string
  alt: string
  event?: string
  date?: string
  category?: string
}

interface GalleryGridProps {
  images: GalleryImage[]
  title?: string
  description?: string
  filter?: string
}

export function GalleryGrid({ images, title, description, filter }: GalleryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Filter images if a filter is provided
  const filteredImages = filter ? images.filter((img) => img.category === filter || img.event === filter) : images

  return (
    <div>
      {title && (
        <AnimatedSection direction="up" className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#821423] mb-2">{title}</h2>
          {description && <p className="text-gray-700">{description}</p>}
        </AnimatedSection>
      )}

      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma imagem encontrada para esta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <AnimatedSection
              key={index}
              direction="up"
              delay={0.1 * (index % 4)}
              className="h-64 sm:h-72 relative group overflow-hidden rounded-lg shadow-md"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(index)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium text-sm">{image.alt}</p>
                  {image.event && <p className="text-white/80 text-xs">{image.event}</p>}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      )}

      <ImageLightbox
        images={filteredImages}
        initialIndex={selectedImageIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  )
}
