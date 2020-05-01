const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        doneButton: "",
        inputBox: "",
        currentSelectedCoord: "",
        keydownEvent: null,
        doneEvent: null
    },
    keyCoords: { // x y 
        "0,0": "1",
        "1,0": "2",
        "2,0": "3",
        "3,0": "4",
        "4,0": "5",
        "5,0": "6",
        "6,0": "7",
        "7,0": "8",
        "8,0": "9",
        "9,0": "0",
       "10,0": "backspace",
        "0,1": "!",
        "1,1": "q",
        "2,1": "w",
        "3,1": "e",
        "4,1": "r",
        "5,1": "t",
        "6,1": "y",
        "7,1": "u",
        "8,1": "i",
        "9,1": "o",
       "10,1": "p",
        "0,2": "caps",
        "1,2": "a",
        "2,2": "s",
        "3,2": "d",
        "4,2": "f",
        "5,2": "g",
        "6,2": "h",
        "7,2": "j",
        "8,2": "k",
        "9,2": "l",
       "10,2": "done",
        "0,3": "@",
        "1,3": "z",
        "2,3": "x",
        "3,3": "c",
        "4,3": "v",
        "5,3": "b",
        "6,3": "n",
        "7,3": "m",
        "8,3": ",",
        "9,3": ".",
       "10,3": "?",
       "0,4": "space",
       "1,4": "space",
       "2,4": "space",
       "3,4": "space",
       "4,4": "space",
       "5,4": "space",
       "6,4": "space",
       "7,4": "space",
       "8,4": "space",
       "9,4": "space",
       "10,4": "space"
   },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
       // document.querySelectorAll(".use-keyboard-input").forEach(element => {
       //     element.addEventListener("focus", () => {
       //         this.open(element.value, currentValue => {
       //             element.value = currentValue;
       //         });
       //     });
      //  });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "!", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "done",
            "@", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];
        

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "done", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.id = "backspace";
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        document.getElementById(this.properties.inputBox).value = this.properties.value;
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.id = "caps";
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    keyElement.id = "space";
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        document.getElementById(this.properties.inputBox).value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");
                    keyElement.id = "done";
                    keyElement.addEventListener("click", () => {                        
                        if(this.properties.doneEvent()){
                            console.log("Legal Input, Closing Keyboard, and Clicking Done")
                            document.getElementById(this.properties.doneButton).click();
                            this.close();
                        }
                        
                        
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        document.getElementById(this.properties.inputBox).value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        if(this.properties.keydownEvent != null){
                            //console.log(this.properties.keydownEvent)
                            this.properties.keydownEvent();
                        }
                    });
                    keyElement.id = key;
                    
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(textBox, localDoneButton, keyEvent, inputCheck) { // KeyEvent is optional
        this.properties.value = document.getElementById(textBox).value;
        this.properties.inputBox = textBox;
        this.properties.doneButton = localDoneButton;
        this.properties.currentSelectedCoord = "5,2";
        this.properties.keydownEvent = keyEvent;
        this.properties.doneEvent = inputCheck;
        console.log("Keyboard Opening with following properties:\ninputBox: " + this.properties.inputBox + "\ndoneButton: " + this.properties.doneButton);
        this._setInputListener();
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this._removeInputListener();
        this.properties.value = "";
        this.properties.inputBox = "";
        this.properties.doneButton = "";
        this.properties.currentSelectedCoord = "";
        
        this.elements.main.classList.add("keyboard--hidden");
    },

    _setInputListener() {
        document.addEventListener("keydown", this._checkKey)
        console.log("Setting: " + this.properties.currentSelectedCoord)
        document.getElementById(this.keyCoords[this.properties.currentSelectedCoord]).classList.add("keyboard__key--focused");
    },

    _removeInputListener(){
        document.removeEventListener("keydown", this._checkKey)
        document.getElementById(this.keyCoords[this.properties.currentSelectedCoord]).classList.remove("keyboard__key--focused");
    },
    

    _acceptInput(input){
        console.log(input);
    },

    _checkKey(e) {
        e = e || window.event;
        // Get XY Coords
        let x = Keyboard.properties.currentSelectedCoord.split(",")[0];
        let y = Keyboard.properties.currentSelectedCoord.split(",")[1];

        if (e.keyCode == '38') {
            // up arrow
            
            if(y == 0){
                return;
            }
            
            document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.remove("keyboard__key--focused");
            
            y--;
            
            document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.remove("keyboard__key--focused");
            Keyboard.properties.currentSelectedCoord = (x + "," + y);
            document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.add("keyboard__key--focused");
            //console.log("Changed Coord to: " + Keyboard.properties.currentSelectedCoord)
        }
        else if (e.keyCode == '40') {
            // down arrow
            if(y == 4){
                return;
            }
            y++;
            document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.remove("keyboard__key--focused");
            Keyboard.properties.currentSelectedCoord = (x + "," + y);
            
            document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.add("keyboard__key--focused");
            //console.log("Changed Coord to: " + Keyboard.properties.currentSelectedCoord)
            
        }
        else if (e.keyCode == '37') {
        // left arrow
        if(x == 0){
            return;
        }
        x--;
        document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.remove("keyboard__key--focused");
        Keyboard.properties.currentSelectedCoord = (x + "," + y);
        document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.add("keyboard__key--focused");
        //console.log("Changed Coord to: " + Keyboard.properties.currentSelectedCoord)
        }
        else if (e.keyCode == '39') {
        // right arrow
        if(x == 10){
            return;
        }
        x++;
        document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.remove("keyboard__key--focused");
        Keyboard.properties.currentSelectedCoord = (x + "," + y);
        document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).classList.add("keyboard__key--focused");
        //console.log("Changed Coord to: " + Keyboard.properties.currentSelectedCoord)
        }
        else if (e.keyCode == '13'){
            // Enter
            document.getElementById(Keyboard.keyCoords[Keyboard.properties.currentSelectedCoord]).click();
        }
        

    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});