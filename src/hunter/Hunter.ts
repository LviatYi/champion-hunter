import {
    selectTargetNodes,
    sweepNet,
} from "../sweep-net/SweepNet";
import Constant from "../config/Constant";
import EventName from "../config/EventName";

export function hunter() {
    const currentSelection: ReadonlyArray<SceneNode> = figma.currentPage.selection;

    console.log(Constant.HUNTER_CURRENT_SELECT_COUNT, currentSelection.length);
    console.log(Constant.HUNTER_CURRENT_SELECT, currentSelection);

    if (currentSelection.length === 0) {
        figma.closePlugin(Constant.NO_SELECT_NODE_WARNING);
        return;
    }

    const targetNodes = selectTargetNodes(currentSelection);
    console.log(Constant.HUNTER_SELECT_TARGET_NODE, `${targetNodes.length} targetNodes: ${targetNodes}`);

    const propertyObjs = sweepNet(targetNodes);
    console.log(Constant.HUNTER_AFTER_SWEEP_NET, `${propertyObjs.length} properties: ${propertyObjs}`);
    
    figma.ui.postMessage({
        type: EventName.UPDATE_USABLE_ITEMS,
        data: propertyObjs,
    });

    figma.ui.onmessage = (message) => {
        if (message.type === "done") {
            figma.closePlugin(Constant.COPY_TO_CLIPBOARD_FINISHED);
        }
    };
}