import { Texture } from "three";
export declare class ComposeShader {
    uniforms: {
        tDiffuse1: {
            type: string;
            value: Texture;
        };
        tDiffuse2: {
            type: string;
            value: Texture;
        };
        mixRatio: {
            value: number;
        };
        opacity: {
            value: number;
        };
    };
    vertexShader: any;
    fragmentShader: any;
}
