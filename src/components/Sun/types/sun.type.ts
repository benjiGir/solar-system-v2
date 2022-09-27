import { Texture, Vector2, Vector4 } from "three";

type TSunShaderTextureUniforms = {
  time: { value: number };
  uPerlin: { value: Texture | null };
  resolution: { value: Vector4 };
  uvRate1: { value: Vector2 };
};

type TSunShaderUniforms = {
  time: { value: number };
  resolution: { value: Vector4 };
  envMap: { value: Texture };
};

export type TSunShaderTextureProps = {
  uniforms: TSunShaderTextureUniforms;
  sunShaderTextureVertex: string;
  sunShaderTextureFragment: string;
}

export type TSunShaderProps = {
  uniforms: TSunShaderUniforms;
  sunShaderVertex: string;
  sunShaderFragment: string;
}