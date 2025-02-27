// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Runs this code if the plugin is run in Figma
import { hunter } from "./hunter/Hunter";

if (figma.editorType === "figma") {
    console.log("Hello, world.");

    figma.showUI(__html__, {width: 600, height: 400, themeColors: true});

    figma.ui.onmessage = (message) => {
        if (message.type === "close-ui") {
            figma.closePlugin("UI closed, plugin finished.");
        }
    };

    hunter();
}