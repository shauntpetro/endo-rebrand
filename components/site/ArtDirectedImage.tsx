import { getImageProps } from "next/image";
import { preload } from "react-dom";

const DEFAULT_MOBILE_MEDIA = "(max-width: 47.999rem)";
const DEFAULT_DESKTOP_MEDIA = "(min-width: 48rem)";

export default function ArtDirectedImage({
  desktopSrc,
  mobileSrc,
  alt,
  sizes,
  mobileSizes = "94vw",
  className,
  priority = false,
  describedBy,
  mobileMedia = DEFAULT_MOBILE_MEDIA,
  desktopMedia = DEFAULT_DESKTOP_MEDIA,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  sizes: string;
  mobileSizes?: string;
  className?: string;
  priority?: boolean;
  describedBy?: string;
  mobileMedia?: string;
  desktopMedia?: string;
}) {
  const { props: desktopProps } = getImageProps({
    src: desktopSrc,
    alt,
    fill: true,
    priority,
    fetchPriority: priority ? "high" : "auto",
    sizes,
    className,
  });
  const { props: mobileProps } = getImageProps({
    src: mobileSrc,
    alt,
    fill: true,
    priority,
    fetchPriority: priority ? "high" : "auto",
    sizes: mobileSizes,
    className,
  });

  const {
    srcSet: desktopSrcSet,
    sizes: resolvedDesktopSizes,
    ...fallbackProps
  } = desktopProps;
  const {
    srcSet: mobileSrcSet,
    sizes: resolvedMobileSizes,
  } = mobileProps;

  if (priority) {
    preload(mobileProps.src, {
      as: "image",
      media: mobileMedia,
      imageSrcSet: mobileSrcSet,
      imageSizes: resolvedMobileSizes,
      fetchPriority: "high",
    });
    preload(desktopProps.src, {
      as: "image",
      media: desktopMedia,
      imageSrcSet: desktopSrcSet,
      imageSizes: resolvedDesktopSizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture>
      <source
        media={mobileMedia}
        srcSet={mobileSrcSet}
        sizes={resolvedMobileSizes}
      />
      <source
        media={desktopMedia}
        srcSet={desktopSrcSet}
        sizes={resolvedDesktopSizes}
      />
      <img
        {...fallbackProps}
        alt={alt}
        srcSet={desktopSrcSet}
        sizes={resolvedDesktopSizes}
        aria-describedby={describedBy}
      />
    </picture>
  );
}
