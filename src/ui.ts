import Constant from "./config/Constant";
import EventName from "./config/EventName";
import ExcelLineStruct from "./entity/ExcelLineStruct";
import { NodeProperty } from "./entity/NodeProperty";
import { UpdatableField } from "./hunter/Hunter";
import GlobalConfig from "./config/GlobalConfig";

console.log(Constant.UI_LOADING);

let textarea: HTMLTextAreaElement;
let copyBtn: HTMLButtonElement;
let copySelectionButton: HTMLButtonElement;
let exportList: HTMLElement;

let previewNameTxt: HTMLTextAreaElement;
let previewTextTxt: HTMLTextAreaElement;
let previewXTxt: HTMLTextAreaElement;
let previewYTxt: HTMLTextAreaElement;
let previewWidthTxt: HTMLTextAreaElement;
let previewHeightTxt: HTMLTextAreaElement;
let previewTextField: HTMLElement;

let curItems: NodeProperty[];
let curSelect: number = -1;

window.onload = (_) => {
    console.log(Constant.UI_LOAD_FINISHED);
    const textareaElement = document.getElementById("previewArea");
    if (textareaElement == null) {
        console.warn(Constant.UI_PREVIEW_AREA_NOT_FOUND);
        textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
    } else {
        textarea = (textareaElement as HTMLTextAreaElement);
    }
    textarea.placeholder = Constant.NO_SELECT_NODE_WARNING;

    const copyButtonElement = document.getElementById("copyButton");
    if (copyButtonElement == null) {
        console.warn(Constant.UI_COPY_BUTTON_NOT_FOUND);
        copyBtn = document.createElement("button");
        copyBtn.innerText = Constant.UI_TEXT_COPY_ALL;
        document.body.appendChild(copyBtn);
    } else {
        copyBtn = (copyButtonElement as HTMLButtonElement);
    }
    copyBtn.onclick = (_) => {
        execCopy(textarea, true);
    };

    const copySelectionButtonElement = document.getElementById("copySelectionButton");
    if (copySelectionButtonElement == null) {
        console.warn(Constant.UI_COPY_SELECTION_BUTTON_NOT_FOUND);
        copySelectionButton = document.createElement("button");
        copySelectionButton.innerText = Constant.UI_TEXT_COPY_SELECTION;
        document.body.appendChild(copySelectionButton);
    } else {
        copySelectionButton = (copySelectionButtonElement as HTMLButtonElement);
    }
    copySelectionButton.onclick = (_) => {
        if (curSelect < 0) {
            console.warn(Constant.UI_NO_ITEM_SELECTED_WHEN_COPY_SELECTION);
            return;
        }

        selectLineInTextArea(curSelect);
        execCopy(textarea, false);
    };

    const exportListElement = document.getElementById("exportList");
    if (exportListElement == null) {
        console.warn(Constant.UI_EXPORT_LIST_NOT_FOUND);
    } else {
        exportList = exportListElement;
        exportList.addEventListener("click", (event) => {
                const target = event.target;
                if (target instanceof HTMLElement && target.classList.contains("export-list-item")) {
                    const index = target.getAttribute("data-index");
                    if (index != null) {
                        console.log(Constant.UI_EXPORT_LIST_ITEM_CLICKED, index);
                        refreshItemInfo(curItems[parseInt(index)]);
                    }
                }
            },
        );
    }

    previewNameTxt = (document.getElementById("previewNameTxt") as HTMLTextAreaElement);
    if (previewNameTxt) {
        previewNameTxt.addEventListener("change", (event) => {
            const updatedValue: string | undefined = (event.target as HTMLTextAreaElement)?.value.trim();
            if (curSelect >= 0) {
                if (updatedValue != null) {
                    console.log(Constant.UI_SET_NAME_FIELD, updatedValue);
                    applyUpdate("name", curSelect, updatedValue);
                } else {
                    console.warn(Constant.UI_SET_FIELD_FAILED);
                }
            }
        });
    }
    previewTextTxt = (document.getElementById("previewTextTxt") as HTMLTextAreaElement);
    if (previewTextTxt) {
        previewTextTxt.addEventListener("change", (event) => {
            const updatedValue: string | undefined = (event.target as HTMLTextAreaElement)?.value.trim();
            if (curSelect >= 0) {
                if (updatedValue != null) {
                    console.log(Constant.UI_SET_TEXT_FIELD, updatedValue);
                    applyUpdate("text", curSelect, updatedValue);
                } else {
                    console.warn(Constant.UI_SET_FIELD_FAILED);
                }
            }
        });
    }
    previewXTxt = (document.getElementById("previewXTxt") as HTMLTextAreaElement);
    previewYTxt = (document.getElementById("previewYTxt") as HTMLTextAreaElement);
    previewWidthTxt = (document.getElementById("previewWidthTxt") as HTMLTextAreaElement);
    previewHeightTxt = (document.getElementById("previewHeightTxt") as HTMLTextAreaElement);
    previewTextField = (document.getElementById("previewTextField") as HTMLElement);
};

window.onmessage = async (event) => {
    const {type, data} = event.data.pluginMessage;
    if (type === EventName.UPDATE_USABLE_ITEMS) {
        curItems = (data as NodeProperty[]);
        try {
            console.log(Constant.UI_RENDER_TEXT_AREA, curItems);
            refreshItemInfo(curItems[0]);
            renderExportList();
            renderExcelExportStr();
        } catch (error) {
            console.error(Constant.UI_ANY_RENDER_FAILED, error);
            postErrorMessage(error);
        }
    }
};

function postErrorMessage(message: string | unknown) {
    const msg: string = (typeof message === "string")
        ? message
        : (typeof message === "object" && message != null && "message" in message && typeof message.message === "string")
            ? message.message
            : JSON.stringify(message);
    parent.postMessage({pluginMessage: {type: "error", error: msg ?? ""}}, "*");
}

function execCopy(textarea: HTMLTextAreaElement, selectAll: boolean) {
    if (selectAll) textarea.select();

    document.execCommand("copy");
    console.log(Constant.UI_EXEC_COPY_COMMAND);
    console.log(textarea.value);
}

function renderExportList() {
    if (exportList == null) {
        console.warn(Constant.UI_EXPORT_LIST_NOT_FOUND_NO_ALTERNATIVE);
        return;
    }

    console.log(Constant.UI_RENDER_EXPORT_LIST, curItems.map(item => item.name));
    exportList.innerHTML = curItems?.map((item, index) =>
        `<div class="export-list-item" data-index="${index}">${item.name}</div>`,
    ).join("") ?? "";
}

function renderExcelExportStr() {
    const lineStructures = curItems
        .map(item => new ExcelLineStruct(item));
    lineStructures.forEach(lineStructure => console.log(lineStructure.toString()));
    textarea.value = lineStructures
        .map(struct => struct.toString())
        .join("\n");
    textarea.select();
}

function selectLineInTextArea(index: number) {
    let start = 0;
    let end = -1;
    while (index-- >= 0) {
        start = end + 1;
        end = textarea.value.indexOf("\n", start);
        if (end === -1) {
            start = index > 0 ? -1 : start;
            break;
        }
    }

    textarea.select();
    textarea.focus();
    if (start === -1) {
        console.log(Constant.UI_CLEAR_TEXT_AREA_SELECTION);
        textarea.setSelectionRange(0, 0);
    } else {
        console.log(Constant.UI_SET_TEXT_AREA_SELECTION, start, ",", end);
        textarea.setSelectionRange(start, end);

        textarea.scrollTop = textarea.scrollHeight * (start / textarea.value.length);
        textarea.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }
}

function refreshItemInfo(prop: NodeProperty | undefined) {
    curSelect = prop ? curItems.indexOf(prop) : -1;
    if (previewNameTxt) previewNameTxt.value = prop?.name ?? "";
    if (previewTextTxt) {
        if (prop && "text" in prop) {
            previewTextTxt.value = prop.text as string;
            previewTextField.classList.remove("hidden");
        } else {
            previewTextTxt.value = "";
            previewTextField.classList.add("hidden");
        }
    }
    if (previewXTxt) previewXTxt.value = prop?.x.toString() ?? "";
    if (previewYTxt) previewYTxt.value = (prop?.y == undefined)
        ? ""
        : `${(prop.y - GlobalConfig.TOP_BAR_HEIGHT).toString()}(topbar ${GlobalConfig.TOP_BAR_HEIGHT}px)`;
    if (previewWidthTxt) previewWidthTxt.value = prop?.width.toString() ?? "";
    if (previewHeightTxt) previewHeightTxt.value = prop?.height.toString() ?? "";
}

function applyUpdate(type: UpdatableField, index: number, newValue: string) {
    const item = curItems[index];
    if (item == null) return;

    if (type === "name") {
        item.name = newValue;
    } else if (type === "text") {
        if ("text" in item) {
            item.text = newValue;
        }
    }
    renderExportList();
    renderExcelExportStr();

    console.log(Constant.UI_REPORT_UPDATE);
    parent.postMessage({pluginMessage: {type: "update", data: {type, index, newValue}}}, "*");
}