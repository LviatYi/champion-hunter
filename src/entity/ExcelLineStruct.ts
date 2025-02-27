import { HumanType, HumanTypeDef, StanzaType } from "../config/HumanTypeDef";
import { HunterTypeDef, PropExportToType } from "../config/HunterTypeDef";
import { NodeProperty, TextNodeProperty } from "./NodeProperty";
import { toExcelBanner, toExcelDescription, toExcelStanzaJson } from "../hunter/Stringify";
import { ExcelLineOrderDef } from "../config/ExcelLineOrderDef";
import { PropToExcelLineDef } from "../config/PropToExcelLineDef";
import GlobalConfig from "../config/GlobalConfig";

export default class ExcelLineStruct {
    name: string;
    xCord: number;
    yCord: number;
    humanType: HumanType;
    stanzaType: StanzaType;

    banner?: string;
    description?: string;
    stanzaBinding?: string;
    stanzaJson?: string;

    constructor(propertyObj: NodeProperty) {
        this.name = propertyObj.name;
        this.xCord = propertyObj.x;
        this.yCord = propertyObj.y - GlobalConfig.TOP_BAR_HEIGHT;
        const hunterTypeDef = HunterTypeDef[propertyObj.hunterType];
        this.humanType = hunterTypeDef.humanType;
        this.stanzaType = HumanTypeDef[this.humanType];
        this.stanzaBinding = hunterTypeDef.stanzaBinding;

        if (hunterTypeDef.propExportTo & PropExportToType.Banner) {
            this.withBanner(toExcelBanner(propertyObj));
        }
        if (hunterTypeDef.propExportTo & PropExportToType.Description) {
            this.withDescription(toExcelDescription(propertyObj as TextNodeProperty));
        }
        if (hunterTypeDef.propExportTo & PropExportToType.StanzaJson) {
            this.withStanzaJson(toExcelStanzaJson(propertyObj as TextNodeProperty));
        }
    }

    private withBanner(banner: string): this {
        this.banner = banner;
        return this;
    }

    private withDescription(description: string): this {
        this.description = description;
        return this;
    }

    private withStanzaJson(stanzaJson: string): this {
        this.stanzaJson = stanzaJson;
        return this;
    }

    public toString(): string {
        return ExcelLineStruct.toExcelStringLine(this);
    }

    /**
     * 转为 Excel 表格的一行.
     * @param {ExcelLineStruct} struct
     * @returns {string}
     */
    public static toExcelStringLine(struct: ExcelLineStruct): string {
        return Object.entries(ExcelLineOrderDef)
            .filter(([key, _]) => isNaN(Number(key)))
            .map(([key, _]): keyof typeof ExcelLineOrderDef => (key as keyof typeof ExcelLineOrderDef))
            .map((key) => {
                const def = PropToExcelLineDef[ExcelLineOrderDef[key]];
                if (def == undefined) {
                    return undefined;
                }
                return struct[def.propName] ?? "";
            })
            .join("\t");
    }
}