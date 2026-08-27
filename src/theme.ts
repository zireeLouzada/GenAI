export type Theme='light'|'dark';
export const THEME_STORAGE_KEY='meuape-theme';
export const resolveTheme=(saved:string|null,prefersDark:boolean):Theme=>saved==='light'||saved==='dark'?saved:prefersDark?'dark':'light';
