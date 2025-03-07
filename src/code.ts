// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Runs this code if the plugin is run in Figma
import { hunter, UpdatableField, updateField } from "./hunter/Hunter";
import Constant from "./config/Constant";
import EventName from "./config/EventName";

if (figma.editorType === "figma") {
    console.log(Constant.WELCOME_TO_CHAMPION_HUNTER);

    figma.showUI(__html__, {width: 600, height: 400, themeColors: true});

    figma.ui.onmessage = (message) => {
        if (message.type === "close-ui") {
            figma.closePlugin(Constant.PLUGIN_FINISHED_BY_UI_CLOSED);
        } else if (message.type === EventName.UPDATED_BY_UI) {
            console.log(Constant.HUNTER_RECEIVE_UPDATE, message.data);
            const {type, index, newValue} = message.data as { type: UpdatableField, index: number, newValue: string };
            updateField(type, index, newValue);
        }
    };

    hunter();

    figma.on("selectionchange", () => {
        hunter();
    });
}