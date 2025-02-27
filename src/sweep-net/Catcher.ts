import {
    GroupNodeProperty,
    InstanceNodeProperty,
    NodeProperty,
    RectangleNodeProperty,
    ResizeType,
    TextAlignH, TextAlignV,
    TextNodeProperty,
} from "../entity/NodeProperty";
import { DefaultValueConfig } from "../config/GlobalConfig";
import { FallbackError } from "../entity/FallbackError";
import LogConstant from "../config/LogConstant";

export function catchProperties(node: SceneNode): NodeProperty | undefined {
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
        case "GROUP":
            propertyObj = catchGroupNode(node);
            break;
        default:
            //TODO_LviatYi this type may not be supported
            figma.notify("This type is not supported.");
            return undefined;
    }

    return propertyObj;
}

export function catchRectangleNode(node: RectangleNode): RectangleNodeProperty {
    return {
        hunterType: "image",
        name: node.name,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
    };
}

export function catchStoreNode(node: InstanceNode): InstanceNodeProperty {
    return {
        hunterType: "store",
        name: node.name,
        x: node.x + node.width / 2,
        y: node.y + node.height / 2,
        width: node.width,
        height: node.height,
    };
}

export function catchGroupNode(node: GroupNode): GroupNodeProperty {
    return {
        hunterType: "group",
        name: node.name,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
    };
}

export function catchTextNode(node: TextNode): TextNodeProperty {
    let color: string | FallbackError<string> | undefined = catchTextNodeColor(node);
    if (color instanceof FallbackError) {
        console.warn(`TextNode: ${node.name} | ` + color.message);
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

    let resizeType: ResizeType | FallbackError<ResizeType> | undefined = catchTextNodeResizeType(node);
    if (resizeType instanceof FallbackError) {
        if (resizeType.fallbackValue != undefined) {
            resizeType = resizeType.fallbackValue;
        } else {
            resizeType = undefined;
        }
    }

    return {
        hunterType: boldText ? "boldText" : "normalText",
        name: node.name,
        color,
        boldText,
        text: node.characters,
        showBacking: DefaultValueConfig.SHOW_BACKING,
        textAlignH: catchTextNodeAlignmentH(node),
        textAlignV: catchTextNodeAlignmentV(node),
        x: node.x,
        y: node.y,
        height: node.height,
        width: node.width,
        resizeType: resizeType ?? DefaultValueConfig.RESIZE_TYPE,
        fontSize: fontSize ?? DefaultValueConfig.FONT_SIZE,
        multiline: DefaultValueConfig.MULTILINE,
    };
}

export function catchTextNodeAlignmentH(node: TextNode): TextAlignH | undefined {
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

export function catchTextNodeAlignmentV(node: TextNode): TextAlignV | undefined {
    switch (node.textAlignVertical) {
        case "TOP":
            return undefined;
        case "CENTER":
            return TextAlignV.Center;
        case "BOTTOM":
            return TextAlignV.Bottom;
    }
}

export function catchTextNodeColor(node: TextNode): string | FallbackError<string> {
    if (!Array.isArray(node.fills) ||
        node.fills.length == 0) {
        return new FallbackError("No fill color found.");
    }

    if (node.fills[0].type !== "SOLID") {
        return new FallbackError("Only solid fill color is supported.");
    }

    return figmaColorToHex(node.fills[0].color);
}

export function catchTextNodeIsBold(node: TextNode): boolean | FallbackError<boolean> {
    let font = node.fontName;
    if (typeof font === "object") {
        return font.style.toLowerCase() === "bold";
    }

    const error = new FallbackError<boolean>(LogConstant.MIXED_TEXT_NODE);
    font = node.getRangeFontName(0, 1);
    if (typeof font === "object") {
        error.fallbackValue = font.style.toLowerCase() === "bold";
        return error;
    }

    return error;
}

export function catchTextNodeFontSize(node: TextNode): number | FallbackError<number> {
    let size = node.fontSize;
    if (typeof size === "number") {
        return size;
    }

    const error = new FallbackError<number>(LogConstant.MIXED_TEXT_NODE);
    size = node.getRangeFontSize(0, 1);
    if (typeof size === "number") {
        error.fallbackValue = size;
        return error;
    }

    return error;
}

export function catchTextNodeResizeType(node: TextNode): ResizeType | FallbackError<ResizeType> {
    node.textAutoResize;
    return new FallbackError("Not implemented.");
}

export function figmaColorToHex(color: { r: number, g: number, b: number }): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);

    const hex = (r << 16) | (g << 8) | b;

    return `0x${hex.toString(16).padStart(6, "0").toUpperCase()}`;
}