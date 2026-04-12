const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;

export const logger = {
    debug: (...args) => {
        if (isDev) console.debug(...args);
    },
    info: (...args) => {
        if (isDev) console.info(...args);
    },
    warn: (...args) => {
        if (isDev) console.warn(...args);
    },
    error: (...args) => {
        // Keep error logs even in prod (can be swapped for remote reporting later)
        console.error(...args);
    },
};
