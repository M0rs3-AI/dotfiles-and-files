"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPet = exports.InvalidPetException = exports.PetCollection = exports.PetElement = void 0;
const cat_1 = require("./pets/cat");
const clippy_1 = require("./pets/clippy");
const cockatiel_1 = require("./pets/cockatiel");
const crab_1 = require("./pets/crab");
const dog_1 = require("./pets/dog");
const mod_1 = require("./pets/mod");
const rocky_1 = require("./pets/rocky");
const rubberduck_1 = require("./pets/rubberduck");
const snake_1 = require("./pets/snake");
const totoro_1 = require("./pets/totoro");
const zappy_1 = require("./pets/zappy");
class PetElement {
    el;
    collision;
    speech;
    pet;
    color;
    type;
    remove() {
        this.el.remove();
        this.collision.remove();
        this.speech.remove();
        this.color = "null" /* PetColor.null */;
        this.type = "null" /* PetType.null */;
    }
    constructor(el, collision, speech, pet, color, type) {
        this.el = el;
        this.collision = collision;
        this.speech = speech;
        this.pet = pet;
        this.color = color;
        this.type = type;
    }
}
exports.PetElement = PetElement;
class PetCollection {
    _pets;
    constructor() {
        this._pets = new Array(0);
    }
    get pets() {
        return this._pets;
    }
    push(pet) {
        this._pets.push(pet);
    }
    reset() {
        this._pets.forEach((pet) => {
            pet.remove();
        });
        this._pets = [];
    }
    locate(name) {
        return this._pets.find((collection) => {
            return collection.pet.name === name;
        });
    }
    remove(name) {
        this._pets.forEach((pet) => {
            if (pet.pet.name === name) {
                pet.remove();
            }
        });
        this._pets = this._pets.filter((pet) => {
            return pet.pet.name !== name;
        });
    }
    seekNewFriends() {
        if (this._pets.length <= 1) {
            return [];
        } // You can't be friends with yourself.
        var messages = new Array(0);
        this._pets.forEach((petInCollection) => {
            if (petInCollection.pet.hasFriend) {
                return;
            } // I already have a friend!
            this._pets.forEach((potentialFriend) => {
                if (potentialFriend.pet.hasFriend) {
                    return;
                } // Already has a friend. sorry.
                if (!potentialFriend.pet.canChase) {
                    return;
                } // Pet is busy doing something else.
                if (potentialFriend.pet.left > petInCollection.pet.left &&
                    potentialFriend.pet.left <
                        petInCollection.pet.left + petInCollection.pet.width) {
                    // We found a possible new friend..
                    console.log(petInCollection.pet.name, ' wants to be friends with ', potentialFriend.pet.name, '.');
                    if (petInCollection.pet.makeFriendsWith(potentialFriend.pet)) {
                        potentialFriend.pet.showSpeechBubble('❤️', 2000);
                        petInCollection.pet.showSpeechBubble('❤️', 2000);
                    }
                }
            });
        });
        return messages;
    }
}
exports.PetCollection = PetCollection;
class InvalidPetException {
    message;
    constructor(message) {
        this.message = message;
    }
}
exports.InvalidPetException = InvalidPetException;
function createPet(petType, el, collision, speech, size, left, bottom, petRoot, floor, name) {
    if (name === undefined || name === null || name === '') {
        throw new InvalidPetException('name is undefined');
    }
    const standardPetArguments = [el, collision, speech, size, left, bottom, petRoot, floor, name];
    switch (petType) {
        case "cat" /* PetType.cat */:
            return new cat_1.Cat(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "dog" /* PetType.dog */:
            return new dog_1.Dog(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "crab" /* PetType.crab */:
            return new crab_1.Crab(...standardPetArguments, 2 /* PetSpeed.slow */);
        case "clippy" /* PetType.clippy */:
            return new clippy_1.Clippy(...standardPetArguments, 2 /* PetSpeed.slow */);
        case "mod" /* PetType.mod */:
            return new mod_1.Mod(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "totoro" /* PetType.totoro */:
            return new totoro_1.Totoro(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "snake" /* PetType.snake */:
            return new snake_1.Snake(...standardPetArguments, 1 /* PetSpeed.verySlow */);
        case "rubber-duck" /* PetType.rubberduck */:
            return new rubberduck_1.RubberDuck(...standardPetArguments, 4 /* PetSpeed.fast */);
        case "zappy" /* PetType.zappy */:
            return new zappy_1.Zappy(...standardPetArguments, 5 /* PetSpeed.veryFast */);
        case "rocky" /* PetType.rocky */:
            return new rocky_1.Rocky(...standardPetArguments, 0 /* PetSpeed.still */);
        case "cockatiel" /* PetType.cockatiel */:
            return new cockatiel_1.Cockatiel(...standardPetArguments, 3 /* PetSpeed.normal */);
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}
exports.createPet = createPet;
//# sourceMappingURL=pets.js.map