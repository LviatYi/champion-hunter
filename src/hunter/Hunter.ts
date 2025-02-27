import ExcelLineStruct from "../entity/ExcelLineStruct";
import {
    selectTargetNodes,
    sweepNet,
} from "../sweep-net/SweepNet";
import LogConstant from "../config/LogConstant";

export function hunter() {
    console.log("foo called.");
    const currentSelection: ReadonlyArray<SceneNode> = figma.currentPage.selection;

    console.log("current select count: ", currentSelection.length);
    console.log("current select: ", currentSelection);

    if (currentSelection.length === 0) {
        figma.closePlugin(LogConstant.NO_SELECT_NODE_WARNING);
        return;
    }

    const targetNodes = selectTargetNodes(currentSelection);
    console.log(`collect ${targetNodes.length} targetNodes: ${targetNodes}`);

    const propertyObjs = sweepNet(targetNodes);
    console.log(`sweep net and get ${propertyObjs.length} properties: ${propertyObjs}`);

    const lineStructures = propertyObjs
        .map(propertyObj => new ExcelLineStruct(propertyObj));
    lineStructures.forEach(lineStructure => console.log(lineStructure.toString()));

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
            figma.closePlugin(LogConstant.COPY_TO_CLIPBOARD_FINISHED);
        }
    };
}
