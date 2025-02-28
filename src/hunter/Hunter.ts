import {
    selectTargetNodes,
    sweepNet,
} from "../sweep-net/SweepNet";
import Constant from "../config/Constant";
import EventName from "../config/EventName";
import { NodeProperty } from "../entity/NodeProperty";

export type UpdatableField = "name" | "text";

let curItems: [NodeProperty, SceneNode][];

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

    curItems = propertyObjs.map((propertyObj, index) => {
        return [propertyObj, targetNodes[index]];
    });

    figma.ui.postMessage({
        type: EventName.UPDATE_USABLE_ITEMS,
        data: propertyObjs,
    });
}

export function updateField(type: UpdatableField, index: number, newValue: string) {
    if (newValue == null || newValue === "") {
        console.warn(Constant.UPDATE_NODE_FIELD_FAILED_VALUE_INVALID);
        return;
    }

    if (curItems[index] == null) {
        console.warn(Constant.UPDATE_NODE_FIELD_FAILED_NODE_NOT_FOUND);
        return;
    }

    const node = curItems[index][1];

    if (type === "name") {
        node.name = newValue;
    } else if (type === "text") {
        if ("characters" in node) {
            node.characters = newValue;
        }
    }
}