export class Attack {
    static makeOcvModifier(ocvMod, XMLID, name) {
        return { ocvMod : ocvMod < 0 ? Math.ceil(ocvMod) : Math.floor(ocvMod), XMLID, name };
    }

    static addOcvModifier(target, ocvModifier) {
        target.ocvModifiers ??= [];
        target.ocvModifiers.push(ocvModifier);
        target.ocvModIds ??= {};
        target.ocvModIds[ocvModifier.XMLID] = ocvModifier;
        target.totalOcvMod = target.ocvModifiers.reduce((accumulator, currentValue) => accumulator + currentValue.ocvMod, 0);
    }

    // static getAutofireAttackTargetsNew(system, targetedTokens, autofireAttackInfo, formData) {
    //     const autofire = autofireAttackInfo.autofire;
    //     const autofireSkills = autofire.autofireSkills;
    //     const targets = [];
    //     let totalSkippedMeters = 0;
    //     autofire.singleTarget = targetedTokens.length === 1;
    //
    //     const assignedShots = {};
    //     // use the form values for number of shots _unless_ they are switching to/from one target
    //     if (formData) {
    //         targetedTokens.map((target) => {
    //             const shots_on_target_id = `shots_on_target_${target.id}`;
    //             const shotsOnTargetInput = formData[shots_on_target_id];
    //             if (shotsOnTargetInput) {
    //                 const shotValue = (typeof(shotsOnTargetInput) === "number") ? shotsOnTargetInput : parseInt(shotsOnTargetInput.match(/\d+/));
    //                 if (!isNaN(shotValue)) {
    //                     assignedShots[shots_on_target_id] = shotValue;
    //                 }
    //             }
    //         });
    //     }
    //
    //     for (let i = 0; i < targetedTokens.length; i++) {
    //         let shotsOnTarget = autofire.singleTarget
    //             ? autofire.autoFireShots
    //             : 1;
    //         const shots_on_target_id = `shots_on_target_${targetedTokens[i].id}`;
    //
    //         if (assignedShots[shots_on_target_id]) {
    //             shotsOnTarget = assignedShots[shots_on_target_id];
    //         }
    //         // these are the targeting data used for the attack(s)
    //         const targetingData = {
    //             autofire,
    //             targetId: targetedTokens[i].id,
    //             shotsOnTarget,
    //             results: [],
    //             shots_on_target_id: `shots_on_target_${targetedTokens[i].id}`,
    //         };
    //         if (i !== 0) {
    //             const prevTarget = targetedTokens[i - 1];
    //             const target = targetedTokens[i];
    //             const skippedMeters = canvas.grid.measureDistance(
    //                 prevTarget,
    //                 target,
    //                 { gridSpaces: true },
    //             );
    //             totalSkippedMeters += skippedMeters;
    //             console.log(
    //                 `skip ${skippedMeters} meters between ${prevTarget.name} and ${target.name}`,
    //             );
    //             targetingData.skippedMeters = skippedMeters;
    //             targetingData.skippedShots = autofireSkills.SKIPOVER
    //                 ? 0
    //                 : Math.floor(skippedMeters / 2 - 1); //todo: check zero
    //         } else {
    //             targetingData.skippedMeters = 0;
    //             targetingData.skippedShots = 0;
    //         }
    //         targetingData.range = canvas.grid.measureDistance(
    //             system.attacker,
    //             targetedTokens[i],
    //             { gridSpaces: true },
    //         );
    //         targetingData.ocv = Attack.getRangeModifier(
    //             system.item,
    //             targetingData.range,
    //         );
    //         targets.push(targetingData);
    //         autofire.totalShotsFired += targetingData.shotsOnTarget;
    //         autofire.totalShotsFired += autofireSkills.SKIPOVER
    //             ? 0
    //             : targetingData.skippedShots;
    //         autofire.totalShotsSkipped += targetingData.skippedShots;
    //     }
    //     autofire.autofireOCV = 0;
    //     if (!autofire.singleTarget) {
    //         if (autofireSkills.ACCURATE) {
    //             autofire.autofireOCV -= 1;
    //         } else {
    //             autofire.autofireOCV -= totalSkippedMeters / 2;
    //         }
    //         if (autofireSkills.CONCENTRATED) {
    //             autofire.autofireOCV -= 1;
    //         }
    //         if (autofireSkills.SKIPOVER) {
    //             autofire.autofireOCV -= 1;
    //         }
    //     }
    //     return targets;
    // }

    // static getAutofireAttackInfoNew(item, targetedTokens, formData) {
    //     const autofireMod = item.findModsByXmlid("AUTOFIRE");
    //     if (!autofireMod || targetedTokens.length === 0) {
    //         return null;
    //     }
    //     const attacker =
    //         item.actor.getActiveTokens()[0] || canvas.tokens.controlled[0];
    //     if (!attacker) return; // todo: message?
    //
    //     const autoFireShots = Attack.getAutofireMaxShots(item);
    //
    //     const autofireSkills = {};
    //     item.actor.items
    //         .filter((skill) => "AUTOFIRE_SKILLS" === skill.system.XMLID)
    //         .map((skill) => skill.system.OPTION)
    //         .forEach((skillOption) => (autofireSkills[skillOption] = true));
    //
    //     const system = {
    //         item,
    //         attacker,
    //         targetedTokens,
    //     }; // system attack info
    //
    //     const autofire = {
    //         autofireMod,
    //         autofireSkills,
    //         autoFireShots,
    //         totalShotsFired: 0,
    //         totalShotsSkipped: 0,
    //         autofireOCV: 0,
    //     }; // autofire attack info
    //
    //     const autofireAttackInfo = {
    //         item,
    //         autofire,
    //         charges: item.system.charges,
    //     };
    //
    //     // use the form values for number of shots _unless_ they are switching to/from one target
    //     const assignedShots = {};
    //     if (formData) {
    //         targetedTokens.map((target) => {
    //             const shots_on_target_id = `shots_on_target_${target.id}`;
    //             const shotsOnTargetInput = formData[shots_on_target_id];
    //             if (shotsOnTargetInput) {
    //                 const shotValue = (typeof(shotsOnTargetInput) === "number") ? shotsOnTargetInput : parseInt(shotsOnTargetInput.match(/\d+/));
    //                 if (!isNaN(shotValue)) {
    //                     assignedShots[shots_on_target_id] = shotValue;
    //                 }
    //             }
    //         });
    //     }
    //
    //     autofireAttackInfo.targets = Attack.getAutofireAttackTargetsNew(
    //         system,
    //         targetedTokens,
    //         autofireAttackInfo,
    //         formData,
    //     );
    //     autofireAttackInfo.targetIds = {};
    //     autofireAttackInfo.targets.forEach((target) => {
    //         if(target.target?.id){
    //             autofireAttackInfo.targetIds[target.target.id] = target;
    //         }
    //         else{
    //             autofireAttackInfo.targetIds[target.targetId] = target;
    //         }
    //     });
    //     return autofireAttackInfo;
    // }

    static addMultipleAttack(data) {
        if (!data.action?.maneuver?.attackKeys?.length) {
            return false;
        }
        const index = data.action.maneuver.attackKeys.length;
        const attackKey = `attack-${index}`;
        const itemKey = data.item.actor.items.find((item) => "STRIKE" === item.system.XMLID).id;
        const targetKey = data.action.targetedTokens?.length ? data.action.targetedTokens[0].id : "NONE";
        const multipleAttackKeys = { itemKey, attackKey, targetKey };
        data.action.maneuver[attackKey] = multipleAttackKeys;
        data.action.maneuver.attackKeys.push(multipleAttackKeys);
        data.formData ??= {};
        data.action.maneuver.attackKeys.forEach((attackKeys) => {
            data.formData[`${attackKeys.attackKey}-target`] = attackKeys.targetKey;
            data.formData[attackKeys.attackKey] = attackKeys.itemKey;
        });
        return true;
    }

    static trashMultipleAttack(data, attackKey) {
        if (!data.action?.maneuver?.attackKeys?.length || !attackKey) {
            return false;
        }
        console.log(`trash ${attackKey}`);
        console.log(`data:`, data);
        const indexToRemove = data.action.maneuver.attackKeys.findIndex((multipleAttackKeys) => {
            return multipleAttackKeys.attackKey === attackKey;
        });
        data.action.maneuver.attackKeys.splice(indexToRemove, 1);
        // all the info is in the array; reconstruct the properties
        const keyToRemove = `attack-${data.action.maneuver.attackKeys.length}`;
        delete data.action.maneuver[keyToRemove];
        for (let i = 0; i < data.action.maneuver.attackKeys.length; i++) {
            const multipleAttackKeys = data.action.maneuver.attackKeys[i];
            const attackKey = `attack-${i}`;
            multipleAttackKeys.attackKey = attackKey;
            data[attackKey] = multipleAttackKeys;
        }
        data.formData ??= {};
        if (data.formData[keyToRemove]) {
            delete data.formData[keyToRemove];
        }
        if (data.formData[`${keyToRemove}-target`]) {
            delete data.formData[`${keyToRemove}-target`];
        }
        data.action.maneuver.attackKeys.forEach((attackKeys) => {
            data.formData[`${attackKeys.attackKey}-target`] = attackKeys.targetKey;
            data.formData[attackKeys.attackKey] = attackKeys.itemKey;
        });
        console.log(`data:`, data);
        return true;
    }

    static getAttackerToken(item) {
        const attackerToken = item.actor.getActiveTokens()[0] || canvas.tokens.controlled[0];
        if (!attackerToken) {
            console.error("There is no actor token!");
        }
        return attackerToken;
    }

    static getRangeModifier(item, range) {
        const actor = item.actor;

        if (item.system.range === "self") {
            // TODO: Should not be able to use this on anyone else. Should add a check.
            console.log("item.system.range === self && range:", range);
            return 0;
        }

        // TODO: Should consider if the target's range exceeds the power's range or not and display some kind of warning
        //       in case the system has calculated it incorrectly.

        const noRangeModifiers = !!item.findModsByXmlid("NORANGEMODIFIER");
        const normalRange = !!item.findModsByXmlid("NORMALRANGE");

        // There are no range penalties if this is a line of sight power or it has been bought with
        // no range modifiers.
        if (!(item.system.range === "los" || noRangeModifiers || normalRange)) {
            const factor = actor.system.is5e ? 4 : 8;

            let rangePenalty = -Math.ceil(Math.log2(range / factor)) * 2;
            rangePenalty = rangePenalty > 0 ? 0 : rangePenalty;

            // Brace (+2 OCV only to offset the Range Modifier)
            const braceManeuver = item.actor.items.find(
                (item) => item.type == "maneuver" && item.name === "Brace" && item.system.active,
            );
            if (braceManeuver) {
                //TODO: ???
            }
            return Math.floor(rangePenalty);
        }
        return 0;
    }

    static getTargetInfo(item, targetedToken, options, system) {
        // these are the targeting data used for the attack(s)
        const target = {
            targetId: targetedToken.id,
            ocvModifiers: [],
            results: [], // todo: for attacks that roll one effect and apply to multiple targets do something different here
        };
        target.range = canvas.grid.measureDistance(system.attackerToken, targetedToken, { gridSpaces: true });
        Attack.addOcvModifier(
            target,
            Attack.makeOcvModifier(Attack.getRangeModifier(item, target.range), "RANGE", "Range"),
        );
        return target;
    }

    static getAutofireMaxShots(item) {
        const autofireMod = item.findModsByXmlid("AUTOFIRE");
        if (!autofireMod) {
            return 0;
        }
        // OPTION_ALIAS is a string, ex: "5 Shots"
        let autoFireShots = parseInt(autofireMod.OPTION_ALIAS.match(/\d+/)) ?? 0;
        autofireMod?.ADDER?.forEach((adder) => {
            if (adder.XMLID === "DOUBLE") {
                let shotsMultiplier = parseInt(adder.LEVELS.match(/\d+/)) ?? 0;
                if (shotsMultiplier) {
                    autoFireShots *= Math.pow(2, shotsMultiplier);
                }
            }
        });
        return autoFireShots;
    }
    static getAutofireAssignedShots(item, targetedTokens, options, system, targets) {
        // assigned shots on target
        let totalShotsFired = 0;
        const assignedShots = {};
        if (options) {
            // preserve input data
            targetedTokens.map((target) => {
                const shots_on_target_id = `shots_on_target_${target.id}`;
                const shotsOnTargetInput = options[shots_on_target_id];
                if (shotsOnTargetInput) {
                    const shotValue =
                        typeof shotsOnTargetInput === "number"
                            ? shotsOnTargetInput
                            : parseInt(shotsOnTargetInput.match(/\d+/));
                    if (!isNaN(shotValue)) {
                        assignedShots[shots_on_target_id] = shotValue;
                    }
                }
            });
        }
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            const targetId = target.targetId;
            let shotsOnTarget = target.autofire.singleTarget ? target.autofire.autoFireShots : 1;
            const shots_on_target_id = `shots_on_target_${targetId}`;
            if (assignedShots[shots_on_target_id]) {
                shotsOnTarget = assignedShots[shots_on_target_id];
            }
            target.shotsOnTarget = shotsOnTarget;
            target.shots_on_target_id = `shots_on_target_${targetId}`;
            totalShotsFired += target.shotsOnTarget;
        }
        return totalShotsFired;
    }
    
    static getAutofireSkippedShots(item, targetedTokens, options, system, targets) {
        // figure skipped distances
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            const targetId = target.targetId;
            if (i === 0) {
                target.skippedMeters = 0;
                target.skippedShots = 0;
            } else {
                const prevTarget = system.token[targets[i - 1].targetId];
                const targetToken = system.token[targetId];
                const skippedMeters = canvas.grid.measureDistance(prevTarget, targetToken, { gridSpaces: true });
                console.log(`skip ${skippedMeters} meters between ${prevTarget.name} and ${targetToken.name}`);
                target.skippedMeters = skippedMeters;
                let skippedShots = Math.floor(skippedMeters / 2 - 1);
                target.skippedShots = target.autofire.autofireSkills.SKIPOVER ? 0 : skippedShots < 0 ? 0 : skippedShots;
            }
        }
        return {
            shots : targets.reduce((accumulator, target) => accumulator + target.skippedShots, 0),
            meters : targets.reduce((accumulator, target) => accumulator + target.skippedMeters, 0)
        };
    }

    static getAutofireInfo(item, targetedTokens, options, system, targets) {
        const autofireMod = item.findModsByXmlid("AUTOFIRE");
        if (!autofireMod || targetedTokens.length === 0) {
            return null;
        }
        const autoFireShots = Attack.getAutofireMaxShots(item);
        const singleTarget = targetedTokens.length === 1;

        const autofireSkills = {};
        item.actor.items
            .filter((skill) => "AUTOFIRE_SKILLS" === skill.system.XMLID)
            .forEach((skill) => (autofireSkills[skill.system.OPTION] = skill.system));

        const autofire = {
            autofireMod, // autofire mod is all text, so it can live here
            autofireSkills,
            autoFireShots,
            singleTarget,
        }; // autofire attack info
        
        for (let i = 0; i < targets.length; i++) {
            targets[i].autofire = autofire;
        }

        const skipped = Attack.getAutofireSkippedShots(item, targetedTokens, options, system, targets);
        autofire.totalShotsSkipped = skipped.shots;
        autofire.totalSkippedMeters = skipped.meters;

        autofire.totalShotsFired = targets.reduce(
            (accumulator, target) => accumulator + (autofireSkills.SKIPOVER ? 0 : target.skippedShots),
            Attack.getAutofireAssignedShots(item, targetedTokens, options, system, targets),
        );

        // perhaps roll these onto the target? easier to assemble in the display?
        if (!singleTarget) {
            if (autofireSkills.ACCURATE) {
                Attack.addOcvModifier(autofire, Attack.makeOcvModifier(-1, autofireSkills.ACCURATE.XMLID, autofireSkills.ACCURATE.OPTION_ALIAS),);
            } else {
                Attack.addOcvModifier(autofire, Attack.makeOcvModifier(autofire.totalSkippedMeters / -2, autofireMod.XMLID, autofireMod.ALIAS));
            }
            if (autofireSkills.CONCENTRATED) {
                Attack.addOcvModifier(autofire, Attack.makeOcvModifier(-1, autofireSkills.CONCENTRATED.XMLID, autofireSkills.CONCENTRATED.OPTION_ALIAS),);
            }
            if (autofireSkills.SKIPOVER) {
                Attack.addOcvModifier(autofire, Attack.makeOcvModifier(-1, autofireSkills.SKIPOVER.XMLID, autofireSkills.SKIPOVER.OPTION_ALIAS));
            }
        }
        return autofire;
    }

    static getAttackInfo(item, targetedTokens, options, system) {
        const targets = [];
        for (let i = 0; i < targetedTokens.length; i++) {
            const target = Attack.getTargetInfo(item, targetedTokens[i], options, system);
            targets.push(target);
        }
        const attack = {
            itemId: item.id,
            targets,
            charges: item.system.charges
        };
        const autofire = Attack.getAutofireInfo(item, targetedTokens, options, system, targets);
        if (autofire) {
            attack.autofire = autofire;
            autofire.ocvModifiers?.forEach((ocvMod)=>{Attack.addOcvModifier(attack, ocvMod);});
        }

        return attack;
    }

    static getHaymakerAttackInfo(item, targetedTokens, options, system) {
        const attack = Attack.getAttackInfo(item, targetedTokens, options, system);
        return attack;
    }

    static getMultipleAttackManeuverInfo(item, targetedTokens, options, system) {
        const maneuver = {
            attackerTokenId: system.attackerToken?.id ?? null,
            isMultipleAttack: true,
            itemId: item.id,
        };
        if (options) {
            const keys = [];
            let count = 0;
            while (options[`attack-${count}`]) {
                const targetKey = options[`attack-${count}-target`];
                const attackKey = `attack-${count}`; // attackKey is 'attack-1' etc
                const itemKey = options[attackKey];
                const attackKeys = { itemKey, attackKey, targetKey };
                maneuver[attackKey] = attackKeys;
                keys.push(attackKeys);
                maneuver.attackKeys = keys;
                count++;
            }
        }
        // Initialize multiple attack to the default option values
        maneuver.attackKeys ??= targetedTokens.map((target, index) => {
            return {
                itemKey: item.actor.items.find((item) => "STRIKE" === item.system.XMLID).id,
                attackKey: `attack-${index}`,
                targetKey: target.id,
            };
        });
        maneuver.attacks = [];
        const actor = item.actor;
        for (let i = 0; i < maneuver.attackKeys.length; i++) {
            const attackKeys = maneuver.attackKeys[i];
            maneuver[`attack-${i}`] = attackKeys;
            const multiAttackItem = actor.items.get(attackKeys.itemKey);
            let multiAttackTarget = system.targetedTokens.find((target) => attackKeys.targetKey === target.id);
            multiAttackTarget ??= system.targetedTokens[0];
            maneuver.attacks.push(Attack.getAttackInfo(multiAttackItem, [multiAttackTarget], options, system));
        }
        maneuver.ocvMod = Math.max(maneuver.attacks.length - 1, 0) * -2; // per rules every attack after the first is a cumulative -2 OCV on all attacks
        return maneuver;
    }

    static getHaymakerManeuverInfo(item, targetedTokens, options, system) {
        const attacks = [Attack.getHaymakerAttackInfo(item, targetedTokens, options, system)];
        return {
            attackerTokenId: system.attackerToken?.id ?? null,
            isHaymakerAttack: true,
            attacks,
            itemId: item.id,
        };
    }

    static getManeuverInfo(item, targetedTokens, options, system) {
        const isMultipleAttack = item.system.XMLID === "MULTIPLEATTACK";
        const isHaymakerAttack = item.system.XMLID === "HAYMAKER";
        // todo: Combined Attack
        // todo: martial maneuver plus a weapon
        // todo: Compound Power
        // answer: probably a specialized use case of multiple attack

        if (isMultipleAttack) {
            return Attack.getMultipleAttackManeuverInfo(item, targetedTokens, options, system);
        }
        if (isHaymakerAttack) {
            return Attack.getHaymakerManeuverInfo(item, targetedTokens, options, system);
        }
        return {
            attackerTokenId: system.attackerToken?.id ?? null,
            attacks: [Attack.getAttackInfo(item, targetedTokens, options, system)],
            itemId: item.id,
        };
    }

    static getCurrentManeuverInfo(maneuver, options, system) {
        if (options?.execute !== undefined && maneuver.isMultipleAttack) {
            let lastAttackHit = true;
            options?.rolledResult?.forEach((roll) => {
                console.log("roll result:", roll.result.hit);
                if (roll.result.hit === "Miss") {
                    lastAttackHit = false;
                }
            });
            let execute = options.execute;
            if (lastAttackHit === false) {
                const attackKey = `attack-${execute - 1}`;
                const attackKeys = maneuver[attackKey];
                const maneuverItem = system.attackerToken.actor.items.get(attackKeys.itemKey);
                const maneuverTarget = system.targetedTokens.find((token) => token.id === attackKeys.targetKey);
                maneuver.missed = {
                    execute,
                    targetName: maneuverTarget.name,
                    itemName: maneuverItem.name,
                };
                console.log(
                    `RWC attack number ${execute} missed ${maneuver.missed.targetName} with ${maneuver.missed.itemName} in a multiple attack: remaining attacks forfeit END and charges to no effect`,
                );

                return maneuver;
            }
            const attackKey = `attack-${execute}`;
            const attackKeys = maneuver[attackKey];
            const maneuverItem = system.attackerToken.actor.items.get(attackKeys.itemKey);
            const maneuverTarget = system.targetedTokens.find((token) => token.id === attackKeys.targetKey);
            const current = this.getManeuverInfo(maneuverItem, [maneuverTarget], options, system);
            current.execute = execute;
            current.step = attackKey;

            // avoid saving forge objects, except in system
            system.item[maneuverItem.id] = maneuverItem;
            system.currentItem = maneuverItem;
            system.currentTargets = [maneuverTarget];

            const multipleAttackItem = system.item[maneuver.itemId];
            const xmlid = multipleAttackItem.system.XMLID;
            // keep range mods to ourselves until we can agree on a single solution
            // current.attacks.forEach((attack)=>{ attack.targets.forEach((target)=>{
            //     current.ocvModifiers = [].concat(current.ocvModifiers, target.ocvModifiers );
            // }); });
            Attack.addOcvModifier(current, Attack.makeOcvModifier(maneuver.ocvMod, xmlid, multipleAttackItem.name));

            return current;
        }
        return maneuver;
    }

    static getActionInfo(item, targetedTokens, options) {
        // do I need to safety things here?
        if (!item) {
            console.error("There is no attack item!");
            return null;
        }
        const attackerToken = Attack.getAttackerToken(item);
        const system = {
            attackerToken,
            currentItem: item,
            currentTargets: targetedTokens,
            targetedTokens,
            item: {},
            token: {},
        };
        system.item[item.id] = item;
        system.token[attackerToken.id] = attackerToken;
        for (let i = 0; i < targetedTokens.length; i++) {
            system.token[targetedTokens[i].id] = targetedTokens[i];
        }

        const maneuver = Attack.getManeuverInfo(item, targetedTokens, options, system); // this.getManeuverInfo(item, targetedTokens, formData);
        const current = Attack.getCurrentManeuverInfo(maneuver, options, system); // get current attack as a 'maneuver' with just the currently executing attack options
        const action = {
            maneuver,
            current,
            system,
        };
        return action;
    }
}
