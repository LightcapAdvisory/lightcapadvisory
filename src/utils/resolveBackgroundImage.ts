export function resolveBackgroundImage(bg?: string | { src?: string }) {
    if (!bg) return undefined;

    if (typeof bg === 'string') {
        return bg.startsWith('/') ? bg : `/${bg}`;
    }

    if (bg.src) {
        return bg.src.startsWith('/') ? bg.src : `/${bg.src}`;
    }

    return undefined;
}
