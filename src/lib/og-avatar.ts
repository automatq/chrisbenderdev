/**
 * Loads the avatar from the project's public folder for next/og image routes.
 * Returned as a data URL so the image never depends on the deployed site URL
 * (which may not host the file yet, for example in local development).
 */
export async function getAvatarDataUrl(fileUrl: URL): Promise<string | undefined> {
    try {
        const response = await fetch(fileUrl);
        const buffer: ArrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        const chunk = 8192;
        for (let i = 0; i < bytes.length; i += chunk) {
            binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunk)));
        }
        return `data:image/jpeg;base64,${btoa(binary)}`;
    } catch (error) {
        console.error("Failed to load avatar for OG image:", error);
        return undefined;
    }
}
