/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.astro' {
  const AstroComponent: any;
  export default AstroComponent;
}

export type AstroReference = {
  id: string;
  collection: string;
}