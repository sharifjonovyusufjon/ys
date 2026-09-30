import Image from "next/image";
import type { CSSProperties } from "react";

export const isLocalImage = (src: string): boolean =>
  src.startsWith("/") && !src.startsWith("//");

export default function SafeImage({
  src,
  alt,
  fill,
  sizes,
  priority,
  style,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  if (!src) return null;

  if (isLocalImage(src) && fill) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={style} />;
  }

  if (isLocalImage(src)) {
    return <Image src={src} alt={alt} width={1200} height={750} sizes={sizes} priority={priority} style={style} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        position: fill ? "absolute" : "relative",
        inset: fill ? 0 : undefined,
        width: "100%",
        height: fill ? "100%" : "auto",
        objectFit: style?.objectFit ?? "cover",
        objectPosition: style?.objectPosition,
      }}
    />
  );
}
