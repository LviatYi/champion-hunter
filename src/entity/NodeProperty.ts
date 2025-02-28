import { HunterType } from "../config/HunterTypeDef";

export interface NodeProperty {
    hunterType: HunterType;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ImageLikeNodeProperty extends NodeProperty {
    hunterType: "image" | "group" | "frame";
}

export interface InstanceNodeProperty extends NodeProperty {
    hunterType: "store";
}

export enum TextAlignH {
    Left = 0,
    Center = 1,
    Right = 2,
}

export enum TextAlignV {
    Top = 0,
    Center = 1,
    Bottom = 2,
}

export enum ResizeType {
    None = 0,
    Compress = 1,
    Adjust = 2,
    Clip = 3,
}

export interface TextNodeProperty extends NodeProperty {
    hunterType: "normalText" | "boldText";
    color?: string;
    boldText?: boolean;
    text: string;
    showBacking: boolean;
    textAlignH?: TextAlignH;
    textAlignV?: TextAlignV;
    resizeType: ResizeType;
    fontSize: number;
    multiline: boolean;
}