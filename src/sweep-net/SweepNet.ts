import { NodeProperty } from "../entity/NodeProperty";
import { catchProperties } from "./Catcher";

/**
 * 可用节点类型.
 */
type UsableNode = TextNode | RectangleNode | InstanceNode | GroupNode;

const UsableNodeTypes = ["TEXT", "RECTANGLE", "INSTANCE", "GROUP"];

type TargetNode = GroupNode | UsableNode;

/**
 * 从 selection 选择目标节点.
 * 当所选节点为 TEXT 等可用节点时，选择可用节点.
 * 当所选节点为 GROUP 时，选择 GROUP 节点及其内的所有可用节点.
 *
 * 去重的. TS 标准保证返回数组的顺序将参考 selection 的顺序.
 *
 * @param {ReadonlyArray<SceneNode>} selection
 * @returns {TargetNode[]}
 */
export function selectTargetNodes(selection: ReadonlyArray<SceneNode>): TargetNode[] {
    const targetSet: Set<TargetNode> = new Set<TargetNode>();

    for (const node of selection) {
        getUsableNodesIncludeChildren(node as GroupNode, true)
            .forEach(node => targetSet.add(node));
    }

    return Array.from(targetSet);
}

/**
 * 收集所选 Figma 节点的属性.
 *
 * @param {ReadonlyArray<TargetNode>} candidates 所选节点
 * @param {NodeProperty[]} addTo 可选的 目标属性数组
 * @returns {NodeProperty[]} 目标属性数组
 */
export function sweepNet(candidates: ReadonlyArray<TargetNode>, addTo?: NodeProperty[]): NodeProperty[] {
    if (addTo == null) {
        addTo = [];
    }

    addTo.push(...candidates.map(
        candidate => catchProperties(candidate))
        .filter(value => value != null));

    return addTo;
}

/**
 * 从 GroupNode 中获取所有可用节点.
 * @param {SceneNode} root
 * @param {boolean} force 是否强制添加不可见节点. 仅作用于首个节点.
 * @param {UsableNode[]} addTo
 * @returns {UsableNode[]}
 */
function getUsableNodesIncludeChildren(root: SceneNode, force: boolean = false, addTo?: UsableNode[]): UsableNode[] {
    if (addTo == null) addTo = [];

    const candidates = [root];
    while (candidates.length > 0) {
        const p = candidates.pop();
        if (p == null) continue;

        if (UsableNodeTypes.indexOf(p.type as string) !== -1) {
            if (!force && "visible" in p && !p.visible) continue;
            if (p.type == "GROUP") candidates.push(...p.children);

            addTo.push(p as UsableNode);
        }
        force = false;
    }

    return addTo;
}

