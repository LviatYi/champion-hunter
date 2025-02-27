import ExcelLineStruct from "../entity/ExcelLineStruct";
import { ExcelLineOrderDef } from "./ExcelLineOrderDef";

/**
 * Excel 列逻辑信息定义.
 *  - propName: ExcelLineStruct 的属性名.
 */
type ExcelLineDefInfo = { propName: keyof ExcelLineStruct };

/**
 * Excel 列词条与 {@type ExcelLineStruct} 属性映射.
 */
export const PropToExcelLineDef: {
    [K in ExcelLineOrderDef]?: ExcelLineDefInfo;
} = {
    [ExcelLineOrderDef.name]: {propName: "name"},
    [ExcelLineOrderDef.banner]: {propName: "banner"},
    [ExcelLineOrderDef.description]: {propName: "description"},
    [ExcelLineOrderDef.xCord]: {propName: "xCord"},
    [ExcelLineOrderDef.yCord]: {propName: "yCord"},
    [ExcelLineOrderDef.HumanType]: {propName: "humanType"},
    [ExcelLineOrderDef.stanzaType]: {propName: "stanzaType"},
    [ExcelLineOrderDef.StanzaBinding]: {propName: "stanzaBinding"},
    [ExcelLineOrderDef.StanzaJson]: {propName: "stanzaJson"},
} as const;