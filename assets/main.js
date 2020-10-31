let inv = [];
let worldItems = [ 1, 1, 1, 1, 1, 1 ];
let itemTimer = 0;
let coinLock = 0;
let fireLock = 0;
let coinsDone = 0;
let wickDone = 0;
let codeDone = 0;
let voidDeep = 0;
let voidSide = 0;
let invsee = 0;
let prog = -1
let text = document.querySelector("#textArea");
let options = document.querySelector("#choiceArea");
let displayItems = document.querySelector("#inventory");
let inputText = document.querySelector("#input");

const storyData = {
	"-666": {
		"desc": [ "There are several points of interest around the room that seem worth checking out. Perhaps you can find something useful." ],
		"opt": [
			"Wall mounted mechanism",
			"Crawl space",
			"Cracked wall",
			"S̶̨͑͛ͅt̶͚̳̎ỏ̶͓p̷̣͈̀͐ ̵̱͚̒ť̵͙̍r̵̟̀͜y̸̩̙̾̇ì̸̘̃ǹ̷̯́g̶̢͛ ̵͙̀̈́t̵͎͕̄͋o̶̭̎͋ ̸̫͝ȩ̵͋ś̸̥͒c̷̩̼͒ä̷͉́p̶̖̾͑e̴̼͝"
		]
	},
	"-1": {
		"desc": [ "Guide: Click the buttons on the screen to choose your fate. Press the \"I\" button or key at any time to toggle the inventory view." ],
		"opt": [ "Begin" ]
	},
	"0": {
		"desc": [
			"You awake in a dark room. Every direction looks like an endless void except one, that which has a door dimly lit by candles mounted above.", 
			"Just as before, all this room contains is an endless void surrounding one lonely door with two candles gleaming above it."
		],
		"opt": [
			"Advance through the door", 
			"Take a candle",
			"Journey through the void"
		]
	},
	"2": {
		"desc": [ 
			"You try to escape the fate that lies beyond that door. You feel as though the morbidly dark void is safer. You try to distance yourself \
			but you notice the door never gets farther away from you. It is as if you haven't moved at all." 
		],
		"opt": [ "Give up" ]
	},
	"3": {
		"desc": [ "You come to a Victorian-esque room, lit much better than the dark room you woke up in. A large guilded door lies ahead of you." ],
		"opt": [
			"Try the door",
			"Inspect room",
			"Go back to the dark room"
		]
	},
	"4": {
		"desc": [ "You try to get through the door but you quickly find yourself stopped by a large lock which requires a key." ],
		"opt": [ "Go back" ]
	},
	"5": {
		"desc": [ 
			"After what felt like a never-ending nightmare, you insert the key into the lock and push through the door \
			which has locked you in this horrid place."
		],
		"opt": [ "Continue" ]
	},
	"6": {
		"desc": [ "There are several points of interest around the room that seem worth checking out. Perhaps you can find something useful." ],
		"opt": [
			"Wall mounted mechanism",
			"Crawl space",
			"Cracked wall",
			"Go back"
		]
	},
	"7": {
		"desc": [ 
			"You approach an other-worldly device attatched to the wall near the guilded door. It appears to have 5 round imprints, an unlit wick, and a \
			combination lock that requires a sequence of letters."
		],
		"opt": [
			"Enter code",
			"Go back"
		]
	},
	"8": {
		"desc": [ "You peer into a small dark opening in the wall to which you see no end. A cool breeze blows through it." ],
		"opt": [
			"Crawl through",
			"Go back, it's not worth it"
		]
	},
	"9": {
		"desc": [
			"You approach the corner of the wall which seems to be deteriorating. You push through the cobwebs and peer into the hallow cracks. \
			What you see in the cracks appears to be... Pulsating flesh. You get the feeling that it's staring back at you."
		],
		"opt": [ "Go back" ]
	},
	"10": {
		"desc": [ "You find yourself in the void illuminated by your candles sparse glow. May it guide you to whatever you seek..." ],
		"opt": [
			"Left",
			"Forward",
			"Right",
			"Backward"
		]
	},
	"11": {
		"desc": [ 
			"You crawl through and eventually reach the end of the tunnel. You appear in an empty cave. \
			The whole area is mysteriously lit by an unseen ambient blue light. You can't find anywhere else to explore in this cave." 
		],
		"opt": [ "Leave" ]
	},
	"12": {
		"desc": [
			"Your foot gets caught on something on the floor of this menacing void. You look down and bring your candle close to examine the markings beneath you. \
			As you wave your lanern across the darkness you make out the word \"Remember\"."
		],
		"opt": [ "Retreat to the light" ]
	}
};

const ending = [
	"You finally get your well deserved fresh air, and even the feeling of the warm sun beating down on your skin once again.",
	"Your mind begins to wonder about what awaits you now. What will you do? Where can you find help?",
	"All of those meaningless questions start fading away as your skin ignites, your flesh burning like acid as it melts off your bones.",
	"Before the sun sets, your body is nothing more than a lump of muddy remains. Unable to even be called as a corpse, let alone identified as one.",
	"Not much time remains until you will be waking up in that room again...",
	"Perhaps this time, you will listen to the signs you've left for yourself throughout all these years.",
	"The End"
];

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
					if (inv.includes("Empty Candelabra")) {
						text.textContent = "You quickly take one of the candles out of it's holder and insert it into your candelabra.";
						inv.splice(inv.indexOf("Empty Candelabra"), 1);
						addItem("Lit candle", 1);
					}
					else if (inv.includes("Lit candle")) {
						text.textContent = "Don't be greedy...";
					}
					else {
						text.textContent = "You attempt to take one of the candles but it's too hot to grab. Maybe if you could fine something to carry it in first.";
					}
					break;
				case 2:
					if (inv.includes("Lit candle")) {
						voidDeep = 1;
						voidSide = 0;
						advance(prog = 10, 0);

						if (worldItems[5]) {
							worldItems[5] = 0;
							addItem("Strange Coin", 1);
						}
					}
					else { advance(prog = 2, 0); }
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
					if (inv.includes("Guilded Key")) {
						inv.splice(inv.indexOf("Guilded Key"), 1);
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
					storyData[7].opt.splice(storyData[7].opt.indexOf("Light wick"), 1);
					advance(prog = 7, 0);
					text.textContent = "You light the wick using your candle, causing the machine to let out a satisfying hum.";
					wickDone = true;
					checkLock();
					break;
				case "Insert coins":
					storyData[7].opt.splice(storyData[7].opt.indexOf("Insert coins"), 1);
					advance(prog = 7, 0);
					text.textContent = "You insert the coins into the machine and they click into place.";
					coinsDone = true;
					checkLock();
					break;
				case "Enter code":
					inputText.style.display = "flex";
					options.style.display = "none";
					text.textContent = "You attempt to enter a code into the combination lock."
					break;
				case "Go back":
					Math.floor(Math.random() * 10) > 0 ? advance(prog = 6, 0) : advance(prog = -666, 0);
					break;
			}
			break;
		case 8:
			switch (x) {
				case 0:
					advance(prog = 11, 0);

					if (worldItems[3]) {
						worldItems[3] = 0;
						addItem("Empty Candelabra", 1);
					}
					break;
				case 1:
					Math.floor(Math.random() * 10) > 0 ? advance(prog = 6, 0) : advance(prog = -666, 0);
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
					text.textContent = "You take a few paces to the left.";
					voidSide--;
					voidMove();
					break;
				case 1:
					text.textContent = "You cautiously continue forward.";
					voidDeep++;
					voidMove();
					break;
				case 2:
					text.textContent = "You wander to the right.";
					voidSide++;
					voidMove();
					break;
				case 3:
					text.textContent = "You take a few steps back toward the light.";
					voidDeep--;
					voidMove();
					break;
			}
			break;
		case 11:
			switch (x) {
				case 0:
					Math.floor(Math.random() * 10) > 0 ? advance(prog = 6, 0) : advance(prog = -666, 0);

					if (worldItems[4]) {
						worldItems[4] = 0;
						addItem("Strange Coin", 1);
					}
					break;
			}
			break;
		case 12:
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

	for (opt in storyData[id]["opt"]) { options.innerHTML += tag(storyData[id]["opt"][opt], "div", "button", 0, `choice(${opt})`); }
}

// Inventory stuff
window.addEventListener("keydown", event => { 
	if (!event.repeat && event.key == "i") {
		inventory() 
	}
});

const inventory = function() {
	invsee = !invsee
	
	if (invsee) {
		let lastItem = null;
		let mult = 1;
		clearTimeout(itemTimer);

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

const addItem = function(item, amnt) {
	for (let i = 0; i < amnt; i++) {
		inv.push(item);
	}

	displayItems.textContent = `You found ${amnt} ${item}${(amnt > 1) ? "'s." : "."}`;
	displayItems.style.display = "block";
	
	clearTimeout(itemTimer);
	itemTimer = setTimeout(() => { displayItems.style.display = "none" }, 2500);

	if (!coinLock) {
		let totalCoins = 0;
		
		for (item of inv) {
			item == "Strange Coin" ? totalCoins++ : 0;
		}
		
		if (totalCoins >= 5) {
			storyData[7].opt.unshift("Insert coins");
			coinLock = true;
		}
	}

	if (!fireLock && inv.includes("Lit candle")) {
		storyData[7].opt.unshift("Light wick");
		fireLock = true;
	}
}

// Return string as an HTML element
const tag = function(str, tag, objClass = 0, objId = 0, choiceClick = 0) {
	return `<${tag} ${objClass ? ` class=${objClass}` : ""} ${objId ? ` id=${objId}` : ""} ${choiceClick ? ` onclick=${choiceClick}` : ""}>${str}</${tag}>`;
}

const checkLock = function() {
	if (coinsDone && !wickDone && !codeDone) {
		storyData[7].desc[0] = "You already inserted your coins into the machine. You still have to light the wick and solve the combination lock.";
	}
	else if (coinsDone && wickDone && !codeDone) {
		storyData[7].desc[0] = "You already inserted your coins into the machine and lit the wick. You just have to solve the combination lock.";
	}
	else if (coinsDone && !wickDone && codeDone) {
		storyData[7].desc[0] = "You already inserted your coins into the machine and solved the combination lock. You just have to light the wick.";
	}
	else if (!coinsDone && wickDone && !codeDone) {
		storyData[7].desc[0] = "You already lit the wick. You still have to solve the combination lock and fill the 5 round slots.";
	}
	else if (!coinsDone && wickDone && codeDone) {
		storyData[7].desc[0] = "You already lit the wick and solved the combination lock. There are still 5 round slots that must be filled.";
	}
	else if (!coinsDone && !wickDone && codeDone) {
		storyData[7].desc[0] = "You already completed the combination lock. You still have to light the wick and fill the 5 round slots.";
	}
	else if (coinsDone && wickDone && codeDone) {
		storyData[7].desc[0] = "Nothing left to do here.";
		text.textContent = "As you solve the last of this strange mechanisms secrets, it begins to shake and rumble before a small opening appears. \
		it promply drops a beautiful golden key on the ground in front of you.";
		addItem("Guilded Key", 1);
	}
}

const voidMove = function() {
	if (voidDeep == 5) {
		voidDeep = 4;
		text.textContent = "You've hit a dead end, perhaps secrets lie somewhere else in this darkness.";
	}
	if (voidDeep == 0) {
		advance(prog = 0, 1);
	}
	if (voidSide == -4 || voidSide == 4) {
		voidSide = voidSide == -4 ? -3 : 3;
		text.textContent = "You've hit a dead end, perhaps secrets lie somewhere else in this darkness.";
	}
	if (voidDeep == 3 && voidSide == -2) {
		advance(prog = 12, 0);
		addItem("Code: \"Remember\"", 1);
	}
}

const tryCode = function() {
	if (document.getElementById("inputArea").value.toUpperCase() == "REMEMBER") {
		storyData[7].opt.splice(storyData[7].opt.indexOf("Enter code"), 1);
		codeDone = true;
		advance(prog = 7, 0);
		text.textContent = "The combination lock started glowing as you clicked the last letter into place.";
		checkLock();
	}
	else {
		advance(prog = 7, 0);
		text.textContent = "Nothing happened when you entered the code.";
	}
	inputText.style.display = "none";
	options.style.display = "flex";
}

// Play ending sequence
const end = function(x = 0) {
	text.textContent = ending[x];
	options.innerHTML = x < ending.length - 1 ? tag("Next", "div", "button", 0, `end(${++x})`) : "";
}

advance(prog = -1, 0); 