import { HumanType } from "./HumanTypeDef";

/**
 * Champion Hunter Node 属性导出目标.
 */
export enum PropExportToType {
    /**
     * 无 Node 属性导出.
     * @type {PropExportToType.None}
     */
    None = 0,
    /**
     * 将 Node 属性导出为 Excel.Banner.
     * @type {PropExportToType.Banner}
     */
    Banner = 1,
    /**
     * 将 Node 属性导出为 Excel.Description.
     * @type {PropExportToType.Description}
     */
    Description = 2,
    /**
     * 将 Node 属性导出为 Excel.StanzaJson.
     * @type {PropExportToType.StanzaJson}
     */
    StanzaJson = 4,
}

/**
 * Champion Hunter 支持的导出模式.
 */
export type HunterTypeDefInfo = {
    humanType: HumanType,
    propExportTo: PropExportToType,
    stanzaBinding?: string,
}

/**
 * Champion Hunter 支持的导出模式定义.
 */
export const HunterTypeDef: {
    [key in "group" | "normalText" | "boldText" | "image" | "frame" | "store"]: HunterTypeDefInfo
} = {
    group: {
        humanType: "Text",
        propExportTo: PropExportToType.Banner,
    },
    normalText: {
        humanType: "Text",
        propExportTo: PropExportToType.Description,
    },
    boldText: {
        humanType: "Binding",
        propExportTo: PropExportToType.StanzaJson,
        stanzaBinding: "textbinding_BOLDTEXT",
    },
    image: {
        humanType: "Text",
        propExportTo: PropExportToType.Banner,
    },
    frame: {
        humanType: "Text",
        propExportTo: PropExportToType.Banner,
    },
    store: {
        humanType: "Store",
        propExportTo: PropExportToType.None,
    },
} as const;

/**
 * Champion Hunter 狩猎类型.
 */
export type HunterType = keyof typeof HunterTypeDef;