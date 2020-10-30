let inv = [];
let invsee = 0;
let prog = -1
let text = document.querySelector("#textArea");
let options = document.querySelector("#choiceArea");
let displayItems = document.querySelector("#inventory");

const storyData = {
	"-1": {
		"desc": [ "Guide: Click the buttons on the screen to choose your fate. Press the \"I\" key at any time to toggle the inventory view." ],
		"opt": [ "Begin" ],
	},
	"0": {
		"desc": [
			"You awake in a dark room. Every direction looks like an endless void except one, that which has a door dimly lit by a candle mounted above.", 
			"Just as before, all this room contains is an endless void surrounding one lonely door."
		],
		"opt": [
			"Advance through the door", 
			"Journey through the void"
		],
	},
	"2": {
		"desc": [ 
			"You try to escape the fate that lies beyond that door. You feel as though the morbidly dark void is safer. You try to distance yourself \
			but you notice the door never gets farther away from you. It is as if you haven't moved at all." 
		],
		"opt": [ "Give up" ],
	}
};

const choice = function(x) {
	switch (prog) {
		case -1:
			switch (x) {
				case 0:
					advance(prog = 0, 0);
					break;
			}
			break;
		case 0: 
			switch (x) {
				case 0:
					advance(prog = 3, 0);
					break;
				case 1:
					advance(prog = 2, 0);
					break;
			}
		case 2:
			switch (x) {
				case 0:
					advance(prog = 0, 1);
					break;
			}
	}
}

// Load area area with a given modification
const advance = function(id, mod) {
	text.textContent = storyData[id]["desc"][mod];
	options.innerHTML = "";

	for (opt in storyData[id]["opt"]) { options.innerHTML += tag(storyData[id]["opt"][opt], "div", "button", 0, opt); }
}

// Inventory stuff
window.addEventListener("keydown", event => { 
	if (!event.repeat && event.key == "i") {
		invsee = !invsee
		
		if (invsee) {
			let lastItem = null;
			let mult = 1;

			text.style.display = "none";
			options.style.display = "none";
			displayItems.innerHTML = "<div style=\"margin-bottom: 3rem\">Inventory (press \"I\" to close)</div>";

			inv.sort();
			
			if (inv.length) {
				for (let i = 0; i < inv.length + 1; i++) {
					if (lastItem) {
						if (inv[i] == lastItem) { mult++; }
						else {
							if (inv[i]) {
								displayItems.innerHTML += ` (x${mult}), `;
								mult = 1;
								displayItems.innerHTML += inv[i];
								lastItem = inv[i];
							}
							else {
								displayItems.innerHTML += ` (x${mult}).`;
								console.log("test");
							}
						}
					}
					else {
						displayItems.innerHTML += inv[i];
						lastItem = inv[i];
					}
				}
			}
			else { displayItems.innerHTML += "You have no items."; }
			
			displayItems.style.display = "block";
		}
		else {
			text.style.display = "block";
			options.style.display = "flex";
			displayItems.style.display = "none";
		}
	}
});

// Return string as an HTML element
const tag = function(str, tag, objClass = 0, objId = 0, choiceClick = 0) {
	return `<${tag} ${objClass ? ` class=${objClass}` : ""} ${objId ? ` id=${objId}` : ""} ${choiceClick ? ` onclick=choice(${choiceClick})` : ""}>${str}</${tag}>`;
}

// Game reset
const init = function() { advance(prog = -1, 0); }

init();