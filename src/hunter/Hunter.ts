import ExcelLineStruct from "../entity/ExcelLineStruct";
import {
    selectTargetNodes,
    sweepNet,
} from "../sweep-net/SweepNet";
import Constant from "../config/Constant";

export function hunter() {
    const currentSelection: ReadonlyArray<SceneNode> = figma.currentPage.selection;

    console.trace(Constant.HUNTER_CURRENT_SELECT_COUNT, currentSelection.length);
    console.log(Constant.HUNTER_CURRENT_SELECT, currentSelection);

    if (currentSelection.length === 0) {
        figma.closePlugin(Constant.NO_SELECT_NODE_WARNING);
        return;
    }

    const targetNodes = selectTargetNodes(currentSelection);
    console.trace(Constant.HUNTER_SELECT_TARGET_NODE, `${targetNodes.length} targetNodes: ${targetNodes}`);

    const propertyObjs = sweepNet(targetNodes);
    console.trace(Constant.HUNTER_AFTER_SWEEP_NET, `${propertyObjs.length} properties: ${propertyObjs}`);

    const lineStructures = propertyObjs
        .map(propertyObj => new ExcelLineStruct(propertyObj));
    lineStructures.forEach(lineStructure => console.trace(lineStructure.toString()));

    const content = lineStructures
        .map(struct => struct.toString())
        .join("\n");

    figma.ui.postMessage({
        type: "copyToClipboard",
        text: content,
        itemNameList: lineStructures.map((struct) => struct.name),
    });

    figma.ui.onmessage = (message) => {
        if (message.type === "done") {
            figma.closePlugin(Constant.COPY_TO_CLIPBOARD_FINISHED);
        }
    };
}
