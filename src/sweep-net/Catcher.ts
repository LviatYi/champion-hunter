import {
    InstanceNodeProperty,
    NodeProperty,
    ImageLikeNodeProperty,
    TextAlignH, TextAlignV,
    TextNodeProperty,
} from "../entity/NodeProperty";
import { DefaultValueConfig } from "../config/GlobalConfig";
import { FallbackError } from "../entity/FallbackError";
import Constant from "../config/Constant";
import { UsableNode } from "./SweepNet";

export function catchProperties(node: UsableNode): NodeProperty | undefined {
    let propertyObj: NodeProperty;
    switch (node.type) {
        case "TEXT":
            propertyObj = catchTextNode(node);
            break;
        case "RECTANGLE":
            propertyObj = catchRectangleNode(node);
            break;
        case "INSTANCE":
            propertyObj = catchStoreNode(node);
            break;
        case "FRAME":
            propertyObj = catchFrameNode(node);
            break;
        case "GROUP":
            propertyObj = catchGroupNode(node);
            break;
        default:
            //TODO_LviatYi this type may not be supported
            figma.notify("This type is not supported.");
            return undefined;
    }

    propertyObj.x = Math.round(propertyObj.x);
    propertyObj.y = Math.round(propertyObj.y);
    propertyObj.width = Math.round(propertyObj.width);
    propertyObj.height = Math.round(propertyObj.height);

    return propertyObj;
}

function catchRectangleNode(node: RectangleNode): ImageLikeNodeProperty {
    const position = calNodeAbsolutePosition(node);
    return {
        hunterType: "image",
        name: node.name,
        x: position.x,
        y: position.y,
        width: node.width,
        height: node.height,
    };
}

function catchStoreNode(node: InstanceNode): InstanceNodeProperty {
    const position = calNodeAbsolutePosition(node);
    return {
        hunterType: "store",
        name: node.name,
        x: position.x + node.width / 2,
        y: position.y + node.height / 2,
        width: node.width,
        height: node.height,
    };
}

function catchFrameNode(node: FrameNode): ImageLikeNodeProperty {
    const position = calNodeAbsolutePosition(node);
    return {
        hunterType: "frame",
        name: node.name,
        x: position.x,
        y: position.y,
        width: node.width,
        height: node.height,
    };
}

function catchGroupNode(node: GroupNode): ImageLikeNodeProperty {
    const position = calNodeAbsolutePosition(node);
    return {
        hunterType: "group",
        name: node.name,
        x: position.x,
        y: position.y,
        width: node.width,
        height: node.height,
    };
}

function catchTextNode(node: TextNode): TextNodeProperty {
    let color: string | FallbackError<string> | undefined = catchTextNodeColor(node);
    if (color instanceof FallbackError) {
        if (color.fallbackValue != undefined) {
            color = color.fallbackValue;
        } else {
            color = undefined;
        }
    }

    let boldText: boolean | FallbackError<boolean> | undefined = catchTextNodeIsBold(node);
    if (boldText instanceof FallbackError) {
        if (boldText.fallbackValue != undefined) {
            boldText = boldText.fallbackValue;
        } else {
            boldText = undefined;
        }
    }

    let fontSize: number | FallbackError<number> | undefined = catchTextNodeFontSize(node);
    if (fontSize instanceof FallbackError) {
        if (fontSize.fallbackValue != undefined) {
            fontSize = fontSize.fallbackValue;
        } else {
            fontSize = undefined;
        }
    }

    const position = calNodeAbsolutePosition(node);

    return {
        hunterType: boldText ? "boldText" : "normalText",
        name: node.name,
        color,
        boldText,
        text: node.characters,
        showBacking: DefaultValueConfig.SHOW_BACKING,
        textAlignH: catchTextNodeAlignmentH(node),
        textAlignV: catchTextNodeAlignmentV(node),
        x: position.x,
        y: position.y,
        height: node.height,
        width: node.width,
        resizeType: DefaultValueConfig.RESIZE_TYPE,
        fontSize: fontSize ?? DefaultValueConfig.FONT_SIZE,
        multiline: DefaultValueConfig.MULTILINE,
    };
}

function catchTextNodeAlignmentH(node: TextNode): TextAlignH | undefined {
    switch (node.textAlignHorizontal) {
        case "LEFT":
            return TextAlignH.Left;
        case "CENTER":
            return TextAlignH.Center;
        case "RIGHT":
            return TextAlignH.Right;
        case "JUSTIFIED":
            return undefined;
    }
}

function catchTextNodeAlignmentV(node: TextNode): TextAlignV | undefined {
    switch (node.textAlignVertical) {
        case "TOP":
            return undefined;
        case "CENTER":
            return TextAlignV.Center;
        case "BOTTOM":
            return TextAlignV.Bottom;
    }
}

function catchTextNodeColor(node: TextNode): string | FallbackError<string> {
    if (!Array.isArray(node.fills) ||
        node.fills.length == 0) {
        return new FallbackError("No fill color found.");
    }

    if (node.fills[0].type !== "SOLID") {
        return new FallbackError("Only solid fill color is supported.");
    }

    return figmaColorToHex(node.fills[0].color);
}

function catchTextNodeIsBold(node: TextNode): boolean | FallbackError<boolean> {
    let font = node.fontName;
    if (typeof font === "object") {
        return fontStyleIsBold(font.style.toLowerCase());
    }

    const error = new FallbackError<boolean>(Constant.MIXED_TEXT_NODE);
    font = node.getRangeFontName(0, 1);
    if (typeof font === "object") {
        error.fallbackValue = fontStyleIsBold(font.style.toLowerCase());
        return error;
    }

    return error;
}

function catchTextNodeFontSize(node: TextNode): number | FallbackError<number> {
    let size = node.fontSize;
    if (typeof size === "number") {
        return size;
    }

    const error = new FallbackError<number>(Constant.MIXED_TEXT_NODE);
    size = node.getRangeFontSize(0, 1);
    if (typeof size === "number") {
        error.fallbackValue = size;
        return error;
    }

    return error;
}

function calNodeAbsolutePosition(node: DimensionAndPositionMixin): { x: number, y: number } {
    const ancestors = getAllAncestorFrameNode(node as UsableNode);

    let x = node.x;
    let y = node.y;
    for (let i = 0; i < ancestors.length; i++) {
        if (i == ancestors.length - 1) break;

        const ancestor = ancestors[i];
        x += ancestor.x;
        y += ancestor.y;
    }

    return {x, y};
}

const getAllAncestorFrameNodeCache = new Map<UsableNode, FrameNode[]>();

function getAllAncestorFrameNode(leap: UsableNode): FrameNode[] {
    let ancestors: FrameNode[] | undefined = getAllAncestorFrameNodeCache.get(leap);
    if (ancestors != undefined) {
        return ancestors;
    } else {
        ancestors = [];
    }

    let current = leap;
    while (current.parent != null && current.parent.type !== "PAGE") {
        current = current.parent as UsableNode;
        if (current.type === "FRAME") {
            ancestors.push(current);
        }
        const query = getAllAncestorFrameNodeCache.get(current);
        if (query != undefined) {
            ancestors.push(...query);
            break;
        }
    }

    getAllAncestorFrameNodeCache.set(leap, ancestors);
    return ancestors;
}

function figmaColorToHex(color: { r: number, g: number, b: number }): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);

    const hex = (r << 16) | (g << 8) | b;

    return `0x${hex.toString(16).padStart(6, "0").toUpperCase()}`;
}

function fontStyleIsBold(fontStyle: string): boolean {
    for (const ref of DefaultValueConfig.BOLD_FONT_STYLE_REFERENCE_IN_LOWER_CASE) {
        if (fontStyle.toLowerCase().includes(ref)) return true;
    }
    return false;
}
