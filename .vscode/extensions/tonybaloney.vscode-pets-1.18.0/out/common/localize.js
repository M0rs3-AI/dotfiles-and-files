"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringListAsQuickPickItemList = exports.TranslatedQuickPickItem = exports.localize = exports.activate = void 0;
const i18n = require("vscode-nls-i18n");
function activate(context) {
    i18n.init(context.extensionPath);
}
exports.activate = activate;
function localize(key, params) {
    return i18n.localize(`vscodePets.${key}`, params);
}
exports.localize = localize;
class TranslatedQuickPickItem {
    label;
    value;
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
exports.TranslatedQuickPickItem = TranslatedQuickPickItem;
function stringListAsQuickPickItemList(collection) {
    return collection.map((el) => {
        return { label: localize(String(el), el), value: el };
    });
}
exports.stringListAsQuickPickItemList = stringListAsQuickPickItemList;
//# sourceMappingURL=localize.js.map