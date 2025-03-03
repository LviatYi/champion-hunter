import { ResizeType } from "../entity/NodeProperty";

export default class GlobalConfig {
    public static readonly TOP_BAR_HEIGHT = 65;
}

export class DefaultValueConfig {
    public static readonly MULTILINE = true;
    public static readonly SHOW_BACKING = false;
    public static readonly RESIZE_TYPE = ResizeType.None;
    public static readonly FONT_SIZE = 0;
    public static readonly DEFAULT_X = 0;
    public static readonly DEFAULT_Y = 0;

    public static readonly BOLD_FONT_STYLE_REFERENCE_IN_LOWER_CASE = ["bold", "heavy"];
}