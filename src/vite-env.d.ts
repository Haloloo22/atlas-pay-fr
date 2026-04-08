/// <reference types="vite/client" />

declare module "react-leaflet-draw" {
  import { FC } from "react";
  export interface EditControlProps {
    position?: string;
    draw?: Record<string, unknown>;
    edit?: Record<string, unknown>;
    onCreated?: (e: unknown) => void;
    onEdited?: (e: unknown) => void;
    onDeleted?: (e: unknown) => void;
    onDrawStart?: (e: unknown) => void;
    onDrawStop?: (e: unknown) => void;
  }
  export const EditControl: FC<EditControlProps>;
}
