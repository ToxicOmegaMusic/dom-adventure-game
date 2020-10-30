let inv = [];
let worldItems = [ 1, 1, 1 ];
let itemTimer = 0;
let coinLock = 0;
let fireLock = 0;
let coinsDone = 0;
let wickDone = 0;
let codeDone = 0;

let invsee = 0;
let prog = -1
let text = document.querySelector("#textArea");
let options = document.querySelector("#choiceArea");
let displayItems = document.querySelector("#inventory");

const storyData = {
	"-666": {
		"desc": [ "There are several points of interest around the room that seem worth checking out. Perhaps you can find something useful." ],
		"opt": [
			"Wall mounted mechanism",
			"Crawl space",
			"Cracked wall",
			"S̶̨͑͛ͅt̶͚̳̎ỏ̶͓p̷̣͈̀͐ ̵̱͚̒ť̵͙̍r̵̟̀͜y̸̩̙̾̇ì̸̘̃ǹ̷̯́g̶̢͛ ̵͙̀̈́t̵͎͕̄͋o̶̭̎͋ ̸̫͝ȩ̵͋ś̸̥͒c̷̩̼͒ä̷͉́p̶̖̾͑e̴̼͝",
		],
	},
	"-1": {
		"desc": [ "Guide: Click the buttons on the screen to choose your fate. Press the \"I\" key at any time to toggle the inventory view." ],
		"opt": [ "Begin" ],
	},
	"0": {
		"desc": [
			"You awake in a dark room. Every direction looks like an endless void except one, that which has a door dimly lit by a candle mounted above.", 
			"Just as before, all this room contains is an endless void surrounding one lonely door with a candle gleaming above it."
		],
		"opt": [
			"Advance through the door", 
			"Journey through the void",
		],
	},
	"2": {
		"desc": [ 
			"You try to escape the fate that lies beyond that door. You feel as though the morbidly dark void is safer. You try to distance yourself \
			but you notice the door never gets farther away from you. It is as if you haven't moved at all." 
		],
		"opt": [ "Give up" ],
	},
	"3": {
		"desc": [ "You come to a Victorian-esque room, lit much better than the dark room you woke up in. A large guilded door lies ahead of you." ],
		"opt": [
			"Try the door",
			"Inspect room",
			"Go back to the dark room",
		],
	},
	"4": {
		"desc": [ "You try to get through the door but you quickly find yourself stopped by a large lock which requires a key." ],
		"opt": [ "Go back" ],
	},
	"5": {
		"desc": [ 
			"After what felt like a never-ending nightmare, you insert the key into the lock and push through the door \
			which has locked you in this horrid place."
	],
		"opt": [ "Continue" ],
	},
	"6": {
		"desc": [ "There are several points of interest around the room that seem worth checking out. Perhaps you can find something useful." ],
		"opt": [
			"Wall mounted mechanism",
			"Crawl space",
			"Cracked wall",
			"Go back",
		],
	},
	"7": {
		"desc": [ 
			"You approach an other-worldly device attatched to the wall near the guilded door. It appears to have 3 round imprints, an unlit wick, and a \
			combination lock that requires a sequence of letters."
		],
		"opt": [
			"Enter code",
			"Go back",
		],
	},
	"8": {
		"desc": [ "CRAWL" ],
		"opt": [
			"",
			"",
			"",
			"",
		],
	},
	"9": {
		"desc": [
			"You approach the corner of the wall which seems to be deteriorating. You push through the cobwebs and peer into the hallow cracks. \
			What you see in the cracks appears to be... Pulsating flesh. You get the feeling that it's staring back at you."
		],
		"opt": [ "Go back" ],
	},
	"10": {
		"desc": [ "ADVANCED DARKNESS" ],
		"opt": [
			"",
			"",
			"",
			"",
		],
	},
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

					if (worldItems[0]) {
						worldItems[0] = 0;
						addItem("Strange Coin", 1);
					}
					break;
				case 1:
					advance(prog = 2, 0);
					break;
			}
			break;
		case 2:
			switch (x) {
				case 0:
					advance(prog = 0, 1);
					break;
			}
			break;
		case 3:
			switch (x) {
				case 0:
					if (inv.includes("Key")) {
						inv.splice(inv.indexOf("Key"), 1);
						advance(prog = 5, 0);
					}
					else { advance(prog = 4, 0); }
					break;
				case 1:
					Math.floor(Math.random() * 10) > 0 ? advance(prog = 6, 0) : advance(prog = -666, 0);
					break;
				case 2:
					advance(prog = 0, 1)
					break;
			}
			break;
		case 4:
			switch (x) {
				case 0:
					advance(prog = 3, 0);
					break;
			}
			break;
		case 5:
			switch (x) {
				case 0:
					end();
					break;
			}
			break;
		case -666:
			if (worldItems[2]) {
				worldItems[2] = 0;
				addItem("Y̴̭̊̋Ȍ̸̡̗Û̵͇͉̭͠ ̸̰̰̄C̵͉̖̈́Ả̴̡̜̭̽̕N̵̥̽ ̸̨̰͝N̶͙̊O̷̺̲̅͜T̵̤͂̎̒ ̸̫͗̆L̶͎̤̘͊̿̑É̵̛̙̩͍̑Ä̷̜̿̿V̶̼̩̐͌Ē̸̘͎̖", 666);
			}
		case 6:
			switch (x) {
				case 0:
					advance(prog = 7, 0);
					break;
				case 1:
					advance(prog = 8, 0);
					break;
				case 2:
					advance(prog = 9, 0);
					break;
				case 3:
					advance(prog = 3, 0);
					break;
			}
			break;
		case 7:
			switch (storyData[7].opt[x]) {
				case "Light wick":

					break;
				case "Insert coins":
					text.textContent = "You insert the coins into the machine and they click into place.";
					coinsDone = true;
					checkLock();
					break;
				case "Enter code":
					
					break;
				case "Go back":
					Math.floor(Math.random() * 10) > 0 ? advance(prog = 6, 0) : advance(prog = -666, 0);
					break;
			}
			break;
		case 8:
			switch (x) {
				case 0:
					
					break;
			}
			break;
		case 9:
			switch (x) {
				case 0:
					Math.floor(Math.random() * 10) > 0 ? advance(prog = 6, 0) : advance(prog = -666, 0);
					
					if (worldItems[1]) {
						worldItems[1] = 0;
						addItem("Strange Coin", 2);
					}
					break;
			}
			break;
		case 10:
			switch (x) {
				case 0:
					
					break;
			}
			break;
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

const addItem = function(item, amnt) {
	for (let i = 0; i < amnt; i++) {
		inv.push(item);
	}

	displayItems.textContent = `You found ${amnt} ${item}${(amnt > 1) ? "'s." : "."}`;
	displayItems.style.display = "block";
	
	clearTimeout(itemTimer);
	itemTimer = setTimeout(() => { displayItems.style.display = "none" }, 2500);

	if (!coinLock && worldItems[0] == 0 && worldItems[1] == 0) {
		storyData[7].opt.unshift("Insert coins");
		coinLock = true;
	}
}

// Return string as an HTML element
const tag = function(str, tag, objClass = 0, objId = 0, choiceClick = 0) {
	return `<${tag} ${objClass ? ` class=${objClass}` : ""} ${objId ? ` id=${objId}` : ""} ${choiceClick ? ` onclick=choice(${choiceClick})` : ""}>${str}</${tag}>`;
}

const checkLock = function() {
	if (coinsDone && !wickDone && !codeDone) {
		storyData[7].desc[0] = "ONLY COINS DONE";
	}
	else if (coinsDone && wickDone && !codeDone) {
		storyData[7].desc[0] = "COINS AND WICK DONE";
	}
	else if (coinsDone && !wickDone && codeDone) {
		storyData[7].desc[0] = "COINS AND CODE DONE";
	}
	else if (!coinsDone && wickDone && !codeDone) {
		storyData[7].desc[0] = "ONLY WICK DONE";
	}
	else if (!coinsDone && wickDone && codeDone) {
		storyData[7].desc[0] = "WICK AND CODE DONE";
	}
	else if (!coinsDone && !wickDone && codeDone) {
		storyData[7].desc[0] = "ONLY CODE DONE";
	}
}

// Game reset
const init = function(x) {
	// worldItems = [ 1, 1, 1 ];	// UPDATE ME
	coinLock = 0;
	fireLock = 0;
	coinsDone = 0;
	wickDone = 0;
	codeDone = 0;
	clearTimeout(itemTimer);
	displayItems.style.display = "none";
	x ? inv = [] : 0 ;
	advance(prog = -1, 0); 
}

// Play ending sequence
const end = function() {
	text.innerHTML = "END SCREEN";
	options.innerHTML = "";
};

init(0);