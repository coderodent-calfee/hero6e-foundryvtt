export const HERO = {};

HERO.bool = {
    "true": "True",
    "false": "False",
};

HERO.extraDice = {
    "zero": "+0",
    "pip": "+1",
    "half": "+1/2D6",
};

HERO.attacksWith = {
    "ocv": "OCV",
    "omcv": "OMCV",
};

HERO.defendsWith = {
    "dcv": "DCV",
    "dmcv": "DMCV",
};

HERO.defenseTypes = {
    "pd": "Physical Defense",
    "ed": "Energy Defense",
    "md": "Mental Defense",
    "rpd": "Resistant PD",
    "red": "Resistant ED",
    "rmd": "Resistant MD",
    "drp": "Damage Reduction Physical",
    "dre": "Damage Reduction Energy",
    "drm": "Damage Reduction Mental",
    "dnp": "Damage Negation Physical",
    "dne": "Damage Negation Energy",
    "dnm": "Damage Negation Mental",
    "powd": "Power Defense",
    "kbr": "Knockback Resistance",
    "fd": "Flash Defense",
    "br": "Barrier",
    "df": "Deflection"
};

HERO.defenseTypes5e = {
    "pd": "Physical Defense",
    "ed": "Energy Defense",
    "md": "Mental Defense",
    "rpd": "Resistant PD",
    "red": "Resistant ED",
    "rmd": "Resistant MD",
    "drp": "Damage Reduction Physical",
    "dre": "Damage Reduction Energy",
    "drm": "Damage Reduction Mental",
    "dnp": "Damage Negation Physical",
    "dne": "Damage Negation Energy",
    "dnm": "Damage Negation Mental",
    "powd": "Power Defense",
    "kbr": "Knockback Resistance",
    "fd": "Flash Defense",
    "br": "Barrier",
    "df": "Deflection",
    "low": "Lack of Weakness"
};

HERO.attackClasses = {
    "physical": "Physical",
    "energy": "Energy",
    "mental": "Mental"
};

// HERO.characteristics = {
//     "str": "STR",
//     "dex": "DEX",
//     "con": "CON",
//     "int": "INT",
//     "ego": "EGO",
//     "pre": "PRE",
//     "ocv": "OCV",
//     "dcv": "DCV",
//     "omcv": "OMCV",
//     "dmcv": "DMCV",
//     "spd": "SPD",
//     "pd": "PD",
//     "ed": "ED",
//     "rec": "REC",
//     "end": "END",
//     "body": "BODY",
//     "stun": "STUN",
//     "running": "Running",
//     "swimming": "Swimming",
//     "leaping": "Leaping",
//     "flight": "Flight",
//     "swinging": "Swinging",
//     "teleportation": "Teleportation",
//     "tunneling": "Tunneling",
//     "basesize": "Base Size",
// };

// HERO.characteristics5e = {
//     "str": "STR",
//     "dex": "DEX",
//     "con": "CON",
//     "body": "BODY",
//     "int": "INT",
//     "ego": "EGO",
//     "pre": "PRE",
//     "com": "COM",
//     "pd": "PD",
//     "ed": "ED",
//     "spd": "SPD",
//     "rec": "REC",
//     "end": "END",
//     "stun": "STUN",
//     "ocv": "OCV",
//     "dcv": "DCV",
//     "omcv": "OMCV",
//     "dmcv": "DMCV",
//     "running": "Running",
//     "swimming": "Swimming",
//     "leaping": "Leaping",
//     "flight": "Flight",
//     "swinging": "Swinging",
//     "teleportation": "Teleportation",
//     "tunneling": "Tunneling",
//     "basesize": "Base Size",
// };

// HERO.characteristicDefaults = {
//     "str": 10,
//     "dex": 10,
//     "con": 10,
//     "int": 10,
//     "ego": 10,
//     "pre": 10,
//     "com": 10,
//     "ocv": 3,
//     "dcv": 3,
//     "omcv": 3,
//     "dmcv": 3,
//     "spd": 2,
//     "pd": 2,
//     "ed": 2,
//     "rec": 4,
//     "end": 20,
//     "body": 10,
//     "stun": 20,
//     "running": 12,
//     "swimming": 4,
//     "leaping": 4,
//     "flight": 0,
//     "swinging": 0,
//     "teleportation": 0,
//     "tunneling": 0,
//     "basesize": 0,
// };

// HERO.characteristicDefaults5e = {
//     "str": 10,
//     "dex": 10,
//     "con": 10,
//     "int": 10,
//     "ego": 10,
//     "pre": 10,
//     "com": 10,
//     "ocv": 3,
//     "dcv": 3,
//     "omcv": 3,
//     "dmcv": 3,
//     "spd": 2,
//     "pd": 2,
//     "ed": 2,
//     "rec": 4,
//     "end": 20,
//     "body": 10,
//     "stun": 20,
//     "running": 6,
//     "swimming": 2,
//     "leaping": 1,
//     "flight": 0,
//     "swinging": 0,
//     "teleportation": 0,
//     "tunneling": 0,
//     "basesize": 0,
// };

// HERO.characteristicCosts = {
//     "str": 1,
//     "dex": 2,
//     "con": 1,
//     "int": 1,
//     "ego": 1,
//     "pre": 1,
//     "ocv": 5,
//     "dcv": 5,
//     "omcv": 3,
//     "dmcv": 3,
//     "spd": 10,
//     "pd": 1,
//     "ed": 1,
//     "rec": 1,
//     "end": 1 / 5,
//     "body": 1,
//     "stun": 1 / 2,
//     "running": 1,
//     "swimming": 1 / 2,
//     "leaping": 1 / 2,
//     "flight": 1,
//     "swinging": 1,
//     "teleportation": 1,
//     "tunneling": 1,
//     "basesize": 5,
// };

// HERO.characteristicCosts5e = {
//     "str": 1,
//     "dex": 3,
//     "con": 2,
//     "body": 2,
//     "int": 1,
//     "ego": 2,
//     "pre": 1,
//     "com": 1 / 2,
//     "pd": 1,
//     "ed": 1,
//     "spd": 10,
//     "rec": 2,
//     "end": 1 / 2,
//     "stun": 1,
//     "ocv": 5,
//     "dcv": 5,
//     "omcv": 3,
//     "dmcv": 3,
//     "running": 2,
//     "swimming": 1 / 2,
//     "leaping": 1 / 2,
//     "flight": 1,
//     "swinging": 1,
//     "teleportation": 1,
//     "tunneling": 1,
//     "basesize": 5,
// };


// HERO.characteristicsXMLKey = {
//     "STR": "str",
//     "DEX": "dex",
//     "CON": "con",
//     "INT": "int",
//     "EGO": "ego",
//     "PRE": "pre",
//     "COM": "com",
//     "OCV": "ocv",
//     "DCV": "dcv",
//     "OMCV": "omcv",
//     "DMCV": "dmcv",
//     "SPD": "spd",
//     "PD": "pd",
//     "ED": "ed",
//     "REC": "rec",
//     "END": "end",
//     "BODY": "body",
//     "STUN": "stun",
//     "RUNNING": "running",
//     "SWIMMING": "swimming",
//     "LEAPING": "leaping",
//     "FLIGHT": "flight",
//     "SWINGING": "swinging",
//     "TELEPORTATION": "teleportation",
//     "TUNNELING": "tunneling",
//     "GENERAL": "general",
//     "BASESIZE": "basesize",
// };

HERO.skillCharacteristics = {
    "general": "General",
    "str": "STR",
    "dex": "DEX",
    "con": "CON",
    "int": "INT",
    "ego": "EGO",
    "pre": "PRE",
};

HERO.skillCharacteristics5e = {
    "general": "General",
    "str": "STR",
    "dex": "DEX",
    "con": "CON",
    "int": "INT",
    "ego": "EGO",
    "pre": "PRE",
    "com": "COM",
};

HERO.skillTraining = {
    "untrained": "Untrained",
    "familiar": "Familiar",
    "everyman": "Everyman",
    "proficient": "Proficient",
    "trained": "Trained",
};

HERO.hitLocationsToHit = {
    "3": "Head",
    "4": "Head",
    "5": "Head",
    "6": "Hand",
    "7": "Arm",
    "8": "Arm",
    "9": "Shoulder",
    "10": "Chest",
    "11": "Chest",
    "12": "Stomach",
    "13": "Vitals",
    "14": "Thigh",
    "15": "Leg",
    "16": "Leg",
    "17": "Foot",
    "18": "Foot",
}

HERO.hitLocations = {
    // Location : [x Stun, x N Stun, x Body, OCV modifier]
    "Head": [5, 2, 2, -8],
    "Hand": [1, 0.5, 0.5, -6],
    "Arm": [2, 0.5, 0.5, -5],
    "Shoulder": [3, 1, 1, -5],
    "Chest": [3, 1, 1, -5],
    "Stomach": [4, 1.5, 1, -7],
    "Vitals": [4, 1.5, 2, -8],
    "Thigh": [2, 1, 1, -4],
    "Leg": [2, 0.5, 0.5, -6],
    "Foot": [1, 0.5, 0.5, -8],
};

HERO.combatManeuvers = {
    // Maneuver : [phase, OCV, DCV, Effects, Attack]
    "Block": ["1/2", "+0", "+0", "Blocks HTH attacks, Abort", true],
    "Brace": ["0", "+2", "1/2", "+2 OCV only to offset the Range Modifier"],
    "Disarm": ["1/2", "-2", "+0", "Disarm target, requires STR vs. STR Roll", true],
    "Dodge": ["1/2", "--", "+3", "Dodge all attacks, Abort", true],
    "Grab": ["1/2", "-1", "-2", "Grab Two Limbs; can Squeeze, Slam, or Throw", true],
    "Grab By": ["1/2 †", "-3", "-4", "Move and Grab object, +(v/10) to STR", true],
    "Haymaker": ["1/2*", "+0", "-5", "+4 Damage Classes to any attack"],
    "Move By": ["1/2 †", "-2", "-2", "((STR/2) + (v/10))d6; attacker takes 1/3 damage", true],
    "Move Through": ["1/2 †", "-v/10", "-3", "(STR + (v/6))d6; attacker takes 1/2 or full damage", true],
    //"Multiple Attack": ["1", "var", "1/2", "Attack one or more targets multiple times"],
    "Set": ["1", "+1", "+0", "Take extra time to aim a Ranged attack at a target"],
    "Shove": ["1/2", "-1", "-1", "Push target back 1m per 5 STR used", true],
    "Strike": ["1/2", "+0", "+0", "STR damage or by weapon type", true],
    "Throw": ["1/2", "+0", "+0", "Throw object or character, does STR damage", true],
    "Trip": ["1/2", "-1", "-2", "Knock a target to the ground, making him Prone", true],
    //"Other Attacks": ["1/2", "+0", "+0", ""],
}

HERO.combatManeuversOptional = {
    // Maneuver : [phase, OCV, DCV, Effects]
    "Choke": ["1/2", "-2", "-2", "NND 1d6, Grab One Limb"],
    "Club Weapon": ["1/2", "+0", "+0", "Killing weapon does equivalent Normal Damage"],
    "Cover": ["1/2", "-2", "+0", "Target held at gunpoint"],
    "Dive For Cover": ["1/2", "+0", "+0", "Character avoids attack; Abort"],
    "Hipshot": ["1/2", "-1", "+0", "+1", "DEX only for purposes of initiative"],
    "Pulling A Punch": ["1/2", "-1/5d6", "+0", "Strike, normal STUN damage, 1/2 BODY damage"],
    "Roll With A Punch": ["1/2", "-2", "-2", "Block after being hit, take 1/2 damage; Abort"],
    "Snap Shot": ["1", "-1", "+0", "Lets character duck back behind cover"],
    "Strafe": ["1/2 †", "-v/6", "-2", "Make Ranged attack while moving"],
    "Suppression Fire": ["1/2", "-2", "+0", "Continuous fire through an area, must be Autofire"],
}

HERO.movementPowers = {
    "running": "Running",
    "swimming": "Swimming",
    "leaping": "Leaping",
    "flight": "Flight",
    "swinging": "Swinging",
    "teleportation": "Teleportation",
    "tunneling": "Tunneling",
    "extradimensionalmovement": "Extra Dimensional Movement",
    "ftl": "Faster Than Light"
}

// Power Info
// Valid XMLID's for powers

HERO.powers = [
    {
        "key": "STR",
        name: "Strength",
        base: 10,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "costEnd": true,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "DEX",
        name: "Dexterity.",
        base: 10,
        cost: 2,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "base2"
        ]
    },
    {
        "key": "CON",
        name: "Constitution",
        base: 10,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "INT",
        name: "Intelligence",
        base: 10,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2"
        ]
    },
    {
        "key": "EGO",
        name: "Ego",
        base: 10,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "automaton",
            "vehicle",
            "base2",
            "computer"
        ]
    },
    {
        "key": "PRE",
        name: "Presence",
        base: 10,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "COM",
        name: "Comeliness",
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2",
            "computer",
            "ai",
            "6e"
        ]
    },
    {
        "key": "OCV",
        name: "Offensive Combat Value",
        base: 3,
        cost: 5,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "base2"
        ]
    },
    {
        "key": "DCV",
        name: "Defensive Combat Value",
        base: 3,
        cost: 5,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "base2"
        ]
    },
    {
        "key": "OMCV",
        name: "Offensive Mental Combat Value",
        base: 3,
        cost: 3,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "automaton",
            "vehicle",
            "base2"
        ]
    },
    {
        "key": "DMCV",
        name: "Defensive Mental Combat Value",
        base: 3,
        cost: 3,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "automaton",
            "vehicle",
            "base2"
        ]
    },
    {
        "key": "SPD",
        name: "Speed",
        base: 2,
        cost: 10,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "base2"
        ]
    },
    {
        "key": "PD",
        name: "Physical Defense",
        base: 2,
        cost: 1,
        "powerType": [
            "characteristic",
            "defense"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "computer",
            "ai"
        ]
    },
    {
        "key": "ED",
        name: "Energy Defense",
        base: 2,
        cost: 1,
        "powerType": [
            "characteristic",
            "defense"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "computer",
            "ai"
        ]
    },
    {
        "key": "REC",
        name: "Recovery",
        base: 4,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "END",
        name: "Endurance",
        base: 20,
        cost: 1 / 5,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "BODY",
        name: "Body",
        base: 10,
        cost: 1,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "STUN",
        name: "Stun",
        base: 20,
        cost: 1 / 2,
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "ignoreFor": [
            "vehicle",
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "RUNNING",
        name: "Running",
        base: 12,
        cost: 1,
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "SWIMMING",
        name: "Swimming",
        base: 4,
        cost: 1 / 2,
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "costPerLevel": 1 / 2,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "LEAPING",
        name: "Leaping",
        base: 4,
        cost: 1 / 2,
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "costPerLevel": 0.5,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "BASESIZE",
        name: "Base Size",
        "powerType": [
            "characteristic"
        ],
        "duration": "persistent",
        "onlyFor": [
            "automaton",
            "vehicle",
            "base2"
        ]
    },
    {
        "key": "CLINGING",
        name: "Clinging",
        "powerType": [
            "standard"
        ]
    },
    {
        "key": "EXTRALIMBS",
        "powerType": [
            "standard"
        ],
        "costPerLevel": 0
    },
    {
        "key": "SUMMON",
        "powerType": [
            "standard"
        ]
    },
    {
        "key": "DESOLIDIFICATION",
        "powerType": [
            "body-affecting",
            "standard"
        ],
        "name": "Desolidification"
    },
    {
        "key": "REGENERATION",
        "powerType": [
            "special"
        ],
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false
    },
    {
        "key": "HEALING",
        "powerType": [
            "adjustment", "attack"
        ],
        "perceivability": "obvious",
        "duration": "instant",
        "target": "target's dcv",
        "range": "no range",
        "costEnd": true,
        "costPerLevel": 10
    },
    {
        "key": "STRETCHING",
        "powerType": [
            "body-affecting",
            "standard"
        ],
        "perceivability": "obvious",
        "duration": "constant",
        "target": "self only",
        "range": "self",
        "costEnd": true,
        "costPerLevel": 1
    },
    {
        "key": "LIFESUPPORT",
        "name": "Life Support",
        "powerType": [
            "standard"
        ],
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false
    },
    {
        "key": "AID",
        "name": "Aid",
        "powerType": [
            "adjustment",
            "attack"
        ],
        "perceivability": "obvious",
        "duration": "Instant",
        "target": "target’s DCV",
        "range": "no range",
        "costEnd": true,
        "costPerLevel": 6
    },
    {
        "key": "DRAIN",
        "name": "Drain",
        "powerType": [
            "adjustment",
            "attack"
        ],
        "perceivability": "obvious",
        "duration": "Instant",
        "target": "target’s DCV",
        "range": "standard",
        "costEnd": true,
        "costPerLevel": 10
    },
    {
        "key": "TRANSFER",
        "name": "Transfer",
        "powerType": [
            "adjustment",
            "attack"
        ],
        "perceivability": "obvious",
        "duration": "Instant",
        "target": "target’s DCV",
        "range": "no range",
        "costEnd": true,
        "costPerLevel": 15
    },
    {
        "key": "SHAPESHIFT",
        "name": "Shape Shift",
        "powerType": [
            "body-affecting"
        ],
        "perceivability": "obvious",
        "duration": "constant",
        "target": "self only",
        "range": "self",
        "costEnd": true
    },
    {
        "key": "DENSITYINCREASE",
        "name": "Density Increase",
        "powerType": [
            "body-affecting",
            "standard", "defense"
        ],
        "perceivability": "obvious",
        "duration": "constant",
        "target": "self only",
        "range": "self",
        "costEnd": true,
        "costPerLevel": 4
    },
    {
        "key": "DEFLECTION",
        "name": "Deflectsion",
        "powerType": [
            "defense",
            "standard"
        ],
        "perceivability": "Inobvious",
        "duration": "Instant",
        "target": "Target’s OCV (see text)",
        "range": "Standard",
        "costEnd": true,
        //"cost": 20,

    },
    {
        "key": "NAKEDMODIFIER",
        "powerType": ["special"],
        //"duration": "instant",  // Not true, hack for isPercievable
        "costEnd": true,
        "costPerLevel": 1,

    },
    {
        "key": "GROWTH",
        "name": "Growth",
        "powerType": [
            "body-affecting",
            "defense",
            "size"
        ],
        "perceivability": "obvious",
        "duration": "constant",
        "target": "self only",
        "range": "self",
        "costEnd": true,
        "costPerLevel": 5
    },
    {
        "key": "LUCK",
        "name": "Luck",
        "powerType": [
            "special"
        ],
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 5
    },
    {
        "key": "ENDURANCERESERVE",
        "name": "Endurance Reserve",
        "powerType": [
            "special"
        ],
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 0.25
    },
    {
        "key": "MINDSCAN",
        "powerType": [
            "attack",
            "mental"
        ],
        "perceivability": "imperceptible",
        "duration": "constant",
        "target": "dmcv",
        "range": "special",
        "costEnd": true,
        "costPerLevel": 5
    },
    {
        "key": "TELEPATHY",
        "powerType": [
            "mental", "attack"
        ],
        "perceivability": "imperceptible",
        "duration": "instant",
        "target": "dmcv",
        "range": "los",
        "costEnd": true,
        "costPerLevel": 5
    },
    {
        "key": "EGOATTACK",
        "name": "Mental Blast",
        "powerType": [
            "attack",
            "mental"
        ],
        "perceivability": "imperceptible",
        "duration": "instant",
        "target": "dmcv",
        "range": "los",
        "costEnd": true,
        "costPerLevel": 10
    },
    {
        "key": "MENTALILLUSIONS",
        "name": "Mental Illusions",
        "powerType": [
            "attack",
            "mental"
        ],
        "perceivability": "imperceptible",
        "duration": "instant",
        "target": "dmcv",
        "range": "los",
        "costEnd": true,
        "costPerLevel": 5
    },
    {
        "key": "MINDCONTROL",
        "name": "Mind Control",
        "powerType": [
            "attack",
            "mental"
        ],
        "perceivability": "imperceptible",
        "duration": "instant",
        "target": "dmcv",
        "range": "los",
        "costEnd": true,
        "costPerLevel": 5
    },
    {
        "key": "MINDLINK",
        "name": "Mind Link",
        "powerType": [
            "mental"
        ],
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "dmcv",
        "range": "los",
        "costEnd": false,
        "costPerLevel": 5
    },
    {
        "key": "CLAIRSENTIENCE",
        "powerType": [
            "sense"
        ],
        "range": "standard",
    },
    {
        "key": "NIGHTVISION",
        "powerType": [
            "sense"
        ]
    },
    {
        "key": "ENHANCEDPERCEPTION",
        "powerType": [
            "sense"
        ]
    },
    {
        "key": "MENTALAWARENESS",
        "powerType": [
            "sense"
        ],
        "senseGroup": "mental",
        "senseType": "passive"
    },
    {
        "key": "PENETRATIVE",
        "powerType": [
            "sense"
        ]
    },
    {
        "key": "DETECT",
        "powerType": [
            "sense"
        ],
        "costPerLevel": 1
    },
    {
        "key": "TARGETINGSENSE",
        "powerType": [
            "sense"
        ]
    },
    {
        "key": "TRACKINGSENSE",
        "powerType": [
            "sense"
        ]
    },
    {
        "key": "FINDWEAKNESS",
        "powerType": [
            "sense",
            "special",
            "skill"
        ]
    },
    {
        "key": "HANDTOHANDATTACK",
        "powerType": [
            "attack"
        ],
        "range": "no range",
        "costPerLevel": 5
    },
    {
        "key": "HKA",
        "powerType": [
            "attack"
        ],
        "range": "no range",
        "costPerLevel": 15,
        "costEnd": true
    },
    {
        "key": "TELEKINESIS",
        "powerType": [
            "attack"
        ],
        "range": "standard",
        "costEnd": true,
        "costPerLevel": 1.5
    },
    {
        "key": "RKA",
        "powerType": [
            "attack"
        ],
        "range": "standard",
        "costPerLevel": 15,
        "costEnd": true,
        "sheet": {
            "INPUT": {
                "label": "Vs.",
                "selectOptions": {
                    "ED": "ED",
                    "PD": "PD"
                }
            }
        }
    },
    {
        "key": "ENERGYBLAST",
        "powerType": [
            "attack"
        ],
        "range": "standard",
        "costPerLevel": 5,
        "costEnd": true
    },
    {
        "key": "DARKNESS",
        "powerType": [
            "sense-affecting",
            "attack",
            "standard"
        ],
        "range": "standard",
    },
    {
        "key": "DISPEL",
        "powerType": [
            "attack",
            "standard"
        ],
        "range": "standard",
        "costPerLevel": 3
    },
    {
        "key": "ENTANGLE",
        "powerType": [
            "attack",
            "standard"
        ],
        "range": "standard",
        "costPerLevel": 10,
        "costEnd": true
    },
    {
        "key": "FLASH",
        "powerType": [
            "attack",
            "sense-affecting",
            "standard"
        ],
        "perceivability": "obvious",
        "duration": "instant",
        "target": "Target’s DCV",
        "range": "standard",
        "costEnd": true
    },
    {
        "key": "IMAGES",
        "name": "Images",
        "powerType": [
            "attack",
            "sense-affecting",
            "standard"
        ],
        "perceivability": "obvious",
        "duration": "constant",
        "target": "area (see text)",
        "range": "standard",
        "costEnd": true
    },
    {
        "key": "EXTRADC",
        "powerType": [
            "martial"
        ],
        "costPerLevel": 4
    },
    {
        "key": "RANGEDDC",
        "powerType": [
            "martial"
        ],
        "costPerLevel": 4
    },
    {
        "key": "MANEUVER",
        "powerType": [
            "martial",
            "attack"
        ]
    },
    {
        "key": "CHANGEENVIRONMENT",
        "name": "Change Environment",
        "powerType": [
            "attack"
        ],
        "perceivability": "Obvious",
        "duration": "Constant",
        "target": "Target’s DCV",
        "range": "Standard",
        "costEnd": true,
        "costPerLevel": 1
    },
    {
        "key": "INVISIBILITY",
        "name": "Invisibility",
        "powerType": [
            "sense-affecting"
        ],
        "perceivability": "Special",
        "duration": "Constant",
        "target": "Self Only",
        "range": "Self",
        "costEnd": true
    },
    {
        "key": "FORCEWALL",
        "powerType": [
            "defense"
        ],
        "name": "Barrier",
        "duration": "Instant",
        "range": "standard",
        "costEnd": true,
        "costPerLevel": 1.5
    },
    {
        "key": "FORCEFIELD",
        "powerType": [
            "defense"
        ],
        "name": "Resistant Protection",
        "duration": "Persistent",
        "perceivability": "inobvious",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 1.5
    },
    {
        "key": "FLASHDEFENSE",
        "powerType": [
            "defense",
            "special"
        ],
        "name": "Flash Defense",
        "perceivability": "inobvious",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 1
    },
    {
        "key": "MENTALDEFENSE",
        "powerType": [
            "defense",
            "special"
        ],
        "name": "Mental Defense",
        "perceivability": "Imperceptible",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "duration": "Persistent",
        "costPerLevel": 1
    },
    {
        "key": "POWERDEFENSE",
        "powerType": [
            "defense",
            "special"
        ],
        "name": "Power Defense",
        "perceivability": "inobvious",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 1
    },
    {
        "key": "DAMAGENEGATION",
        "powerType": [
            "defense",
            "special"
        ],
        "name": "Damage Negation",
        "perceivability": "inobvious",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false
    },
    {
        "key": "DAMAGEREDUCTION",
        "powerType": [
            "defense",
            "standard"
        ],
        "name": "Damage Reduction",
        "perceivability": "inobvious",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false
    },
    {
        "key": "KBRESISTANCE",
        "powerType": [
            "defense",
            "standard"
        ],
        "name": "Knockback Resistance",
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 1
    },
    {
        "key": "LACKOFWEAKNESS",
        "powerType": [
            "defense",
            "special"
        ],
        "name": "Knockback Resistance",
        "perceivability": "imperceptible",
        "duration": "persistent",
        "target": "self only",
        "range": "self",
        "costEnd": false,
        "costPerLevel": 1
    },
    {
        "key": "FLIGHT",
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "costPerLevel": 1,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },

    {
        "key": "TELEPORTATION",
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "costPerLevel": 1,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },

    {
        "key": "SWINGING",
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "costPerLevel": 0.5,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },
    {
        "key": "TUNNELING",
        "powerType": [
            "movement"
        ],
        "costEnd": true,
        "costPerLevel": 1,
        "ignoreFor": [
            "base2",
            "computer",
            "ai"
        ]
    },

    {
        "key": "EXTRADIMENSIONALMOVEMENT",
        "powerType": [
            "movement"
        ],
        "name": "Extra-Dimensional movement",
        "perceivability": "Inobvious",
        "duration": "instant",
        "target": "Self Only",
        "range": "Self",
        "costEnd": true,
        "costPerLevel": 20,
        // "ignoreFor": [
        //     "base2",
        //     "computer",
        //     "ai"
        // ],
        "onlyFor": ["none"]
    },
    {
        "key": "REPUTENVIRONMENTAL_MOVEMENTATION",
        "powerType": [
            "talent"
        ],
        "name": "Environmental Movement",
        "costPerLevel": 0
    },
    {
        "key": "REPUTATION",
        "powerType": [
            "talent"
        ],
        "name": "Positive Reputation",
        "costPerLevel": 0
    },
    {
        "key": "FOLLOWER",
        "powerType": [
            "talent"
        ],
        "name": "Follower",
    },

    {
        "key": "CONTACT",
        "powerType": [
            "perk"
        ],
        "name": "Contact",
        "costPerLevel": 1
    },
    {
        "key": "COMBAT_LUCK",
        "powerType": [
            "talent",
            "defense"
        ],
        "duration": "constant",
        "costPerLevel": 6
    },
    {
        "key": "LIGHTNING_REFLEXES_ALL",
        "powerType": [
            "talent"
        ],
        "name": "Lightning Reflexes",
        "costPerLevel": 1
    },
    {
        "key": "LIGHTNING_REFLEXES_SINGLE",
        "powerType": [
            "talent"
        ],
        "name": "Lightning Reflexes",
        "costPerLevel": 1
    },
    {
        "key": "COMBAT_SENSE",
        "powerType": [
            "talent"
        ],
        "name": "Combat Sense",
        "costPerLevel": 1
    },
    {
        "key": "RESISTANCE",
        "powerType": [
            "talent"
        ],
        "name": "Resistance",
        "costPerLevel": 1
    },
    {
        "key": "ACROBATICS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "ACTING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "ANALYZE",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "ANIMAL_HANDLER",
        "powerType": [
            "skill"
        ],
        "categorized": true
    },
    {
        "key": "AUTOFIRE_SKILLS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "BREAKFALL",
        "powerType": [
            "skill"
        ],
        "costPerLevel": 1
    },
    {
        "key": "BRIBERY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "BUGGING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "BUREAUCRATICS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CHARM",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CLIMBING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "COMBAT_DRIVING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "COMBAT_PILOTING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "COMBAT_LEVELS",
        "powerType": [
            "skill"
        ],
        "rollable": false,
        "xmlid": "COMBAT_LEVELS"
    },
    {
        "key": "COMPUTER_PROGRAMMING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CONCEALMENT",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CONTORTIONIST",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CONVERSATION",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CRAMMING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CRIMINOLOGY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CRYPTOGRAPHY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "CUSTOMSKILL",
        "powerType": [
            "skill"
        ],
        "costPerLevel": 1
    },
    {
        "key": "DEDUCTION",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "DEFENSE_MANEUVER",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "DEMOLITIONS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "DISGUISE",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "ELECTRONICS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "FAST_DRAW",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "FORENSIC_MEDICINE",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "FORGERY",
        "powerType": [
            "skill"
        ],
        "categorized": true
    },
    {
        "key": "GAMBLING",
        "powerType": [
            "skill"
        ],
        "categorized": true
    },
    {
        "key": "HIGH_SOCIETY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "INTERROGATION",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "INVENTOR",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "KNOWLEDGE_SKILL",
        "powerType": [
            "skill"
        ],
        "costPerLevel": 1
    },
    {
        "key": "LANGUAGES",
        "powerType": [
            "skill"
        ],
        "rollable": false
    },
    {
        "key": "LIPREADING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "LOCKPICKING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "MECHANICS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "MENTAL_COMBAT_LEVELS",
        "powerType": [
            "skill"
        ],
        "rollable": false,
        "xmlid": "MENTAL_COMBAT_LEVELS"
    },
    {
        "key": "MIMICRY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "NAVIGATION",
        "powerType": [
            "skill"
        ],
        "categorized": true
    },
    {
        "key": "ORATORY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "PARAMEDICS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "PENALTY_SKILL_LEVELS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "PERSUASION",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "POWERSKILL",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "PROFESSIONAL_SKILL",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "RAPID_ATTACK_HTH",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "RIDING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "SCIENCE_SKILL",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "SECURITY_SYSTEMS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "SHADOWING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "SKILL_LEVELS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "SLEIGHT_OF_HAND",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "STEALTH",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "STREETWISE",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "SURVIVAL",
        "powerType": [
            "skill"
        ],
        "categorized": true
    },
    {
        "key": "SYSTEMS_OPERATION",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "TACTICS",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "TEAMWORK",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "TRACKING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "TRADING",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "TRANSPORT_FAMILIARITY",
        "powerType": [
            "skill"
        ],
        "rollable": false
    },
    {
        "key": "TWO_WEAPON_FIGHTING_HTH",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "VENTRILOQUISM",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "WEAPON_FAMILIARITY",
        "powerType": [
            "skill"
        ]
    },
    {
        "key": "WEAPONSMITH",
        "powerType": [
            "skill"
        ],
        "categorized": true
    },
    {
        "key": "JACK_OF_ALL_TRADES",
        "powerType": [
            "skill",
            "enhancer"
        ],
        "rollable": false
    },
    {
        "key": "LINGUIST",
        "powerType": [
            "skill",
            "enhancer"
        ],
        "rollable": false
    },
    {
        "key": "SCIENTIST",
        "powerType": [
            "skill",
            "enhancer"
        ],
        "rollable": false
    },
    {
        "key": "SCHOLAR",
        "powerType": [
            "skill",
            "enhancer"
        ],
        "rollable": false
    },
    {
        "key": "TRAVELER",
        "powerType": [
            "skill",
            "enhancer"
        ],
        "rollable": false
    },
    {
        "key": "LIST",
        "powerType": [
            "framework"
        ]
    },
    {
        "key": "VPP",
        "powerType": [
            "framework"
        ]
    },
    {
        "key": "ELEMENTAL_CONTROL",
        "powerType": [
            "framework"
        ]
    },
    {
        "key": "MULTIPOWER",
        "powerType": [
            "framework"
        ]
    },
    {
        "key": "COMPOUNDPOWER",
        "powerType": [
            "compound"
        ]
    },
    {
        "key": "DUPLICATION",
        "powerType": [
            "BodyAffecting",
            "special"
        ],
        "name": "Duplication",
        "perceivability": "Obvious",
        "duration": "persistent",
        "target": "Self Only",
        "range": "Self",
        "costEnd": false,
        "costPerLevel": 0.2
    },
    {
        "key": "CUSTOMPOWER",
        "powerType": [
            "custom"
        ]
    },
    {
        "key": "naturalBodyHealing"
    },

    {
        "key": "AUTOMATON",  //CANNOT BE STUNNED
        powerType: ["automaton", "special"],
        name: "Automaton",
        perceivability: "Inobvious",
        duration: "Persistent",
        target: "Self Only",
        range: "Self",
        costEnd: false,
    },
]

HERO.powers5e = [
    {
        "key": "DEX",
        cost: 3
    },
    {
        "key": "CON",
        cost: 2
    },
    {
        "key": "EGO",
        cost: 2
    },
    {
        "key": "BODY",
        cost: 2
    },
    {
        "key": "PD",
        base: 0,
        cost: 1
    },
    {
        "key": "ED",
        base: 0,
        cost: 1
    },
    {
        "key": "SPD",
        base: 0,
        cost: 10
    },
    {
        "key": "REC",
        base: 0,
        cost: 2
    },
    {
        "key": "END",
        base: 0,
        cost: 1 / 2
    },
    {
        "key": "STUN",
        base: 0,
        cost: 1
    },
    {
        "key": "COM",
        base: 10,
        cost: 1 / 2,
    },
    {
        "key": "OCV",
        cost: 0,
    },
    {
        "key": "DCV",
        cost: 0,
    },
    {
        "key": "OMCV",
        cost: 0,
    },
    {
        "key": "DMCV",
        cost: 0,
    },
    {
        "key": "RUNNING",
        base: 6,
        cost: 2,
    },
    {
        "key": "SWIMMING",
        base: 2,
        cost: 1,
        "costPerLevel": 1,
    },
    {
        "key": "LEAPING",
        base: 2,
        cost: 1,
    },
    {
        "key": "AID",
        costEnd: false,
        costPerLevel: 6,
    },
    {
        "key": "TRANSFER",
        name: "Transfer",
        powerType: ["adjustment", "attack"],
        perceivability: "obvious",
        duration: "Instant",
        target: "target's DCV",
        range: "no range",
        costEnd: true,
        costPerLevel: 15,
    },
    {
        "key": "TRANSFORM",
        name: "Transform",
        powerType: ["attack", "standard"],
        perceivability: "obvious",
        duration: "Instant",
        target: "target's DCV",
        range: "Standard",
        costEnd: true,
        //cost: See Transform Table
    },
    {
        "key": "ARMOR",
        powerType: ["defense"],
        name: "Resistant Protection",
        duration: "Persistent",
        costPerLevel: 3 / 2
    },  // AKA RESISTANT PROTECTION
    {
        "key": "DAMAGERESISTANCE",
        name: "Damage Resistance",
        powerType: ["defense"],
        //perceivability: "obvious",
        duration: "Instant",
        target: "Self Only",
        range: "Self",
        costEnd: false,
        costPerLevel: 1 / 2
    },
    {
        "key": "FORCEFIELD",
        powerType: ["defense"],
        name: "Resistant Protection",
        duration: "Constant",
        costEnd: true,
        costPerLevel: 3 / 2
    },

    {
        "key": "UNLUCK",
        powerType: ["disadvantage"],
        name: "Unluck",
        costPerLevel: 5
    },

    {
        "key": "DENSITYINCREASE",
        "name": "Density Increase",
        "powerType": [
            "body-affecting",
            "standard", "defense"
        ],
        "perceivability": "obvious",
        "duration": "constant",
        "target": "self only",
        "range": "self",
        "costEnd": true,
        "costPerLevel": 5
    },



]

// HERO.powers = {

//     // Characteristics (will likely use active effects for these)
//     "STR": { powerType: ["characteristic"], duration: "persistent", costEnd: true, ignoreFor: ["base2", "computer", "ai"] },
//     "DEX": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["base2"] },
//     "CON": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2", "computer", "ai"] },
//     "INT": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2"] },
//     "EGO": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["automaton", "vehicle", "base2", "computer"] },
//     "PRE": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2", "computer", "ai"] },
//     "OCV": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["base2"] },
//     "DCV": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["base2"] },
//     "OMCV": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["automaton", "vehicle", "base2"] },
//     "DMCV": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["automaton", "vehicle", "base2"] },
//     "SPD": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["base2"] },
//     "PD": { powerType: ["characteristic", "defense"], duration: "persistent", ignoreFor: ["computer", "ai"] },
//     "ED": { powerType: ["characteristic", "defense"], duration: "persistent", ignoreFor: ["computer", "ai"] },
//     "REC": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2", "computer", "ai"] },
//     "END": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2", "computer", "ai"] },
//     "BODY": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["base2", "computer", "ai"] },
//     "STUN": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2", "computer", "ai"] },
//     "COM": { powerType: ["characteristic"], duration: "persistent", ignoreFor: ["vehicle", "base2", "computer", "ai"] },
//     "BASESIZE": { powerType: ["characteristic"], duration: "persistent", onlyFor: ["automaton", "vehicle", "base2"] },

//     // Misc
//     "CLINGING": { powerType: ["standard"] },
//     "EXTRALIMBS": { powerType: ["standard"], costPerLevel: 0 },
//     "SUMMON": { powerType: ["standard"] },
//     "DESOLIDIFICATION": { powerType: ["body-affecting", "standard"], name: "Desolidification" },
//     "REGENERATION": { powerType: ["special"], perceivability: "imperceptible", duration: "persistent", target: "self only", range: "self", costEnd: false },
//     "HEALING": {
//         powerType: ["adjustment"],
//         perceivability: "obvious",
//         duration: "instant",
//         target: "target's dcv",
//         range: "no range",
//         costEnd: true,
//         costPerLevel: 10,
//     },
//     "STRETCHING": {
//         powerType: ["body-affecting", "standard"],
//         perceivability: "obvious",
//         duration: "constant",
//         target: "self only",
//         range: "self",
//         costEnd: true,
//         costPerLevel: 1
//     },
//     "LIFESUPPORT": {
//         name: "Life Support",
//         powerType: ["standard"],
//         perceivability: "imperceptible",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false
//     },
//     "AID": {
//         name: "Aid",
//         powerType: ["adjustment", "attack"], // not really an attack, but it behaves like one
//         perceivability: "obvious",
//         duration: "Instant",
//         target: "target’s DCV",
//         range: "no range",
//         costEnd: true,
//         costPerLevel: 6,
//     },
//     "DRAIN": {
//         name: "Drain",
//         powerType: ["adjustment", "attack"],
//         perceivability: "obvious",
//         duration: "Instant",
//         target: "target’s DCV",
//         range: "standard",
//         costEnd: true,
//         costPerLevel: 10,
//     },
//     "TRANSFER": {
//         name: "Transfer",
//         powerType: ["adjustment", "attack"],
//         perceivability: "obvious",
//         duration: "Instant",
//         target: "target’s DCV",
//         range: "no range",
//         costEnd: true,
//         costPerLevel: 15,
//     },
//     "SHAPESHIFT": {
//         name: "Shape Shift",
//         powerType: ["body-affecting"],
//         perceivability: "obvious",
//         duration: "constant",
//         target: "self only",
//         range: "self",
//         costEnd: true
//     },
//     "DENSITYINCREASE": {
//         name: "Density Increase",
//         powerType: ["body-affecting", "standard"],
//         perceivability: "obvious",
//         duration: "constant",
//         target: "self only",
//         range: "self",
//         costEnd: true,
//         costPerLevel: 4,
//     },
//     "NAKEDMODIFIER": {  // INDEPENDENT ADVANTAGE
//         powerType: [],
//         costEnd: true,
//         costPerLevel: 1,
//     },
//     "GROWTH": {
//         name: "Growth",
//         powerType: ["body-affecting", "size"],
//         perceivability: "obvious",
//         duration: "constant",
//         target: "self only",
//         range: "self",
//         costEnd: true,
//         costPerLevel: 5,
//     },
//     "LUCK": {
//         name: "Luck",
//         powerType: ["special"],
//         perceivability: "imperceptible",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         costPerLevel: 5,
//     },
//     "ENDURANCERESERVE": {
//         name: "Endurance Reserve",
//         powerType: ["special"],
//         perceivability: "imperceptible",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         costPerLevel: 0.25,
//     },




//     // Mental
//     "MINDSCAN": {
//         powerType: ["mental"],
//         powerType: ["attack", "mental"],
//         perceivability: "imperceptible",
//         duration: "constant",
//         target: "dmcv",
//         range: "special",
//         costEnd: true,
//         costPerLevel: 5,
//     },
//     "TELEPATHY": {
//         powerType: ["mental"],
//         perceivability: "imperceptible",
//         duration: "instant",
//         target: "dmcv",
//         range: "los",
//         costEnd: true,
//         costPerLevel: 5,
//     },
//     "EGOATTACK": {
//         name: "Mental Blast",
//         powerType: ["attack", "mental"],
//         perceivability: "imperceptible",
//         duration: "instant",
//         target: "dmcv",
//         range: "los",
//         costEnd: true,
//         costPerLevel: 10,
//     },
//     "MENTALILLUSIONS": {
//         name: "Mental Illusions",
//         powerType: ["attack", "mental"],
//         perceivability: "imperceptible",
//         duration: "instant",
//         target: "dmcv",
//         range: "los",
//         costEnd: true,
//         costPerLevel: 5,
//     },
//     "MINDCONTROL": {
//         name: "Mind Control",
//         powerType: ["attack", "mental"],
//         perceivability: "imperceptible",
//         duration: "instant",
//         target: "dmcv",
//         range: "los",
//         costEnd: true,
//         costPerLevel: 5,
//     },
//     "MINDLINK": {
//         name: "Mind Link",
//         powerType: ["mental"],
//         perceivability: "imperceptible",
//         duration: "persistent",
//         target: "dmcv",
//         range: "los",
//         costEnd: false,
//         costPerLevel: 5,
//     },


//     // Senses
//     "CLAIRSENTIENCE": { powerType: ["sense"] },  //UNUSUAL SENSES
//     "NIGHTVISION": { powerType: ["sense"] },
//     "ENHANCEDPERCEPTION": { powerType: ["sense"] },
//     "MENTALAWARENESS": { powerType: ["sense"], senseGroup: "mental", senseType: "passive" },
//     "PENETRATIVE": { powerType: ["sense"] },
//     "DETECT": { powerType: ["sense"], costPerLevel: 1 },
//     "TARGETINGSENSE": { powerType: ["sense"] },
//     "TRACKINGSENSE": { powerType: ["sense"] },
//     "FINDWEAKNESS": { powerType: ["sense", "special", "skill"] },  // Not reall a skill, but behaves like one


//     // Attack
//     "HANDTOHANDATTACK": { powerType: ["attack"], costPerLevel: 5 },
//     "HKA": { powerType: ["attack"], costPerLevel: 15, costEnd: true },
//     "TELEKINESIS": {
//         powerType: ["attack"],
//         costEnd: true,
//         costPerLevel: 3 / 2
//     },
//     "RKA": {
//         powerType: ["attack"],
//         costPerLevel: 15,
//         costEnd: true,
//         sheet: {
//             INPUT: {
//                 label: "Vs.",
//                 selectOptions: {
//                     ED: "ED",
//                     PD: "PD",

//                 }

//             }
//         }
//     },
//     "ENERGYBLAST": { powerType: ["attack"], costPerLevel: 5, costEnd: true },
//     "DARKNESS": { powerType: ["sense-affecting", "attack", "standard"] },
//     "DISPEL": { powerType: ["attack", "standard"], costPerLevel: 3 },
//     "ENTANGLE": { powerType: ["attack", "standard"] },
//     "FLASH": {
//         powerType: ["attack", "sense-affecting", "standard"],
//         perceivability: "obvious",
//         duration: "instant",
//         target: "Target’s DCV",
//         range: "standard",
//         costEnd: true
//     },
//     "IMAGES": {
//         name: "Images",
//         powerType: ["attack", "sense-affecting", "standard"],
//         perceivability: "obvious",
//         duration: "constant",
//         target: "area (see text)",
//         range: "standard",
//         costEnd: true
//     },
//     "EXTRADC": { powerType: ["martial"], costPerLevel: 4 },
//     "MANEUVER": { powerType: ["martial", "attack"] },
//     "CHANGEENVIRONMENT": {
//         name: "Change Environment",
//         powerType: ["attack"],
//         perceivability: "Obvious",
//         duration: "Constant",
//         target: "Target’s DCV",
//         range: "Standard",
//         costEnd: true,
//         costPerLevel: 1,
//     },
//     "INVISIBILITY": {
//         name: "Invisibility",
//         powerType: ["sense-affecting"],
//         perceivability: "Special",
//         duration: "Constant",
//         target: "Self Only",
//         range: "Self",
//         costEnd: true,
//     },

//     // Defense
//     "FORCEWALL": {
//         powerType: ["defense"],
//         name: "Barrier",
//         duration: "Instant",
//         costEnd: true,
//         costPerLevel: 3 / 2,
//     }, // AKA BARRIER
//     "FORCEFIELD": {
//         powerType: ["defense"],
//         name: "Resistant Protection",
//         duration: "Persistent",
//         costPerLevel: 3 / 2
//     },  // AKA RESISTANT PROTECTION
//     "FLASHDEFENSE": {
//         powerType: ["defense", "special"],
//         name: "Flash Defense",
//         perceivability: "inobvious",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         costPerLevel: 1,
//     },
//     "MENTALDEFENSE": {
//         powerType: ["defense", "special"],
//         name: "Mental Defense",
//         perceivability: "Imperceptible",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         duration: "Persistent",
//         costPerLevel: 1
//     },
//     "POWERDEFENSE": {
//         powerType: ["defense", "special"],
//         name: "Power Defense",
//         perceivability: "inobvious",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         costPerLevel: 1,
//     },
//     "DAMAGENEGATION": {
//         powerType: ["defense", "special"],
//         name: "Damage Negation",
//         perceivability: "inobvious",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false
//     },
//     "DAMAGEREDUCTION": {
//         powerType: ["defense", "standard"],
//         name: "Damage Reduction",
//         perceivability: "inobvious",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false
//     },
//     "KBRESISTANCE": {
//         powerType: ["defense", "standard"],
//         name: "Knockback Resistance",
//         perceivability: "imperceptible",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         costPerLevel: 1,
//     },
//     "LACKOFWEAKNESS": {
//         powerType: ["defense", "special"],
//         name: "Knockback Resistance",
//         perceivability: "imperceptible",
//         duration: "persistent",
//         target: "self only",
//         range: "self",
//         costEnd: false,
//         costPerLevel: 1,
//     },


//     // Movement
//     "FLIGHT": { powerType: ["movement"], costEnd: true, costPerLevel: 1, ignoreFor: ["base2", "computer", "ai"] },
//     "LEAPING": { powerType: ["movement"], costEnd: true, costPerLevel: 0.5, ignoreFor: ["base2", "computer", "ai"] },
//     "TELEPORTATION": { powerType: ["movement"], costEnd: true, costPerLevel: 1, ignoreFor: ["base2", "computer", "ai"] },
//     "SWIMMING": { powerType: ["movement"], costEnd: true, costPerLevel: 1, ignoreFor: ["base2", "computer", "ai"] },
//     "SWINGING": { powerType: ["movement"], costEnd: true, costPerLevel: 0.5, ignoreFor: ["base2", "computer", "ai"] },
//     "TUNNELING": { powerType: ["movement"], costEnd: true, costPerLevel: 1, ignoreFor: ["base2", "computer", "ai"] },
//     "RUNNING": { powerType: ["movement"], costEnd: true, costPerLevel: 1, ignoreFor: ["base2", "computer", "ai"] },
//     "EXTRADIMENSIONALMOVEMENT": {
//         powerType: ["movement"],
//         name: "Extra-Dimensional movement",
//         perceivability: "Inobvious",
//         duration: "instant",
//         target: "Self Only",
//         range: "Self",
//         costEnd: true,
//         costPerLevel: 20,
//         ignoreFor: ["base2", "computer", "ai"]
//     },

//     // PERKS
//     "REPUTATION": {
//         powerType: ["talent"],
//         name: "Positive Reputation",
//         costPerLevel: 0,
//     },
//     "CONTACT": {
//         powerType: ["talent"],
//         name: "Contact",
//         costPerLevel: 1,
//     },

//     // Powers can include Talents
//     "COMBAT_LUCK": {
//         powerType: ["talent", "defense"],
//         duration: "constant",  // behaves like a constant power
//         costPerLevel: 6
//     },
//     "COMBAT_SENSE": {
//         powerType: ["talent"],
//         name: "Combat Sense",
//         costPerLevel: 1,
//     },
//     "RESISTANCE": {
//         powerType: ["talent"],
//         name: "Resistance",
//         costPerLevel: 1,
//     },

//     // Powers can include Skills.
//     "ACROBATICS": { powerType: ["skill"] },
//     "ACTING": { powerType: ["skill"] },
//     "ANALYZE": { powerType: ["skill"] },
//     "ANIMAL_HANDLER": { powerType: ["skill"], categorized: true },
//     "AUTOFIRE_SKILLS": { powerType: ["skill"] },
//     "BREAKFALL": { powerType: ["skill"], costPerLevel: 1 },
//     "BRIBERY": { powerType: ["skill"] },
//     "BUGGING": { powerType: ["skill"] },
//     "BUREAUCRATICS": { powerType: ["skill"] },
//     "CHARM": { powerType: ["skill"] },
//     "CLIMBING": { powerType: ["skill"] },
//     "COMBAT_DRIVING": { powerType: ["skill"] },
//     "COMBAT_PILOTING": { powerType: ["skill"] },
//     "COMBAT_LEVELS": { powerType: ["skill"], rollable: false },
//     "COMPUTER_PROGRAMMING": { powerType: ["skill"] },
//     "CONCEALMENT": { powerType: ["skill"] },
//     "CONTORTIONIST": { powerType: ["skill"] },
//     "CONVERSATION": { powerType: ["skill"] },
//     "CRAMMING": { powerType: ["skill"] },
//     "CRIMINOLOGY": { powerType: ["skill"] },
//     "CRYPTOGRAPHY": { powerType: ["skill"] },
//     "CUSTOMSKILL": { powerType: ["skill"], costPerLevel: 1 },
//     "DEDUCTION": { powerType: ["skill"] },
//     "DEFENSE_MANEUVER": { powerType: ["skill"] },
//     "DEMOLITIONS": { powerType: ["skill"] },
//     "DISGUISE": { powerType: ["skill"] },
//     "ELECTRONICS": { powerType: ["skill"] },
//     "FAST_DRAW": { powerType: ["skill"] },
//     "FORENSIC_MEDICINE": { powerType: ["skill"] },
//     "FORGERY": { powerType: ["skill"], categorized: true },
//     "GAMBLING": { powerType: ["skill"], categorized: true },
//     "HIGH_SOCIETY": { powerType: ["skill"] },
//     "INTERROGATION": { powerType: ["skill"] },
//     "INVENTOR": { powerType: ["skill"] },
//     "KNOWLEDGE_SKILL": { powerType: ["skill"], costPerLevel: 1 },
//     "LANGUAGES": { powerType: ["skill"], rollable: false },
//     "LIPREADING": { powerType: ["skill"] },
//     "LOCKPICKING": { powerType: ["skill"] },
//     "MECHANICS": { powerType: ["skill"] },
//     "MENTAL_COMBAT_LEVELS": { powerType: ["skill"], rollable: false },
//     "MIMICRY": { powerType: ["skill"] },
//     "NAVIGATION": { powerType: ["skill"], categorized: true },
//     "ORATORY": { powerType: ["skill"] },
//     "PARAMEDICS": { powerType: ["skill"] },
//     "PENALTY_SKILL_LEVELS": { powerType: ["skill"] },
//     "PERSUASION": { powerType: ["skill"] },
//     "POWERSKILL": { powerType: ["skill"] },
//     "PROFESSIONAL_SKILL": { powerType: ["skill"] },
//     "RAPID_ATTACK_HTH": { powerType: ["skill"] },
//     "RIDING": { powerType: ["skill"] },
//     "SCIENCE_SKILL": { powerType: ["skill"] },
//     "SECURITY_SYSTEMS": { powerType: ["skill"] },
//     "SHADOWING": { powerType: ["skill"] },
//     "SKILL_LEVELS": { powerType: ["skill"] },
//     "SLEIGHT_OF_HAND": { powerType: ["skill"] },
//     "STEALTH": { powerType: ["skill"] },
//     "STREETWISE": { powerType: ["skill"] },
//     "SURVIVAL": { powerType: ["skill"], categorized: true },
//     "SYSTEMS_OPERATION": { powerType: ["skill"] },
//     "TACTICS": { powerType: ["skill"] },
//     "TEAMWORK": { powerType: ["skill"] },
//     "TRACKING": { powerType: ["skill"] },
//     "TRADING": { powerType: ["skill"] },
//     "TRANSPORT_FAMILIARITY": { powerType: ["skill"] },
//     "TWO_WEAPON_FIGHTING_HTH": { powerType: ["skill"] },
//     "VENTRILOQUISM": { powerType: ["skill"] },
//     "WEAPON_FAMILIARITY": { powerType: ["skill"] },
//     "WEAPONSMITH": { powerType: ["skill"], categorized: true },

//     // Skill Enhancers
//     "JACK_OF_ALL_TRADES": { powerType: ["skill", "enhancer"], rollable: false },
//     "LINGUIST": { powerType: ["skill", "enhancer"], rollable: false },
//     "SCIENTIST": { powerType: ["skill", "enhancer"], rollable: false },
//     "SCHOLAR": { powerType: ["skill", "enhancer"], rollable: false },
//     "TRAVELER": { powerType: ["skill", "enhancer"], rollable: false },


//     // Power Frameworks
//     "LIST": { powerType: ["framework"] },
//     "VPP": { powerType: ["framework"] },
//     "ELEMENTAL_CONTROL": { powerType: ["framework"] },
//     "MULTIPOWER": { powerType: ["framework"] },
//     "COMPOUNDPOWER": { powerType: ["compound"] },

//     // Misc
//     "DUPLICATION": {
//         powerType: ["BodyAffecting", "special"],
//         name: "Duplication",
//         perceivability: "Obvious",
//         duration: "persistent",
//         target: "Self Only",
//         range: "Self",
//         costEnd: false,
//         costPerLevel: 1 / 5,
//     },
//     "CUSTOMPOWER": { powerType: ["custom"] },
//     "naturalBodyHealing": {},
// }

// HERO.powers5e = {
//     ...HERO.powers,
//     "AID": {
//         name: "Aid",
//         powerType: ["adjustment", "attack"], // not really an attack, but it behaves like one
//         perceivability: "obvious",
//         duration: "Instant",
//         target: "target’s DCV",
//         range: "no range",
//         costEnd: false,
//         costPerLevel: 6,
//     },
//     "TRANSFER": {
//         name: "Transfer",
//         powerType: ["adjustment", "attack"],
//         perceivability: "obvious",
//         duration: "Instant",
//         target: "target’s DCV",
//         range: "no range",
//         costEnd: true,
//         costPerLevel: 15,
//     },
//     "ARMOR": {
//         powerType: ["defense"],
//         name: "Resistant Protection",
//         duration: "Persistent",
//         costPerLevel: 3 / 2
//     },  // AKA RESISTANT PROTECTION
//     "DAMAGERESISTANCE": {
//         name: "Damage Resistance",
//         powerType: ["defense"],
//         //perceivability: "obvious",
//         duration: "Instant",
//         target: "Self Only",
//         range: "Self",
//         costEnd: false,
//         costPerLevel: 1 / 2
//     },
//     "FORCEFIELD": {
//         powerType: ["defense"],
//         name: "Resistant Protection",
//         duration: "Constant",
//         costEnd: true,
//         costPerLevel: 3 / 2
//     },
// }

// These (mostly 5e) powers are rebranded as 6e powers
// HERO.powersRebrand = {
//     "ARMOR": "FORCEFIELD"
// }

// For some reason the BASECOST of some modifiers/adder are 0, some are just wrong
HERO.ModifierOverride = {
    "ADDITIONALED": { BASECOST: 5 / 2 },
    "ADDITIONALPD": { BASECOST: 5 / 2 },
    "ALWAYSOCCURS": { BASECOST: 0, MULTIPLIER: 2 },
    "AOE": { dc: true },
    "ARMORPIERCING": { BASECOST: 0.25, dc: true },
    "AUTOFIRE": { dc: true },
    "AVAD": { dc: true },
    "BOOSTABLE": { dc: true },
    "CONTINUOUS": { dc: true },
    "CONTINUOUSCONCENTRATION": { BASECOST: -0.25 },
    "DAMAGEOVERTIME": { dc: true },
    "DEFBONUS": { BASECOST: 2 },
    "DIFFICULTTODISPEL": { BASECOST: 0.25 },
    "DIMENSIONS": { BASECOST: 5 },
    "DOESBODY": { dc: true },
    "DOUBLEKB": { dc: true },
    "ENDURANCERESERVEREC": { BASECOST: 2 / 3 },
    "ENERGY": { BASECOST: 5 }, // DAMAGENEGATION
    "HARDENED": { BASECOST: 0.25 },
    "IMPENETRABLE": { BASECOST: 0.25 },
    "IMPROVEDNONCOMBAT": { BASECOST: 5 },
    "MENTAL": { BASECOST: 5 }, // DAMAGENEGATION
    "PENETRATING": { BASECOST: 0.5, dc: true },
    "PHYSICAL": { BASECOST: 5 }, // DAMAGENEGATION
    "STICKY": { dc: true },
    "TIMELIMIT": { dc: true },
    "TRANSDIMENSIONAL": { dc: true },
    "TRIGGER": { dc: true },
    "UNCONTROLLED": { dc: true },
    "VARIABLEADVANTAGE": { dc: true },
    "VARIABLESFX": { dc: true },
}

// Valid Power Options (found these in Custom Power)
HERO.ValidPowerOptions = {
    "Range": {
        "SelfOnly": "Self Only",
        "None": "None",
        "Ranged": "Ranged",
        "LineOfSight": "Line of Sight",
    },
    "Duration": {
        "Instant": "Instant",
        "Constant": "Constant",
        "Persistent": "Persistent",
        "Inherent": "Inherent"
    },
    "Target": {
        "NA": "N/A",
        "SelfOnly": "Self Only",
        "DCV": "DCV",
        "DMCV": "DMCV",
        "HEX": "HEX",
    },
    "Defense": {
        "None": "None",
        "Normal": "Normal",
        "Mental": "Mental",
        "Power": "Power",
        "Flash": "Flash",
    },
    "Adders": {
        "Adjustment": "Adjustment Power",
        "Attack": "Attack Power",
        "BodyAffecting": "Body-Affecting Power",
        "Defense": "Defense Power",
        "Mental": "Mental Power",
        "Movement": "Movement Power",
        "SenseAffecting": "Sense-Affecting Power",
        "Sensory": "Sensory Power",
        "Size": "Size Power",
        "Special": "Special Power",
    },
}

HERO.areaOfEffect = {
    types: {
        none: "None",
        radius: "Radius",
        cone: "Cone",
        line: "Line",
        surface: "Surface",
        any: "Any Area"
    }
}

HERO.csl = {
    options: {
        SINGLE: "with any single attack",
        TIGHT: "with a small group of attacks",
        BROAD: "with a large group of attacks",
        HTH: "with HTH Combat",
        RANGED: "with Ranged Combat",
        ALL: "with All Attacks"
    }
}

HERO.mcsl = {
    options: {
        SINGLE: "with a single Mental Power",
        TIGHT: "with a group of Mental Powers",
        BROAD: "with all Mental Powers"
    }
}

HERO.stunBodyDamages = {
    "stunbody": "Stun and Body",
    "stunonly": "Stun only",
    "bodyonly": "Body only",
    "effectonly": "Effect only"
}

HERO.knockbackMultiplier = {
    0: "No Knockback",
    1: "Knockback",
    2: "Double Knockback"
}

HERO.SFX = [
    "Default",
    "Acid",
    "Alien",
    "Air/Wind",
    "Animal",
    "Body Control",
    "Chi",
    "Cosmic Energy",
    "Cyberkinesis",
    "Darkness",
    "Density Alteration",
    "Dimensional Manipulation",
    "Earth/Stone",
    "Electricity",
    "Emotion Control",
    "Fire/Heat",
    "Force",
    "Gravity",
    "Ice/Cold",
    "Illusion",
    "Kinetic Energy",
    "Light",
    "Luck",
    "Magic/Mystic",
    "Magnetism",
    "Martial Arts",
    "Matter Manipulation",
    "Mental/Psionic",
    "Metamorphic",
    "Precognition",
    "Radiation",
    "Serum Based",
    "Shape Alteration",
    "Size Alteration",
    "Sleep/Dream",
    "Solar/Celestial",
    "Sonic",
    "Speedster",
    "Strength/Toughness",
    "Stretching",
    "Telekinetic",
    "Teleportation",
    "Time",
    "Vibration",
    "Water",
    "Weather",
    "Wood/Plant",
    "Miscellaneous",
]

// HERO.Senses = {
//     "SIGHTGROUP": {
//         targeting: true
//     },
//     "HEARINGGROUP": {
//         targeting: false
//     },
//     "MENTALGROUP": {
//         targeting: false
//     },
//     "SMELLGROUP": {
//         targeting: false
//     },
//     "RADIOGROUP": {
//         targeting: false
//     },
//     "TOUCHGROUP": {
//         targeting: false
//     },
//     "DANGER_SENSE": {
//         targeting: false
//     },
//     "COMBAT_SENSE": {
//         targeting: false
//     },
//     "SPATIALAWARENESS": {
//         targeting: false
//     }
// }