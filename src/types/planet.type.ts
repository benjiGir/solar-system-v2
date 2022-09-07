export type TPlanet = {
  id: number;
  name: string;
  diameter: number;
  distFromSun: number;
  orbitalSpeed: number;
  spinSpeed: number;
  texture: TPlanetTexture;
  moon?: TMoon;
}

export type TPlanetTexture = TEarth | TOtherPlanet;

export type TEarth = {
  colorMap: string;
  normalMap: string;
  specularMap: string;
}

type TOtherPlanet = string;

type TMoon = {
  name: string;
  diameter: number;
  distFromPlanet: number;
  orbitalSpeed: number;
  spinSpeed: number;
  texture: string;
}