"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => {
        const video = isVideo(image.src);
        return (
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            key={index}
            radius="m"
            aspectRatio={
              image.aspectRatio ?? (image.orientation === "horizontal" ? "16 / 9" : "3 / 4")
            }
            // Clips autoplay muted on a loop, so the grid reads as one surface
            autoplay={video}
            loop={video}
            src={image.src}
            alt={image.alt}
          />
        );
      })}
    </MasonryGrid>
  );
}
