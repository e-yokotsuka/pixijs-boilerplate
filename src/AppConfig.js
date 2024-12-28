class AppConfig {
    constructor() {
        this.env = {
            // `import.meta.env` is generated by Vite.
            mode: import.meta.env.MODE,
            baseUrl: import.meta.env.BASE_URL,
            isProd: import.meta.env.PROD,
            isDev: import.meta.env.DEV
        };
    }
}

export const config = new AppConfig();
