import LogConstant from "./config/LogConstant";

console.log("Champion Hunter | UI Loading...");

let textarea: HTMLTextAreaElement;
let copyBtn: HTMLButtonElement;
let copySelectionButton: HTMLButtonElement;
let exportList: HTMLElement;

window.onload = (_) => {
    console.log("Champion Hunter | UI Loaded.");
    const textareaElement = document.getElementById("previewArea");
    if (textareaElement == null) {
        console.warn("previewArea not found. Creating a new one.");
        textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
    } else {
        textarea = (textareaElement as HTMLTextAreaElement);
    }
    textarea.placeholder = LogConstant.NO_SELECT_NODE_WARNING;

    const copyButtonElement = document.getElementById("copyButton");
    if (copyButtonElement == null) {
        console.warn("copyButton not found. Creating a new one.");
        copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy All to Clipboard";
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
        console.warn("copySelectionButton not found. Creating a new one.");
        copySelectionButton = document.createElement("button");
        copySelectionButton.innerText = "Copy Selection to Clipboard (Ctrl+C)";
        document.body.appendChild(copySelectionButton);
    } else {
        copySelectionButton = (copySelectionButtonElement as HTMLButtonElement);
    }
    copySelectionButton.onclick = (_) => {
        execCopy(textarea, false);
    };

    const exportListElement = document.getElementById("exportList");
    if (exportListElement == null) {
        console.warn("exportList not found.");
    } else {
        exportList = exportListElement;
        exportList.addEventListener("click", (event) => {
                const target = event.target;
                if (target instanceof HTMLElement && target.classList.contains("export-list-item")) {
                    const index = target.getAttribute("data-index");
                    if (index != null) {
                        console.log("export-list-item clicked. index:", index);
                        selectLineInTextArea(parseInt(index));
                    } else {
                        console.log("export-list-item clicked. index not found.");
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
            textarea.value = text;
            if (itemNameList != null && Array.isArray(itemNameList)) {
                console.log("itemNames found. rendering export list.");
                renderExportList(itemNameList);
            }
            textarea.select();
            console.log("textarea selected.");
        } catch (error) {
            console.error("Failed to copy text:", error);
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
    if (selectAll) {
        textarea.select();
    }
    document.execCommand("copy");
    console.log("copy command executed. content:");
    console.log(textarea.value);
}

function renderExportList(items: string[]) {
    if (exportList != null) {
        exportList.innerHTML += items.map((item, index) =>
            `<div class="export-list-item" data-index="${index}">${item}</div>`,
        ).join("");
    } else {
        console.warn("exportList not found.");
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
        console.log("clear range.");
        textarea.setSelectionRange(0, 0);
    } else {
        console.log("set range:", start, ",", end);
        textarea.setSelectionRange(start, end);

        textarea.scrollTop = textarea.scrollHeight * (start / textarea.value.length);
        textarea.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }
}
