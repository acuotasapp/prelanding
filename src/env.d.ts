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

export interface Buttoneable {
  public async call(): Promise<void>;
  public async createButton(): Promise<void>;
  public getButton(): BtnDecorator;
}

export type HeadInfo = {
  url: string;
  imageUrl: string;
  title: string;
  description: string;
}

export type ImageType = {
  blob: ImageBlob;
  alt: string;
}

export type StaticPath = {
  params: {
    slug: string;
  }
}

export type ImageBlob = {
  src: string;
  width: number;
  height: number;
  format: string;
}