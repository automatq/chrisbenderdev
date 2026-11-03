import { readFile } from "node:fs/promises";

/**
 * Reads a build-time asset that sits next to the source file.
 *
 * `new URL("./thing", import.meta.url)` is the pattern that makes the bundler
 * emit the asset and hand back its location in the build output. That location
 * is a `file:` URL, and Node's `fetch` has no `file:` handler, so the bytes
 * have to come off the filesystem — the `fetch` form only ever worked on the
 * (now deprecated) edge runtime.
 */
async function readLocalAsset(fileUrl: URL): Promise<ArrayBuffer> {
  const buffer = await readFile(fileUrl);
  // Buffers are views onto a larger pooled ArrayBuffer, so slice to this
  // file's own bytes rather than handing over the whole pool.
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

/** Font bytes for `ImageResponse`, or `null` if they can't be read. */
export async function getOgFonts(
  cabinetGroteskUrl: URL,
  clashDisplayUrl: URL
) {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readLocalAsset(cabinetGroteskUrl),
      readLocalAsset(clashDisplayUrl),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts for OG image:", error);
    return null;
  }
}

/**
 * The avatar as a data URL. Inlining it keeps the image independent of the
 * deployed site URL, which may not serve the file yet (local dev, preview
 * deploys, or the very build that is generating this image).
 */
export async function getAvatarDataUrl(
  fileUrl: URL
): Promise<string | undefined> {
  try {
    const bytes = await readLocalAsset(fileUrl);
    return `data:image/jpeg;base64,${Buffer.from(bytes).toString("base64")}`;
  } catch (error) {
    console.error("Failed to load avatar for OG image:", error);
    return undefined;
  }
}
