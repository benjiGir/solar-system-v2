import { Texture } from "three";
import create from "zustand";

interface ISunStore {
  texture: Texture | null;
  setTexture: (texture: Texture) => void;
}

export const useSunStore = create<ISunStore>((set) => ({
  texture: null,
  setTexture: (texture) => set({ texture }),
}));
