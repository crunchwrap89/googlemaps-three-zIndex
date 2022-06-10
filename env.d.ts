/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<
      Record<string, unknown>,
      Record<string, unknown>,
      any
    >;
    export default component;
  }
  
  declare type GLTFObject = {
    Model: Object3D;
    Animations: AnimationClip[];
  };
  
  declare type APITYPE = {
    apiKey: string;
    mapIds: string[];
    libraries: (
      | "drawing"
      | "visualization"
      | "geometry"
      | "localContext"
      | "places"
    )[];
    region: string;
    language: string;
  };
  