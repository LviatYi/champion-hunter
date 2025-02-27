import { NodeProperty, TextNodeProperty } from "../entity/NodeProperty";
import { DefaultValueConfig } from "../config/GlobalConfig";

export function toExcelBanner(struct: NodeProperty): string {
    return `${struct.name}|x|${DefaultValueConfig.DEFAULT_X}|y|${DefaultValueConfig.DEFAULT_Y}|width|${struct.width}|height|${struct.height}`;
}

export function toExcelDescription(struct: TextNodeProperty): string {
    let str = `${struct.name}|color|${struct.color}`;
    if (struct.width !== undefined) {
        str += `|width|${struct.width}`;
    }
    if (struct.height !== undefined) {
        str += `|height|${struct.height}`;
    }
    if (struct.textAlignH !== undefined) {
        str += `|textAlignH|${struct.textAlignH}`;
    }
    if (struct.textAlignV !== undefined) {
        str += `|textAlignV|${struct.textAlignV}`;
    }
    if (struct.x !== undefined) {
        str += `|x|${DefaultValueConfig.DEFAULT_X}`;
    }
    if (struct.y !== undefined) {
        str += `|y|${DefaultValueConfig.DEFAULT_Y}`;
    }
    if (struct.resizeType !== undefined) {
        str += `|resizeType|${struct.resizeType}`;
    }
    if (struct.fontSize !== undefined) {
        str += `|fontSize|${struct.fontSize}`;
    }
    if (struct.multiline !== undefined) {
        str += `|multiline|${struct.multiline}`;
    }

    return str;
}

export function toExcelStanzaJson(struct: TextNodeProperty): string {
    return JSON.stringify({
        color: struct.color,
        boldText: struct.boldText,
        text: struct.text,
        width: struct.width,
        showBacking: struct.showBacking,
        alignmentH: struct.textAlignH,
        fontSize: struct.fontSize,
    });
}