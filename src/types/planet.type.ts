export type TAstralObject = {
  id: number;
  type: EAstralType;
  name: string;
  diameter: number;
  distFromCenter: number;
  orbitalSpeed: number;
  spinSpeed: number;
  texture: TPlanetTexture;
  moon?: Omit<TAstralObject, 'moon'>;
}

export type TPlanet = TAstralObject;
export type TMoon = TAstralObject;

export type TPlanetTexture = TEarth | TOtherAstralObject;

export type TEarth = {
  colorMap: string;
  normalMap: string;
  specularMap: string;
  earthClouds: string;
}

export type TOtherAstralObject = string;

export enum EAstralType {
  Planet,
  Moon,
  AsteroidBelt
}
