let w = "w";
w.toLowerCase();
w.toUpperCase();
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },
  properties: {
    value: "",
    capsLock: false,
  },
  init() {
    //   Creat Main Element
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    //   Setup Main Element
    this.elements.main.classList.add("keyboard", "keyboard-hidden");
    this.elements.keysContainer.classList.add("keyboard-keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");
    //   Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automaticlly use keyboard for elements with .user-input
    document.querySelectorAll(".user-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentvalue) => {
          element.value = currentvalue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];
    //   Creates HTML for an icon
    const createIconsHTML = (icone_name) => {
      return `<i class="material-icons">${icone_name}</i>`;
    };
    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const inserLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add Atrrbuites/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("key");
      switch (key) {
        case "backspace":
          keyElement.classList.add("key-wide");
          keyElement.innerHTML = createIconsHTML("backspace");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._tiggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add("key-wide", "key-activatable");
          keyElement.innerHTML = createIconsHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLoack();
            keyElement.classList.toggle("key-active", this.properties.capsLock);
          });
          break;

        case "enter":
          keyElement.classList.add("key-wide");
          keyElement.innerHTML = createIconsHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._tiggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("key-extra-wide");
          keyElement.innerHTML = createIconsHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._tiggerEvent("oninput");
          });
          break;

        case "done":
          keyElement.classList.add("key-wide", "key-dark");
          keyElement.innerHTML = createIconsHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._tiggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._tiggerEvent("oninput");
            //         45:15
          });
          break;
      }
      fragment.appendChild(keyElement);
      if (inserLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  _tiggerEvent(handlerName) {
    // console.log("Event Triggered! Event Name : " + handlerName);
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLoack() {
    this.properties.capsLock = !this.properties.capsLock;
    for (let key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard-hidden");
  },
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard-hidden");
  },
};
window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
  // Keyboard.open(
  //   "dcode",
  //   function (currentValue) {
  //     console.log("value changed here it is : " + currentValue);
  //   },
  //   function (currentValue) {
  //     console.log("Keyboard Closed Finshing Value : " + currentValue);
  //   }
  // );
});
