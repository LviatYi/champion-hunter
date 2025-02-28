import Constant from "./config/Constant";

console.log(Constant.UI_LOADING);

let textarea: HTMLTextAreaElement;
let copyBtn: HTMLButtonElement;
let copySelectionButton: HTMLButtonElement;
let exportList: HTMLElement;

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
        setTimeout(() => {
            parent.postMessage({pluginMessage: {type: "done"}}, "*");
        }, 0.25e3);
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
                        selectLineInTextArea(parseInt(index));
                    } else {
                        console.warn(Constant.UI_EXPORT_LIST_ITEM_NOT_FOUND);
                    }
                }
            },
        );
    }
};

window.onmessage = async (event) => {
    const {type, text, itemNameList} = event.data.pluginMessage;
    if (type === "copyToClipboard") {
        try {
            console.log(Constant.UI_RENDER_TEXT_AREA, text);
            textarea.value = text;
            if (itemNameList != null && Array.isArray(itemNameList)) {
                console.log(Constant.UI_RENDER_EXPORT_LIST, itemNameList);
                renderExportList(itemNameList);
            }
            textarea.select();
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

function renderExportList(items: string[]) {
    if (exportList != null) {
        exportList.innerHTML += items.map((item, index) =>
            `<div class="export-list-item" data-index="${index}">${item}</div>`,
        ).join("");
    } else {
        console.warn(Constant.UI_EXPORT_LIST_NOT_FOUND_NO_ALTERNATIVE);
    }
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
