export type TAstralObject = {
  id: number;
  type: EAstralType;
  name: string;
  diameter: number;
  distFromCenter: number;
  orbitalSpeed: number;
  spinSpeed: number;
  texture: TPlanetTexture;
}

export type TPlanet = TAstralObject;
export type TMoon = TAstralObject;

export type TPlanetTexture = TEarth | TOtherAstralObject;

export type TEarth = {
  colorMap: string;
  normalMap: string;
  specularMap: string;
}

export type TOtherAstralObject = string;

export enum EAstralType {
  Planet,
  Moon,
  AsteroidBelt
}
