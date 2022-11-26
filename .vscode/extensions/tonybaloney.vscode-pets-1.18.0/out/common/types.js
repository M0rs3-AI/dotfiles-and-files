"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_THEMES = exports.ALL_SCALES = exports.ALL_COLORS = exports.ALL_PETS = exports.WebviewMessage = void 0;
class WebviewMessage {
    text;
    command;
    constructor(text, command) {
        this.text = text;
        this.command = command;
    }
}
exports.WebviewMessage = WebviewMessage;
exports.ALL_PETS = [
    "cat" /* PetType.cat */,
    "clippy" /* PetType.clippy */,
    "cockatiel" /* PetType.cockatiel */,
    "crab" /* PetType.crab */,
    "dog" /* PetType.dog */,
    "mod" /* PetType.mod */,
    "rocky" /* PetType.rocky */,
    "rubber-duck" /* PetType.rubberduck */,
    "snake" /* PetType.snake */,
    "totoro" /* PetType.totoro */,
    "zappy" /* PetType.zappy */,
];
exports.ALL_COLORS = [
    "black" /* PetColor.black */,
    "brown" /* PetColor.brown */,
    "green" /* PetColor.green */,
    "yellow" /* PetColor.yellow */,
    "gray" /* PetColor.gray */,
    "purple" /* PetColor.purple */,
    "red" /* PetColor.red */,
    "white" /* PetColor.white */,
    "null" /* PetColor.null */,
];
exports.ALL_SCALES = ["nano" /* PetSize.nano */, "medium" /* PetSize.medium */, "large" /* PetSize.large */];
exports.ALL_THEMES = ["none" /* Theme.none */, "forest" /* Theme.forest */, "castle" /* Theme.castle */, "beach" /* Theme.beach */];
//# sourceMappingURL=types.js.map