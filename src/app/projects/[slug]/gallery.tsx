"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-3">
        <button
          onClick={() => setLightbox(0)}
          className="w-full aspect-video overflow-hidden border border-zinc-800/50 group"
        >
          <img
            src={images[0] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </button>
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i + 1)}
                className="aspect-video overflow-hidden border border-zinc-800/50 group"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        )}
        {images.length > 4 && (
          <button
            onClick={() => setLightbox(0)}
            className="text-xs text-zinc-500 hover:text-orange transition-colors text-center py-2"
          >
            View all {images.length} images
          </button>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) =>
                  prev !== null ? (prev - 1 + images.length) % images.length : 0
                );
              }}
              className="absolute left-4 text-white/60 hover:text-white z-10"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) =>
                  prev !== null ? (prev + 1) % images.length : 0
                );
              }}
              className="absolute right-4 text-white/60 hover:text-white z-10"
            >
              <ChevronRight size={32} />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[lightbox]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 text-white/40 text-xs">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
