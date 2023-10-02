import { modifyRollEquation, getTokenChar, getPowerInfo } from "../utility/util.js";
import { determineDefense } from "../utility/defense.js";
import { HeroSystem6eActorActiveEffects } from "../actor/actor-active-effects.js";
import { HEROSYS } from "../herosystem6e.js";
import { RoundFavorPlayerDown, RoundFavorPlayerUp } from "../utility/round.js";
import {
    determineStrengthDamage, determineExtraDiceDamage,
    simplifyDamageRoll, convertToDC, handleDamageNegation,
    CombatSkillLevelsForAttack, convertToDcFromItem, convertFromDC
} from "../utility/damage.js";
import { damageRollToTag } from "../utility/tag.js";
import { AdjustmentMultiplier } from "../utility/adjustment.js";
import { isPowerSubItem } from "../powers/powers.js";
import { updateItemDescription } from "../utility/upload_hdc.js";
import { RequiresASkillRollCheck } from "../item/item.js";
import { ItemAttackFormApplication } from "../item/item-attack-application.js"

export async function chatListeners(html) {
    // Called by card-helpers.js
    html.on('click', 'button.roll-damage', this._onRollDamage.bind(this));
    html.on('click', 'button.apply-damage', this._onApplyDamage.bind(this));
    html.on('click', 'button.rollAoe-damage', this._onRollAoeDamage.bind(this));
    //html.on('click', 'button.place-template', this._onPlaceTemplate.bind(this));
}

export async function onMessageRendered(html) {

    //[data-visibility="gm"]
    if (!game.user.isGM) {
        html.find(`[data-visibility="gm"]`).remove();
    }

    // visibility based on actor owner
    let element = html.find('div [data-visibility]')
    if (element) {
        let actorId = element.data("visibility")
        if (actorId) {
            let actor = game.actors.get(actorId)
            if (actor && !actor.isOwner) {
                element.remove();
            }
        }
        //console.log(element)
    }
}

/// Dialog box for AttackOptions
export async function AttackOptions(item, event) {
    //const clickedElement = $(event.currentTarget);
    const actor = item.actor;
    //const tokenId = clickedElement.closest("form[data-token-id]")?.dataset?.tokenId;
    const token = actor.getActiveTokens()[0];

    if (!actor.canAct(true)) return;

    const data = {
        item: item,
        actor: actor,
        token: token,
        state: null,
        str: item.actor.system.characteristics.str.value
    }

    // Uses Tk
    let tkItems = item.actor.items.filter(o => o.system.rules == "TELEKINESIS");
    let tkStr = 0
    for (const item of tkItems) {
        tkStr += parseInt(item.system.LEVELS.value) || 0
    }
    if (item.system.usesTk) {
        if (item.system.usesStrength) {
            data.str += tkStr
        } else {
            data.str = tkStr
        }
    }

    if (["MOVEBY", "MOVETHROUGH"].includes(item.system.XMLID)) {
        data.showVelocity = true;
        data.velocity = 0;

        const tokens = item.actor.getActiveTokens();
        const token = tokens[0];
        const combatants = game?.combat?.combatants;
        if (combatants && typeof dragRuler != 'undefined') {

            if (token) {

                let distance = dragRuler.getMovedDistanceFromToken(token);
                let speed = dragRuler.getRangesFromSpeedProvider(token)[1].range;
                let delta = distance;
                if (delta > speed / 2) {
                    delta = speed - delta;
                }
                data.velocity = delta * 5;

            }
        }

        // Simplistic velocity calc using dragRuler
        if (data.velocity === 0 && token) {
            if (typeof dragRuler != 'undefined') {
                if (dragRuler.getRangesFromSpeedProvider(token).length > 1) {
                    data.velocity = parseInt(dragRuler.getRangesFromSpeedProvider(token)[1].range || 0);
                }
            }
        }

        // Simplistic velocity calc using running & flight
        if (data.velocity === 0) {
            data.velocity = parseInt(item.actor.system.characteristics.running.value || 0);
            data.velocity = Math.max(data.velocity, parseInt(item.actor.system.characteristics.flight.value || 0));
        }

    }

    const aoe = item.findModsByXmlid("AOE");

    if (game.settings.get("hero6efoundryvttv2", "hit locations") && !item.system.noHitLocations && !aoe) {
        data.useHitLoc = true;
        data.hitLoc = CONFIG.HERO.hitLocations;

        // Penalty Skill Levels
        const PENALTY_SKILL_LEVELS = actor.items.find(o => o.system.XMLID === "PENALTY_SKILL_LEVELS")
        if (PENALTY_SKILL_LEVELS) {
            data.PENALTY_SKILL_LEVELS = PENALTY_SKILL_LEVELS
        }
    }



    // Combat Skill Levels
    const csl = CombatSkillLevelsForAttack(item);
    if (csl && csl.skill) {
        let _ocv = csl.omcv > 0 ? 'omcv' : 'ocv';
        data.cslChoices = { [_ocv]: _ocv };
        if (csl.skill.system.OPTION != "SINGLE") {
            data.cslChoices.dcv = "dcv";
            data.cslChoices.dc = "dc";
        }

        // CSL radioBoxes names
        data.csl = []
        for (let c = 0; c < parseInt(csl.skill.system.LEVELS.value); c++) {
            data.csl.push({ name: `system.csl.${c}`, value: csl.skill.system.csl ? csl.skill.system.csl[c] : 'undefined' })
        }
    }

    const template = "systems/hero6efoundryvttv2/templates/attack/item-attack-card.hbs"
    const html = await renderTemplate(template, data)


    // Testing out a replacement for the dialog box.
    // This would allow for more interactive CSL.
    // This may allow better workflow for AOE and placement of templates.
    delete await new ItemAttackFormApplication(data).render(true);


    // return new Promise(resolve => {
    //     const data = {
    //         title: item.actor.name + " roll to hit",
    //         content: html,
    //         buttons: {
    //             normal: {
    //                 label: "Roll to Hit",
    //                 callback: html => resolve(
    //                     _processAttackOptions(item, html[0].querySelector("form"))
    //                 )
    //             },
    //             // cancel: {
    //             //   label: "cancel",
    //             //   callback: html => resolve({canclled: true})
    //             // }
    //         },
    //         default: "normal",
    //         close: () => resolve({ cancelled: true })
    //     }
    //     new Dialog(data, null).render(true)
    // });

}

export async function _processAttackOptions(item, formData) {
    await AttackToHit(item, formData)
}

export async function _processAttackAoeOptions(item, formData) {
    await AttackAoeToHit(item, formData)
}


export async function AttackAoeToHit(item, options) {
    let template = "systems/hero6efoundryvttv2/templates/chat/item-toHitAoe-card.hbs"

    const actor = item.actor
    if (!actor) {
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    const token = actor.getActiveTokens()[0]
    if (!token) {
        return ui.notifications.error(`Token was not found.`);
    }

    const aoeTemplate = game.scenes.current.templates.find(o => o.flags.itemId === item.id) ||
        game.scenes.current.templates.find(o => o.user.id === game.user.id);
    if (!aoeTemplate) {
        return ui.notifications.error(`Attack AOE template was not found.`);
    }

    let distanceToken = canvas.grid.measureDistance(aoeTemplate, token, { gridSpaces: true });
    let dcvTargetNumber = 0
    if (distanceToken > (actor.system.is5e ? 1 : 2)) {
        dcvTargetNumber = 3
    }

    const aoe = item.findModsByXmlid("AOE");
    const SELECTIVETARGET = aoe?.adders ? aoe.ADDER.find(o => o.XMLID === "SELECTIVETARGET") : null;

    const hitCharacteristic = actor.system.characteristics.ocv.value;
    let tags = []

    let rollEquation = "11 + " + hitCharacteristic;
    tags.push({ value: hitCharacteristic, name: item.system.uses })
    rollEquation = rollEquation + " - 3D6";

    const ocvMod = parseInt(options.ocvMod) || 0
    if (parseInt(ocvMod) != 0) {

        rollEquation = modifyRollEquation(rollEquation, ocvMod);
        tags.push({ value: ocvMod, name: item.name })
    }

    // Set +1 OCV
    const setManeuver = item.actor.items.find(o => o.type == 'maneuver' && o.name === 'Set' && o.system.active)
    if (setManeuver) {
        tags.push({ value: parseInt(setManeuver.system.ocv), name: setManeuver.name })
        rollEquation = modifyRollEquation(rollEquation, parseInt(setManeuver.system.ocv));
    }

    if (true) { //itemData?.uses === "ocv") {

        // Educated guess for token
        let factor = actor.system.is5e ? 4 : 8;
        let rangePenalty = -Math.ceil(Math.log2(distanceToken / factor)) * 2;

        if (rangePenalty) {
            tags.push({ value: rangePenalty.signedString(), name: "range penalty" })
            rollEquation = modifyRollEquation(rollEquation, rangePenalty);
        }

        // Brace (+2 OCV only to offset the Range Modifier)
        const braceManeuver = item.actor.items.find(o => o.type == 'maneuver' && o.name === 'Brace' && o.system.active)
        if (braceManeuver) {
            let brace = Math.min(-rangePenalty, braceManeuver.system.ocv);
            if (brace > 0) {
                tags.push({ value: brace, name: braceManeuver.name })
                rollEquation = modifyRollEquation(rollEquation, brace);
            }

        }
    }


    let attackRoll = new Roll(rollEquation, actor.getRollData());
    let result = await attackRoll.evaluate({ async: true });
    let renderedResult = await result.render();
    let hitRollData = result.total;
    let hitRollText = "AOE origin SUCCESSFULLY hits a DCV of " + hitRollData;

    if (hitRollData < dcvTargetNumber) {
        let missBy = dcvTargetNumber - hitRollData;
        let facingRoll = new Roll("1d6", actor.getRollData());
        let facingResult = await facingRoll.evaluate({ async: true });
        let moveDistance = RoundFavorPlayerDown(Math.min(distanceToken / 2, (item.actor.system.is5e ? missBy : missBy * 2)))
        hitRollText = `AOE origin MISSED by ${missBy}.  Move AOE origin ${moveDistance + (item.actor.system.is5e ? "\"" : "m")} in the <b>${facingResult.total}</b> direction.`;

    }

    let cardData = {
        // dice rolls
        //rolls: [attackRoll],
        renderedHitRoll: renderedResult,
        hitRollText: hitRollText,
        hitRollValue: result.total,
        // velocity: options.velocity,

        // data for damage card
        actor,
        item,
        //adjustment,
        //senseAffecting,
        ...options,
        //hitRollData: hitRollData,
        //effectivestr: options.effectivestr,
        //targetData: targetData,
        //targetIds: targetIds,

        // endurance
        //useEnd: useEnd,
        //enduranceText: enduranceText,

        // misc
        tags: tags,
        attackTags: getAttackTags(item),
        formData: JSON.stringify(options),
        dcvTargetNumber,
        buttonText: (SELECTIVETARGET ? "Confirm AOE placement<br>and selected targets (SHIFT-T to unselect)" : "Confirm AOE placement")

    };

    let cardHtml = await renderTemplate(template, cardData)
    //let token = actor.token;
    let speaker = ChatMessage.getSpeaker({ actor: actor, token })
    speaker["alias"] = actor.name;

    const chatData = {
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll: result,
        user: game.user._id,
        content: cardHtml,
        speaker: speaker,
    }

    return ChatMessage.create(chatData)
}


/// ChatMessage showing Attack To Hit
export async function AttackToHit(item, options) {
    let template = "systems/hero6efoundryvttv2/templates/chat/item-toHit-card.hbs"

    if (!item) {
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    const actor = item.actor
    const itemId = item._id
    const itemData = item.system;
    let tags = []



    const hitCharacteristic = actor.system.characteristics[itemData.uses].value;

    let toHitChar = CONFIG.HERO.defendsWith[itemData.targets];

    let automation = game.settings.get("hero6efoundryvttv2", "automation");

    //const powers = (!actor || actor.system.is5e) ? CONFIG.HERO.powers5e : CONFIG.HERO.powers
    const adjustment = getPowerInfo({ xmlid: item.system.XMLID })?.powerType?.includes("adjustment");
    const senseAffecting = getPowerInfo({ xmlid: item.system.XMLID })?.powerType?.includes("sense-affecting")

    // -------------------------------------------------
    // attack roll
    // -------------------------------------------------
    let rollEquation = "11 + " + hitCharacteristic;
    tags.push({ value: hitCharacteristic.signedString(), name: itemData.uses })

    const ocvMod = parseInt(options.ocvMod) || 0
    const dcvMod = parseInt(options.dcvMod) || 0
    if (parseInt(ocvMod) != 0) {

        rollEquation = modifyRollEquation(rollEquation, ocvMod);
        tags.push({ value: ocvMod.signedString(), name: item.name })
    }

    // Set +1 OCV
    const setManeuver = item.actor.items.find(o => o.type == 'maneuver' && o.name === 'Set' && o.system.active)
    if (setManeuver) {
        tags.push({ value: parseInt(setManeuver.system.ocv).signedString(), name: setManeuver.name })
        rollEquation = modifyRollEquation(rollEquation, parseInt(setManeuver.system.ocv));
    }

    // Calc Distance if we have a target (and using ocv; dcv is typically line of sight)
    if (game.user.targets.size > 0 && itemData?.uses === "ocv") {

        // Educated guess for token
        let token = actor.getActiveTokens()[0];
        let target = game.user.targets.first()
        let distance = canvas.grid.measureDistance(token, target, { gridSpaces: true });
        let factor = actor.system.is5e ? 4 : 8;
        let rangePenalty = -Math.ceil(Math.log2(distance / factor)) * 2;

        if (rangePenalty) {
            tags.push({ value: rangePenalty.signedString(), name: "range penalty" })
            rollEquation = modifyRollEquation(rollEquation, rangePenalty);
        }

        // Brace (+2 OCV only to offset the Range Modifier)
        const braceManeuver = item.actor.items.find(o => o.type == 'maneuver' && o.name === 'Brace' && o.system.active)
        if (braceManeuver) {
            let brace = Math.min(-rangePenalty, braceManeuver.system.ocv);
            if (brace > 0) {
                tags.push({ value: brace, name: braceManeuver.name })
                rollEquation = modifyRollEquation(rollEquation, brace);
            }

        }
    }

    //}

    // Combat Skill Levels
    let csl = CombatSkillLevelsForAttack(item);
    if (csl.ocv || csl.omcv > 0) {
        rollEquation = modifyRollEquation(rollEquation, csl.ocv || csl.omcv);
        tags.push({ value: csl.ocv.signedString() || csl.omcv, name: csl.item.name })
    }

    let dcv = parseInt(item.system.dcv || 0) + csl.dcv
    let dmcv = parseInt(item.system.dmcv || 0) + csl.dmcv

    // Haymaker -5 DCV
    const haymakerManeuver = item.actor.items.find(o => o.type == 'maneuver' && o.name === 'Haymaker' && o.system.active)
    if (haymakerManeuver) {
        dcv -= 4;
    }

    if (dcv != 0 || dmcv != 0) {

        // Make sure we don't already have this activeEffect
        let prevActiveEffect = Array.from(item.actor.allApplicableEffects()).find(o => o.origin === item.uuid);
        if (!prevActiveEffect) {

            // Estimate of how many seconds the DCV penalty lasts (until next phase).
            // In combat.js#_onStartTurn we remove this AE for exact timing.
            let seconds = Math.ceil(12 / parseInt(item.actor.system.characteristics.spd.value));

            let _dcvText = 'DCV'
            let _dcvValue = dcv;

            if (dmcv != 0) {
                _dcvText = 'DMCV'
                _dcvValue = dmcv;
            }

            let activeEffect = {
                label: `${item.name} ${_dcvValue.signedString()} ${_dcvText}`,
                icon: (dcv) < 0 ? "icons/svg/downgrade.svg" : "icons/svg/upgrade.svg",
                changes: [
                    { key: `system.characteristics.${_dcvText.toLowerCase()}.value`, value: _dcvValue, mode: CONST.ACTIVE_EFFECT_MODES.ADD },
                ],
                origin: item.uuid,
                duration: {
                    seconds: seconds,
                },
                flags: {
                    nextPhase: true,
                }
            }
            //await item.addActiveEffect(activeEffect);
            await item.actor.createEmbeddedDocuments("ActiveEffect", [activeEffect]);
        }

    }




    // [x Stun, x N Stun, x Body, OCV modifier]
    let noHitLocationsPower = item.system.noHitLocations || false;
    if (game.settings.get("hero6efoundryvttv2", "hit locations") && options.aim && options.aim !== "none" && !noHitLocationsPower) {
        rollEquation = modifyRollEquation(rollEquation, CONFIG.HERO.hitLocations[options.aim][3]);
        tags.push({ value: CONFIG.HERO.hitLocations[options.aim][3].signedString(), name: options.aim, hidePlus: CONFIG.HERO.hitLocations[options.aim][3] < 0 })

        // Penalty Skill Levels
        if (options.usePsl) {
            const PENALTY_SKILL_LEVELS = actor.items.find(o => o.system.XMLID === "PENALTY_SKILL_LEVELS")
            if (PENALTY_SKILL_LEVELS) {
                let pslValue = Math.min(PENALTY_SKILL_LEVELS.system.LEVELS.value, Math.abs(CONFIG.HERO.hitLocations[options.aim][3]))
                rollEquation = modifyRollEquation(rollEquation, pslValue);
                tags.push({ value: pslValue.signedString(), name: PENALTY_SKILL_LEVELS.name, title: PENALTY_SKILL_LEVELS.system.description })
            }

        }
    }
    rollEquation = rollEquation + " - 3D6";

    let attackRoll = new Roll(rollEquation, actor.getRollData());
    let result = await attackRoll.evaluate({ async: true });
    let renderedResult = await result.render();

    let hitRollData = result.total;
    let hitRollText = "Hits a " + toHitChar + " of " + hitRollData;







    // Endurance
    //let strEnd = Math.max(1, Math.round(str / 10))
    //item.system.endEstimate += strEnd

    let useEnd = false;
    let enduranceText = "";
    if (game.settings.get("hero6efoundryvttv2", "use endurance")) {
        useEnd = true;
        let valueEnd = actor.system.characteristics.end.value
        let itemEnd = parseInt(item.system.end) || 0
        let newEnd = valueEnd - itemEnd;
        let spentEnd = itemEnd;
        options.effectiveStr = options.effectiveStr || 0;

        if (itemData.usesStrength || itemData.usesTk) {
            // let strEnd = Math.max(1, Math.round(actor.system.characteristics.str.value / 10))
            // if (options.effectivestr <= actor.system.characteristics.str.value) {
            //     strEnd = Math.round(options.effectivestr / 10);
            // }
            let strEnd = Math.max(1, Math.round(options.effectiveStr / 10));
            item.system.endEstimate += strEnd

            newEnd = parseInt(newEnd) - parseInt(strEnd);
            spentEnd = parseInt(spentEnd) + parseInt(strEnd);
        }

        const enduranceReserve = item.actor.items.find(o => o.system.XMLID === "ENDURANCERESERVE");
        if (item.system.USE_END_RESERVE) {
            if (enduranceReserve) {
                let erValue = parseInt(enduranceReserve.system.value);
                let erMax = parseInt(enduranceReserve.system.max);
                if (spentEnd > erValue) {
                    return await ui.notifications.error(`${item.name} needs ${spentEnd} END, but ${enduranceReserve.name} only has ${erValue} END.`);
                }
                erValue -= spentEnd;
                enduranceReserve.system.LEVELS.value = erValue;
                updateItemDescription(enduranceReserve);
                await enduranceReserve.update({ 'system.LEVELS': enduranceReserve.system.LEVELS, 'system.description': enduranceReserve.system.description });
                newEnd = valueEnd;
            }
        }


        if (newEnd < 0) {
            let stunDice = Math.ceil(Math.abs(newEnd) / 2)
            let stunRollEquation = `${stunDice}d6`
            let stunDamageRoll = new Roll(stunRollEquation, actor.getRollData());
            let stunDamageresult = await stunDamageRoll.evaluate({ async: true });
            let stunRenderedResult = await stunDamageresult.render();
            newEnd = -stunDamageresult.total

            enduranceText = 'Spent ' + valueEnd + ' END and ' + Math.abs(newEnd) + ' STUN';

            enduranceText += ` <i class="fal fa-circle-info" data-tooltip="` +
                `<b>USING STUN FOR ENDURANCE</b><br>` +
                `A character at 0 END who still wishes to perform Actions
                may use STUN as END. The character takes 1d6 STUN Only
                damage (with no defense) for every 2 END (or fraction thereof)
                expended. Yes, characters can Knock themselves out this way.` +
                `"></i> `
            enduranceText += stunRenderedResult;

            await ui.notifications.warn(`${actor.name} used STUN for ENDURANCE.`);


        } else {
            enduranceText = 'Spent ' + spentEnd + ' END';

            if (item.system.USE_END_RESERVE && enduranceReserve) {
                enduranceText += `<br>from ${enduranceReserve.name} (${enduranceReserve.system.value}/${enduranceReserve.system.max})`;
            }
        }



        // none: "No Automation",
        // npcOnly: "NPCs Only (end, stun, body)",
        // pcEndOnly: "PCs (end) and NPCs (end, stun, body)",
        // all: "PCs and NPCs (end, stun, body)"
        if ((automation === "all") || (automation === "npcOnly" && actor.type == 'npc') || (automation === "pcEndOnly" && actor.type === 'pc')) {
            let changes = {};
            if (newEnd < 0) {
                changes = {
                    "system.characteristics.end.value": 0,
                    "system.characteristics.stun.value": parseInt(actor.system.characteristics.stun.value) + parseInt(newEnd),
                }
            } else {
                changes = {
                    "system.characteristics.end.value": newEnd,
                }
            }
            await actor.update(changes);
        }
    }

    // Charges
    let spentCharges = 0;
    if (item.system.charges?.max > 0) {
        let charges = parseInt(item.system.charges?.value || 0);
        if (charges <= 0) {
            return ui.notifications.error(`${item.name} has no more charges.`);
        }
        if (enduranceText === "") {
            enduranceText = "Spent 1 charge";
        } else {
            enduranceText += " and 1 charge";
        }
        item.update({ "system.charges.value": charges - 1 })

    }

    const aoe = item.findModsByXmlid("AOE");
    const aoeTemplate = game.scenes.current.templates.find(o => o.flags.itemId === item.id) ||
        game.scenes.current.templates.find(o => o.user.id === game.user.id);
    const explosion = aoe?.adders ? aoe.ADDER.find(o => o.XMLID === "EXPLOSION") : null;
    const SELECTIVETARGET = aoe?.adders ? aoe.ADDER.find(o => o.XMLID === "SELECTIVETARGET") : null;
    const NONSELECTIVETARGET = aoe?.adders ? aoe.ADDER.find(o => o.XMLID === "NONSELECTIVETARGET") : null;

    const AoeAlwaysHit = aoe && !SELECTIVETARGET && !NONSELECTIVETARGET

    let targetData = []
    let targetIds = []
    let targetsArray = Array.from(game.user.targets);

    // If AOE then sort by distance from center
    if (explosion) {
        targetsArray.sort(function (a, b) {
            let distanceA = canvas.grid.measureDistance(aoeTemplate, a, { gridSpaces: true });
            let distanceB = canvas.grid.measureDistance(aoeTemplate, b, { gridSpaces: true });
            return distanceA - distanceB;
        })
    }

    for (let target of targetsArray) {

        let hit = "Miss"
        let value = RoundFavorPlayerUp(target.actor.system.characteristics[toHitChar.toLowerCase()].value)

        if (value <= result.total || AoeAlwaysHit) {
            hit = "Hit"
        }
        let by = result.total - value
        if (by >= 0) {
            by = "+" + by;
        }

        if (explosion) {
            value = 0;
            hit = "Hit";
            by = aoe.OPTION_ALIAS + aoe.LEVELS;

            // Distance from center
            if (aoeTemplate) {
                let distance = canvas.grid.measureDistance(aoeTemplate, target.center, { gridSpaces: true });
                by += ` (${distance}m from center)`;
            }
        }

        targetData.push({ id: target.id, name: target.name, toHitChar: toHitChar, value: value, result: { hit: hit, by: by.toString() } })

        // Keep track of which tokens were hit so we can apply damage later,
        // Assume "AID" always hits
        if (hit === "Hit" || item.system.XMLID == "AID") {
            targetIds.push(target.id)
        }

    }

    // AUTOFIRE
    const autofire = item.findModsByXmlid("AUTOFIRE")
    const autoFireShots = autofire ? parseInt(autofire.OPTION_ALIAS.match(/\d+/)) : 0
    if (autofire) {
        hitRollText = `Autofire ${autofire.OPTION_ALIAS.toLowerCase()}<br>` + hitRollText;

        // Autofire check for multiple hits on single target
        if (targetData.length === 1) {
            let singleTarget = Array.from(game.user.targets)[0];

            for (let shot = 1; shot < autoFireShots; shot++) {
                let hit = "Miss"
                let value = singleTarget.actor.system.characteristics[toHitChar.toLowerCase()].value
                if (value <= result.total - (shot * 2)) {
                    hit = "Hit"
                }
                let by = result.total - value - (shot * 2)
                if (by >= 0) {
                    by = "+" + by;
                }
                targetData.push({ id: singleTarget.id, name: singleTarget.name, toHitChar: toHitChar, value: value, result: { hit: hit, by: by.toString() } })
            }

        }

    }



    if (!await RequiresASkillRollCheck(item)) {
        const speaker = ChatMessage.getSpeaker({ actor: item.actor })
        speaker["alias"] = item.actor.name
        const chatData = {
            user: game.user._id,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            content: enduranceText,
            whisper: ChatMessage.getWhisperRecipients("GM"),
            speaker,
        }

        await ChatMessage.create(chatData)
        return;
    }

    // Block (which is a repeatable abort)
    if (item.system.EFFECT?.toLowerCase().indexOf("block") > -1) {
        template = "systems/hero6efoundryvttv2/templates/chat/item-toHit-block-card.hbs"
        hitRollText = `Block roll of ${hitRollData} vs OCV of pending attack.`;
    }



    // Abort
    if (item.system.EFFECT?.toLowerCase().indexOf("abort") > -1) {
        item.actor.addActiveEffect({
            ...HeroSystem6eActorActiveEffects.abortEffect,
            name: `Aborted [${item.name}]`,
            flags: {
                itemId: item.uuid
            }
        });
    }

    // Dodge (which is a repeatable abort)
    if (item.system.EFFECT?.toLowerCase().indexOf("dodge") > -1) {
        const speaker = ChatMessage.getSpeaker({ actor: item.actor })
        speaker["alias"] = item.actor.name
        const chatData = {
            user: game.user._id,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            content: `${item.name} ${dcv.signedString()} DCV`,
            speaker,
        }
        return ChatMessage.create(chatData)
    }

    //const aoe = item.system.modifiers.find(o => o.XMLID === "AOE");
    //const explosion = aoe?.adders ? aoe.adders.find(o=> o.XMLID === "EXPLOSION") : null;

    // Attack Tags
    // let attackTags = []
    // attackTags.push({name: item.system.class});
    // if (item.system.killing) {
    //     attackTags.push({name: `killing`});
    // }
    // if (item.system.stunBodyDamage != 'stunbody') {
    //     attackTags.push({name: item.system.stunBodyDamage});
    // }
    // if (item.system.piercing) {
    //     attackTags.push({name: `APx${item.system.piercing}`, title: `Armor Piercing`});
    // }
    // if (item.system.penetrating) {
    //     attackTags.push({name: `PENx${item.system.penetrating}`, title: `Penetrating`});
    // }
    // if (autofire) {
    //     attackTags.push({name: `AFx${autoFireShots}`, title: `Autofire`});
    // }
    // if (aoe) {
    //     attackTags.push({name: `${aoe.OPTION_ALIAS}(${aoe.LEVELS})`});
    // }
    // if (explosion) {
    //     attackTags.push({name: `explosion`});
    // }

    let cardData = {
        // dice rolls
        //rolls: [attackRoll],
        renderedHitRoll: renderedResult,
        hitRollText: hitRollText,
        hitRollValue: result.total,
        velocity: options.velocity,
        AoeAlwaysHit,

        // data for damage card
        actor,
        item,
        adjustment,
        senseAffecting,
        ...options,
        hitRollData: hitRollData,
        //effectivestr: options.effectivestr,
        targetData: targetData,
        targetIds: targetIds,

        // endurance
        useEnd: useEnd,
        enduranceText: enduranceText,

        // misc
        tags: tags,
        attackTags: getAttackTags(item),

    };

    // render card
    let cardHtml = await renderTemplate(template, cardData)

    let token = actor.token;

    let speaker = ChatMessage.getSpeaker({ actor: actor, token })
    speaker["alias"] = actor.name;

    const chatData = {
        type: (AoeAlwaysHit ? CONST.CHAT_MESSAGE_TYPES.OTHER : CONST.CHAT_MESSAGE_TYPES.ROLL),  // most AOE's are auto hit
        roll: result,
        user: game.user._id,
        content: cardHtml,
        speaker: speaker,
    }


    return ChatMessage.create(chatData)
}

function getAttackTags(item) {
    // Attack Tags
    let attackTags = []

    attackTags.push({ name: item.system.class });

    if (item.system.killing) {
        attackTags.push({ name: `killing` });
    }


    if (item.system.adders) {
        for (let adder of item.system.adders) {
            switch (adder.XMLID) {
                case "MINUSONEPIP":
                case "PLUSONEHALFDIE":
                case "PLUSONEPIP":
                    break;

                case "MULTIPLECLASSES":
                    attackTags.push({ name: `${adder.ALIAS}`, title: `${adder.XMLID}` });
                    break;

                default:
                    attackTags.push({ name: `${adder.ALIAS || adder.XMLID}`, title: `${adder.OPTION_ALIAS || ""}` });
            }
        }
    }

    // USESTANDARDEFFECT
    if (item.system.USESTANDARDEFFECT) {
        attackTags.push({ name: `Standard Effect`, title: `USESTANDARDEFFECT` })
    }

    // FLASH
    if (item.system.XMLID === "FLASH") {
        attackTags.push({ name: item.system.OPTION_ALIAS })
    }

    for (let mod of (item.system.MODIFIER || [])) {
        switch (mod.XMLID) {
            case "AUTOFIRE":
                const autoFireShots = parseInt(mod.OPTION_ALIAS.match(/\d+/))
                attackTags.push({ name: `${mod.ALIAS || mod.XMLID}(${autoFireShots})`, title: `${mod.OPTION_ALIAS || ""}` });
                break;


            case "AOE":
                attackTags.push({ name: `${mod.OPTION_ALIAS}(${mod.LEVELS})`, title: `${mod.XMLID}` });
                break;

            // case "LIMITEDPOWER":
            //     attackTags.push({ name: `${mod.OPTION_ALIAS}`, title: `${mod.XMLID}` });
            //     break;

            default:
                attackTags.push({ name: `${mod.ALIAS || mod.XMLID}`, title: `${mod.OPTION_ALIAS || mod.XMLID}` });
        }

        for (let adder of (mod.ADDER || [])) {
            switch (adder.XMLID) {
                case "CONTINUOUSCONCENTRATION":
                    attackTags.push({ name: `Continuous`, title: `${adder.ALIAS || ""}` });
                    break;
                default:
                    attackTags.push({ name: `${adder.ALIAS || adder.XMLID}`, title: `${adder.OPTION_ALIAS || ""}` });
            }
        }

    }

    return attackTags;
}


export async function _onRollAoeDamage(event) {
    console.log("_onRollAoeDamage");
    const button = event.currentTarget;
    button.blur()  // The button remains hilighed for some reason; kluge to fix.
    const options = { ...button.dataset }
    const item = fromUuidSync(options.itemid);
    return AttackToHit(item, JSON.parse(options.formdata))
}

// Event handler for when the Roll Damage button is 
// clicked on item-attack-card2.hbs
// Notice the chatListeners function in this file.
export async function _onRollDamage(event) {
    const button = event.currentTarget;
    button.blur()  // The button remains hilighed for some reason; kluge to fix.
    const toHitData = { ...button.dataset }
    const item = fromUuidSync(toHitData.itemid);
    const template = "systems/hero6efoundryvttv2/templates/chat/item-damage-card.hbs"
    const actor = item?.actor

    if (!actor) {
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    //const powers = (!actor || actor.system.is5e) ? CONFIG.HERO.powers5e : CONFIG.HERO.powers
    const adjustment = getPowerInfo({ xmlid: item.system.XMLID })?.powerType?.includes("adjustment");
    const senseAffecting = getPowerInfo({ xmlid: item.system.XMLID })?.powerType?.includes("sense-affecting")

    let { dc, tags } = convertToDcFromItem(item, { isAction: true, ...toHitData });


    let damageRoll = convertFromDC(item, dc); //(item.system.dice === 0) ? "" : item.system.dice + "d6";


    damageRoll = simplifyDamageRoll(damageRoll)

    if (!damageRoll) {
        return ui.notifications.error(`${item.name} damage roll is undefined.`);
    }

    let roll = new Roll(damageRoll, actor.getRollData());
    let damageResult = await roll.roll({ async: true });

    // USESTANDARDEFFECT
    // if (item.system.USESTANDARDEFFECT) {
    //     damageResult.standardEffect ??= { stun: 0, body: 0 }

    //     // Override term results
    //     for (let term of damageResult.terms.filter(o => o.number)) {
    //         if (term.results) {
    //             for (let result of term.results) {
    //                 if (term.faces === 6) {
    //                     result.result = 3;
    //                     damageResult.standardEffect.stun += 3;
    //                     damageResult.standardEffect.body += 1;
    //                 } else {  // + half dice
    //                     damageResult.standardEffect.stun += 1;
    //                     damageResult.standardEffect.body += 1;
    //                 }
    //             }
    //         } else { // +1
    //             damageResult.standardEffect.stun += 1;
    //             damageResult.standardEffect.body += 1;
    //         }
    //     }
    // }


    let damageRenderedResult = item.system.USESTANDARDEFFECT ? "" : await damageResult.render();

    const damageDetail = await _calcDamage(damageResult, item, toHitData)

    const aoe = item.findModsByXmlid("AOE");
    const aoeTemplate = game.scenes.current.templates.find(o => o.flags.itemId === item.id) ||
        game.scenes.current.templates.find(o => o.user.id === game.user.id);
    const explosion = aoe?.ADDER ? aoe.ADDER.find(o => o.XMLID === "EXPLOSION") : null;


    // Apply Damage button for specific targets
    let targetTokens = []
    //let damageAoe = []
    for (const id of toHitData.targetids.split(',')) {
        let token = canvas.scene.tokens.get(id)
        if (token) {
            let targetToken = { token, terms: JSON.stringify(damageResult.terms) }
            //targetTokens.push(token)
            if (explosion) {
                // Distance from center
                if (aoeTemplate) {
                    let newTerms = JSON.parse(JSON.stringify(damageResult.terms));

                    // Explosion
                    // Simple rules is to remove the hightest dice term for each
                    // hex distance from center.  Works fine when radius = dice,
                    // but that isn't alwasy the case.
                    // First thing to do is sort the dice terms (high to low)
                    let results = newTerms[0].results
                    results.sort(function (a, b) { return b.result - a.result });

                    // Remove highest terms based on distance
                    let distance = canvas.grid.measureDistance(aoeTemplate, token.object.center, { gridSpaces: true });
                    let pct = distance / aoeTemplate.distance
                    let termsToRemove = Math.floor(pct * (results.length - 1));
                    results = results.splice(0, termsToRemove)


                    // Finish spoofing terms for die roll
                    for (let idx in newTerms) {
                        let term = newTerms[idx]
                        switch (term.class) {
                            case "Die":
                                newTerms[idx] = Object.assign(new Die(), term)
                                break
                            case "OperatorTerm":
                                newTerms[idx] = Object.assign(new OperatorTerm(), term)
                                break
                            case "NumericTerm":
                                newTerms[idx] = Object.assign(new NumericTerm(), term)
                                break
                        }
                    }
                    let newRoll = Roll.fromTerms(newTerms);
                    newRoll._total = newRoll.terms[0].results.reduce((partialSum, a) => partialSum + a.result, 0);
                    newRoll.title = newRoll.terms[0].results.map(o => o.result).toString();
                    targetToken = {
                        ...targetToken,
                        distance,
                        roll: newRoll,
                        terms: JSON.stringify(newRoll.terms)
                    }
                }
            }
            targetTokens.push(targetToken);
        }
    }

    // If there is only 1 target then get rid of targetIds (which is used for Apply Damage ALL)
    if (targetTokens.length <= 1) {
        delete toHitData.targetids;
    }

    let cardData = {
        item: item,
        adjustment,
        senseAffecting,
        // dice rolls
        renderedDamageRoll: damageRenderedResult,
        renderedStunMultiplierRoll: damageDetail.renderedStunMultiplierRoll,

        // hit locations
        useHitLoc: damageDetail.useHitLoc,
        hitLocText: damageDetail.hitLocText,
        hitLocation: damageDetail.hitLocation,

        // body
        bodyDamage: damageDetail.bodyDamage,
        bodyDamageEffective: damageDetail.body,
        countedBody: damageDetail.countedBody,

        // stun
        stunDamage: damageDetail.stunDamage,
        stunDamageEffective: damageDetail.stun,
        hasRenderedDamageRoll: true,
        stunMultiplier: damageDetail.stunMultiplier,
        hasStunMultiplierRoll: damageDetail.hasStunMultiplierRoll,
        terms: JSON.stringify(damageResult.terms),

        // misc
        targetIds: toHitData.targetids,
        tags: tags,
        attackTags: getAttackTags(item),
        targetTokens: targetTokens,
        user: game.user,
    };

    // render card
    let cardHtml = await renderTemplate(template, cardData) //await HeroSystem6eDamageCard2._renderInternal(actor, item, null, cardData);

    let speaker = ChatMessage.getSpeaker({ actor: item.actor })

    const chatData = {
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,


        user: game.user._id,
        content: cardHtml,
        speaker: speaker,
    }
    if (!item.system.USESTANDARDEFFECT) {
        chatData.roll = damageResult;
    } else {
        chatData.standardEffect = damageResult.standardEffect;
    }

    return ChatMessage.create(chatData);
}


// Event handler for when the Apply Damage button is 
// clicked on item-damage-card.hbs
// Notice the chatListeners function in this file.
export async function _onApplyDamage(event) {

    const button = event.currentTarget;
    button.blur()  // The button remains hilighed for some reason; kluge to fix.
    const toHitData = { ...button.dataset }
    const item = fromUuidSync(event.currentTarget.dataset.itemid)

    // Single target
    if (toHitData.targetTokenId) {
        return _onApplyDamageToSpecificToken(event, toHitData.targetTokenId)
    }

    // All targets
    if (toHitData.targetIds) {

        let targetsArray = toHitData.targetIds.split(',');

        // If AOE then sort by distance from center
        const aoe = item.findModsByXmlid("AOE");
        const aoeTemplate = game.scenes.current.templates.find(o => o.flags.itemId === item.id) ||
            game.scenes.current.templates.find(o => o.user.id === game.user.id);
        const explosion = aoe?.ADDER ? aoe.ADDER.find(o => o.XMLID === "EXPLOSION") : null;

        if (explosion) {

            targetsArray.sort(function (a, b) {
                let distanceA = canvas.grid.measureDistance(aoeTemplate, game.scenes.current.tokens.get(a).object, { gridSpaces: true });
                let distanceB = canvas.grid.measureDistance(aoeTemplate, game.scenes.current.tokens.get(b).object, { gridSpaces: true });
                return distanceA - distanceB;
            })
        }


        for (const id of targetsArray) {
            console.log(game.scenes.current.tokens.get(id).name);
            await _onApplyDamageToSpecificToken(event, id)
        }
        return
    }

    // Check to make sure we have a selected token
    if (canvas.tokens.controlled.length == 0) {
        return ui.notifications.warn(`You must select at least one token before applying damage.`);
    }

    for (let token of canvas.tokens.controlled) {
        _onApplyDamageToSpecificToken(event, token.id)
    }

}

export async function _onApplyDamageToSpecificToken(event, tokenId) {
    const button = event.currentTarget;
    const damageData = { ...button.dataset }
    const item = fromUuidSync(damageData.itemid)
    if (!item) {
        // This typically happens when the attack id stored in the damage card no longer exists on the actor.
        // For example if the attack item was deleted or the HDC was uploaded again.
        console.log(damageData.itemid)
        return ui.notifications.error(`Attack details are no longer availble.`);
    }
    const actor = item.actor



    const template = "systems/hero6efoundryvttv2/templates/chat/apply-damage-card.hbs"

    const token = canvas.tokens.get(tokenId)

    if (!token) {
        return ui.notifications.warn(`You must select at least one token before applying damage.`);
    }

    // Spoof previous roll (foundry won't process a generic term, needs to be a proper Die instance)
    let newTerms = JSON.parse(damageData.terms);


    const aoe = item.findModsByXmlid("AOE");
    const aoeTemplate = game.scenes.current.templates.find(o => o.flags.itemId === item.id) ||
        game.scenes.current.templates.find(o => o.user.id === game.user.id);
    const explosion = aoe?.ADDER ? aoe.ADDER.find(o => o.XMLID === "EXPLOSION") : null;

    // Explosion
    if (explosion) {
        // Distance from center
        if (aoeTemplate) {

            // Explosion
            // Simple rules is to remove the hightest dice term for each
            // hex distance from center.  Works fine when radius = dice,
            // but that isn't alwasy the case.
            // First thing to do is sort the dice terms (high to low)
            let results = newTerms[0].results
            results.sort(function (a, b) { return b.result - a.result });

            // Remove highest terms based on distance
            let distance = canvas.grid.measureDistance(aoeTemplate, token.center, { gridSpaces: true });
            let pct = distance / aoeTemplate.distance
            let termsToRemove = Math.floor(pct * (results.length - 1));
            results = results.splice(0, termsToRemove)


            // Finish spoofing terms for die roll
            for (let idx in newTerms) {
                let term = newTerms[idx]
                switch (term.class) {
                    case "Die":
                        newTerms[idx] = Object.assign(new Die(), term)
                        break
                    case "OperatorTerm":
                        newTerms[idx] = Object.assign(new OperatorTerm(), term)
                        break
                    case "NumericTerm":
                        newTerms[idx] = Object.assign(new NumericTerm(), term)
                        break
                }
            }
            let newRoll = Roll.fromTerms(newTerms);
            newRoll._total = newRoll.terms[0].results.reduce((partialSum, a) => partialSum + a.result, 0);
        }
    }

    // Finish spoofing terms for die roll
    for (let idx in newTerms) {
        let term = newTerms[idx]
        switch (term.class) {
            case "Die":
                newTerms[idx] = Object.assign(new Die(), term)
                break
            case "OperatorTerm":
                newTerms[idx] = Object.assign(new OperatorTerm(), term)
                break
            case "NumericTerm":
                newTerms[idx] = Object.assign(new NumericTerm(), term)
                break
        }
    }





    let newRoll = Roll.fromTerms(newTerms)
    newRoll._total ??= newRoll.terms[0].results.reduce((partialSum, a) => partialSum + parseInt(a.result), 0);
    newRoll.title = newRoll.terms[0].results.map(o => o.result).toString();
    newRoll._evaluated = true;

    let automation = game.settings.get("hero6efoundryvttv2", "automation");



    const avad = item.findModsByXmlid( "AVAD");

    // Check for conditional defenses
    let ignoreDefenseIds = []
    const conditionalDefenses = token.actor.items.filter(o => (o.system.subType || o.system.type) === "defense" &&
        (o.system.active || o.effects.find(o => true)?.disabled === false) &&
        (
            (o.system.MODIFIER || []).find(p => ["ONLYAGAINSTLIMITEDTYPE", "CONDITIONALPOWER"].includes(p.XMLID)) ||
            avad
        )
    )

    // AVAD Life Support
    if (avad) {
        const lifeSupport = token.actor.items.filter(o => o.system.XMLID === "LIFESUPPORT");
        conditionalDefenses.push(...lifeSupport);
    }


    if (conditionalDefenses.length > 0 && !["AID"].includes(item.system.XMLID)) {
        const template2 = "systems/hero6efoundryvttv2/templates/attack/item-conditional-defense-card.hbs"

        let options = [];
        for (let defense of conditionalDefenses) {
            let option = { id: defense.id, name: defense.name, checked: !avad, conditions: "" }

            // AVAD: Attempt to check likely defenses
            if (avad) {

                // PD, ED, MD
                if (avad.INPUT.toUpperCase() === defense.system.XMLID) option.checked = true;

                // Damage Reduction
                if (avad.INPUT.toUpperCase() == "PD" && defense.system.INPUT === "Physical") option.checked = true;
                if (avad.INPUT.toUpperCase() == "ED" && defense.system.INPUT === "Energy") option.checked = true;
                if (avad.INPUT.replace("Mental Defense", "MD").toUpperCase() == "MD" && defense.system.INPUT === "Mental") option.checked = true;

                // Damage Negation
                if (avad.INPUT.toUpperCase() == "PD" && defense.findModsByXmlid("PHYSICAL")) option.checked = true;
                if (avad.INPUT.toUpperCase() == "ED" && defense.findModsByXmlid("ENERGY")) option.checked = true;
                if (avad.INPUT.replace("Mental Defense", "MD").toUpperCase() == "MD" && defense.findModsByXmlid("MENTAL")) option.checked = true;

                // Flash Defense
                if (avad.INPUT.match(/flash/i) && defense.system.XMLID === "FLASHDEFENSE") option.checked = true;

                // Power Defense
                if (avad.INPUT.match(/power/i) && defense.system.XMLID === "POWERDEFENSE") option.checked = true;

                // Life Support
                if (avad.INPUT.match(/life/i) && defense.system.XMLID === "LIFESUPPORT") option.checked = true;

                // Resistant Damage Reduction
                if (avad.INPUT == "Resistant PD" && defense.system.INPUT === "Physical" && defense.system.OPTION.match(/RESISTANT/i)) option.checked = true;
                if (avad.INPUT == "Resistant ED" && defense.system.INPUT === "Energy" && defense.system.OPTION.match(/RESISTANT/i)) option.checked = true;
                if (avad.INPUT == "Resistant MD" && defense.system.INPUT === "Mental" && defense.system.OPTION.match(/RESISTANT/i)) option.checked = true;


                // FORCEFIELD, RESISTANT PROTECTION
                if (avad.INPUT.toUpperCase() == "PD" && parseInt(defense.system.PDLEVELS || 0) > 0) option.checked = true;
                if (avad.INPUT.toUpperCase() == "ED" && parseInt(defense.system.EDLEVELS || 0) > 0) option.checked = true;
                if (avad.INPUT.replace("Mental Defense", "MD").toUpperCase() == "MD" && parseInt(defense.system.MDLEVELS || 0) > 0) option.checked = true;
                if (avad.INPUT.match(/power/i) && parseInt(defense.system.POWDLEVELS || 0) > 0) option.checked = true;


            }

            option.description = defense.system.description;
            options.push(option);
        }

        let data = {
            token,
            item,
            conditionalDefenses: options,
        }

        const html = await renderTemplate(template2, data)

        //let cancelled = true;

        async function getDialogOutput() {
            return new Promise(resolve => {
                const dataConditionalDefenses = {
                    title: item.actor.name + " conditional defenses",
                    content: html,
                    buttons: {
                        normal: {
                            label: "Apply Damage",
                            callback: (html) => { resolve(html.find("form input")) }
                            // async function (html) {
                            // //cancelled = false;
                            // let inputs = html.find("form input");
                            // return inputs;
                            // // for (let input of inputs) {
                            // //     if (input.checked) {
                            // //         ignoreDefenseIds.push(input.id);
                            // //     }
                            // // }
                        },
                        cancel: {
                            label: "cancel",
                            callback: () => { resolve(null) }
                        }
                    },
                    default: "normal",
                    close: () => { resolve(null) }
                }
                new Dialog(dataConditionalDefenses).render(true)
            });
        }

        const inputs = await getDialogOutput();
        if (inputs === null) return;

        let defenses = [];
        for (let input of inputs) {
            if (!input.checked) {
                ignoreDefenseIds.push(input.id);
                defenses.push(token.actor.items.get(input.id));
            }
        }

        if (defenses.length > 0) {
            let content = `The following defenses were not applied vs <span title="${item.name.replace(/"/g, "")}: ${item.system.description.replace(/"/g, "")}">${item.name}</span>:<ul>`;
            for (let def of defenses) {
                content += `<li title="${def.name.replace(/"/g, "")}: ${def.system.description.replace(/"/g, "")}">${def.name}</li>`
            }
            content += "</ul>";

            const speaker = ChatMessage.getSpeaker({ actor: token.actor })
            speaker["alias"] = token.actor.name
            const chatData = {
                user: game.user._id,
                type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                content,
                whisper: ChatMessage.getWhisperRecipients("GM"),
                speaker,
            }

            await ChatMessage.create(chatData)
        }
    }

    // -------------------------------------------------
    // determine active defenses
    // -------------------------------------------------
    let defense = "";
    let [defenseValue, resistantValue, impenetrableValue, damageReductionValue, damageNegationValue, knockbackResistance, defenseTags] = determineDefense(token.actor, item, { ignoreDefenseIds })
    if (damageNegationValue > 0) {
        defense += "Damage Negation " + damageNegationValue + "DC(s); "
    }

    defense = defense + defenseValue + " normal; " + resistantValue + " resistant";

    if (damageReductionValue > 0) {
        defense += "; damage reduction " + damageReductionValue + "%";
    }

    damageData.defenseValue = defenseValue
    damageData.resistantValue = resistantValue
    damageData.impenetrableValue = impenetrableValue
    damageData.damageReductionValue = damageReductionValue
    damageData.damageNegationValue = damageNegationValue
    damageData.knockbackResistance = knockbackResistance
    damageData.defenseAvad = defenseValue + resistantValue + impenetrableValue + damageReductionValue + damageNegationValue + knockbackResistance;

    // AVAD All or Nothing
    if (avad) {
        const nnd = avad.ADDER.find(o => o.XMLID === "NND"); // Check for ALIAS="All Or Nothing" shouldn't be necessary
        if (nnd && (damageData.defenseAvad === 0)) {

            // render card
            let speaker = ChatMessage.getSpeaker({ actor: item.actor })

            const chatData = {
                user: game.user._id,
                content: `${item.name} did no damage.`,
                speaker: speaker,
            }

            return ChatMessage.create(chatData);
        }
    }

    newRoll = await handleDamageNegation(item, newRoll, damageData)

    // We need to recalcuate damage to account for possible Damage Negation
    const damageDetail = await _calcDamage(newRoll, item, damageData)

    // AID, DRAIN or any adjustmnet powers
    //const powers = (!actor || actor.system.is5e) ? CONFIG.HERO.powers5e : CONFIG.HERO.powers
    const adjustment = getPowerInfo({ xmlid: item.system.XMLID })?.powerType?.includes("adjustment"); //powers[item.system.XMLID] && powers[item.system.XMLID].powerType.includes("adjustment")
    if (adjustment) {
        return _onApplyAdjustmentToSpecificToken(event, tokenId, damageData, defense)
    }
    const senseAffecting = getPowerInfo({ xmlid: item.system.XMLID })?.powerType?.includes("sense-affecting")
    if (senseAffecting) {
        return _onApplySenseAffectingToSpecificToken(event, tokenId, damageData, defense)
    }

    // AUTOMATION powers related to STUN
    const CANNOTBESTUNNED = token.actor.items.find(o => o.system.XMLID === "AUTOMATON" && o.system.OPTION === "CANNOTBESTUNNED")
    const NOSTUN1 = token.actor.items.find(o => o.system.XMLID === "AUTOMATON" && o.system.OPTION === "NOSTUN1") // AUTOMATION Takes No STUN (loses abilities when takes BODY)
    const NOSTUN2 = token.actor.items.find(o => o.system.XMLID === "AUTOMATON" && o.system.OPTION === "NOSTUN2") //Takes No STUN
    if (NOSTUN1) {
        damageDetail.effects = damageDetail.effects + "Takes No STUN (loses abilities when takes BODY); "
        damageDetail.stun = 0;
    }
    if (NOSTUN2) {
        damageDetail.effects = damageDetail.effects + "Takes No STUN; "
        damageDetail.stun = 0;
    }

    // check if target is stunned
    if (game.settings.get("hero6efoundryvttv2", "stunned")) {
        // determine if target was Stunned
        if (damageDetail.stun > token.actor.system.characteristics.con.value && !CANNOTBESTUNNED) {

            damageDetail.effects = damageDetail.effects + "inflicts Stunned; "

            // none: "No Automation",
            // npcOnly: "NPCs Only (end, stun, body)",
            // pcEndOnly: "PCs (end) and NPCs (end, stun, body)",
            // all: "PCs and NPCs (end, stun, body)"
            if ((automation === "all") || (automation === "npcOnly" && token.actor.type === 'npc')) {
                token.actor.addActiveEffect(HeroSystem6eActorActiveEffects.stunEffect)
            }
        }
    }

    let damageRenderedResult = await newRoll.render()

    // Attack may have additional effects, such as those from martial arts
    let effectsFinal = deepClone(damageDetail.effects)
    if (item.system.effect) {
        for (const effect of item.system.effect.split(',')) {

            // Do not include [NORMALDC] strike and similar
            if (effect.indexOf("[") == -1 && !effect.match(/strike/i)) {
                effectsFinal += effect
            }
        }
    }
    effectsFinal = effectsFinal.replace(/; $/,"")

    let cardData = {
        item: item,
        // dice rolls
        roll: newRoll,
        renderedDamageRoll: damageRenderedResult,
        renderedStunMultiplierRoll: damageDetail.renderedStunMultiplierRoll,

        // body
        bodyDamage: damageDetail.bodyDamage,
        bodyDamageEffective: damageDetail.body,
        countedBody: damageDetail.countedBody,

        // stun
        stunDamage: damageDetail.stunDamage,
        stunDamageEffective: damageDetail.stun,
        hasRenderedDamageRoll: true,
        stunMultiplier: damageDetail.stunMultiplier,
        hasStunMultiplierRoll: damageDetail.hasStunMultiplierRoll,

        // effects
        effects: effectsFinal,

        // defense
        defense: defense,
        damageNegationValue: damageNegationValue,

        // knockback
        knockbackMessage: damageDetail.knockbackMessage,
        useKnockBack: damageDetail.useKnockBack,
        knockbackRenderedResult: damageDetail.knockbackRenderedResult,

        // misc
        tags: defenseTags,
        targetToken: token
    };


    // render card
    let cardHtml = await renderTemplate(template, cardData)
    let speaker = ChatMessage.getSpeaker({ actor: item.actor })

    const chatData = {
        user: game.user._id,
        content: cardHtml,
        speaker: speaker,
    }

    // none: "No Automation",
    // npcOnly: "NPCs Only (end, stun, body)",
    // pcEndOnly: "PCs (end) and NPCs (end, stun, body)",
    // all: "PCs and NPCs (end, stun, body)"
    if ((automation === "all") || (automation === "npcOnly" && token.actor.type === 'npc')) {
        let changes = {
            "system.characteristics.stun.value": token.actor.system.characteristics.stun.value - damageDetail.stun,
            "system.characteristics.body.value": token.actor.system.characteristics.body.value - damageDetail.body,
        }
        await token.actor.update(changes);
    }

    return ChatMessage.create(chatData);

}

async function _onApplyAdjustmentToSpecificToken(event, tokenId, damageData, defense) {
    const button = event.currentTarget;
    //const damageData = { ...button.dataset }
    const item = fromUuidSync(damageData.itemid)
    if (!item) {
        // This typically happens when the attack id stored in the damage card no longer exists on the actor.
        // For example if the attack item was deleted or the HDC was uploaded again.
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    const template = "systems/hero6efoundryvttv2/templates/chat/apply-adjustment-card.hbs"
    const token = canvas.tokens.get(tokenId)

    if (!item.actor) {
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    if (item.actor.id === token.actor.id && ["DRAIN", "TRANSFER"].includes(item.system.XMLID)) {
        return ui.notifications.error(`${item.system.XMLID} attacker (${item.actor.name}) and defender (${token.actor.name}) cannot be the same.`);
    }


    let levelsX = 0
    let levelsY = 0
    let ActivePoints = parseInt(damageData.stundamage);

    // TRANSFER X to Y  (AID and DRAIN only have X)
    let xmlidX = item.system.INPUT.match(/\w+/)[0];
    let xmlidY = (item.system.INPUT.match(/to[ ]+(\w+)/i) || ["", ""])[1];

    // Apply the ADJUSTMENT to a CHARACTERISTIC
    let keyX = (xmlidX).toLowerCase()
    let keyY = (xmlidY).toLowerCase()
    if (keyX && token.actor.system.characteristics[keyX]) {
        const characteristicCosts = token.actor.system.is5e ? CONFIG.HERO.characteristicCosts5e : CONFIG.HERO.characteristicCosts


        // Power Defense vs DRAIN
        if (["DRAIN", "TRANSFER"].includes(item.system.XMLID)) {
            ActivePoints = Math.max(0, ActivePoints - (damageData.defenseValue + damageData.resistantValue));
        }

        let costPerPointX = parseFloat(getPowerInfo({ xmlid: keyX.toUpperCase(), actor: item.actor })?.cost) * AdjustmentMultiplier(keyX.toUpperCase());
        levelsX = parseInt(ActivePoints / costPerPointX)

        let costPerPointY = parseFloat(getPowerInfo({ xmlid: keyY.toUpperCase(), actor: item.actor })?.cost) * AdjustmentMultiplier(keyY.toUpperCase());
        levelsY = parseInt(ActivePoints / costPerPointY)

        // Check for previous ADJUSTMENT from same source
        // TODO: Variable Effect may result in multiple changes on same AE.
        let prevEffectX = token.actor.effects.find(o => o.flags?.XMLID === item.system.XMLID && o.flags?.keyX === keyX)
        let prevEffectY = item.actor.effects.find(o => o.flags?.XMLID === item.system.XMLID && o.flags?.keyY === keyY)
        if (prevEffectX) {

            // Maximum Effect (ActivePoints)
            let maxEffect = 0
            for (let term of JSON.parse(damageData.terms)) {
                maxEffect += (parseInt(term.faces) * parseInt(term.number) || 0)
            }
            //maxEffect = parseInt(maxEffect / costPerPoint);

            let newActivePoints = (prevEffectX.flags?.activePoints || 0) + ActivePoints;
            if (newActivePoints > maxEffect) {
                ActivePoints = maxEffect - prevEffectX.flags.activePoints;
                newActivePoints = maxEffect;
            }

            let newLevelsX = newActivePoints / costPerPointX;
            levelsX = newLevelsX - Math.abs(parseInt(prevEffectX.changes[0].value));



            prevEffectX.changes[0].value = ["DRAIN", "TRANSFER"].includes(item.system.XMLID) ? -parseInt(newLevelsX) : parseInt(newLevelsX);
            prevEffectX.name = `${item.system.XMLID} ${["DRAIN", "TRANSFER"].includes(item.system.XMLID) ? -parseInt(newLevelsX) : parseInt(newLevelsX).signedString()} ${keyX.toUpperCase()} [${item.actor.name}]`;
            prevEffectX.flags.activePoints = newActivePoints;

            await prevEffectX.update({ name: prevEffectX.name, changes: prevEffectX.changes, flags: prevEffectX.flags })

            if (item.system.XMLID === "TRANSFER" && keyY && prevEffectY) {

                let newLevelsY = newActivePoints / costPerPointY;
                levelsY = newLevelsY - Math.abs(parseInt(prevEffectY.changes[0].value));

                prevEffectY.changes[0].value = parseInt(newLevelsY);
                prevEffectY.name = `${item.system.XMLID} +${parseInt(newLevelsY)} ${keyY.toUpperCase()} [${item.actor.name}]`;
                prevEffectY.flags.activePoints = newActivePoints;
                await prevEffectY.update({ name: prevEffectY.name, changes: prevEffectY.changes, flags: prevEffectY.flags })

                let newValueY = item.actor.system.characteristics[keyY].value + parseInt(levelsY);
                await item.actor.update({ [`system.characteristics.${keyY}.value`]: newValueY })
            }



        } else {
            // Create new ActiveEffect
            let activeEffect =
            {
                name: `${item.system.XMLID} ${["DRAIN", "TRANSFER"].includes(item.system.XMLID) ? -parseInt(levelsX) : parseInt(levelsX).signedString()} ${keyX.toUpperCase()} [${item.actor.name}]`,
                id: `${item.system.XMLID}.${item.id}.${keyX}`,
                icon: item.img,
                changes: [
                    {
                        key: "system.characteristics." + keyX + ".max",
                        value: ["DRAIN", "TRANSFER"].includes(item.system.XMLID) ? -parseInt(levelsX) : parseInt(levelsX),
                        mode: CONST.ACTIVE_EFFECT_MODES.ADD
                    }
                ],
                duration: {
                    seconds: 12,
                },
                flags: {
                    activePoints: ActivePoints,
                    XMLID: item.system.XMLID,
                    source: item.actor.name,
                    target: keyX,
                    keyX: keyX,
                    keyY: keyY,
                },
                origin: item.uuid
            }

            // DELAYEDRETURNRATE
            let delayedReurnRate = item.findModsByXmlid("DELAYEDRETURNRATE");
            if (delayedReurnRate) {
                switch (delayedReurnRate.OPTIONID) {
                    case "MINUTE": activeEffect.duration.seconds = 60; break;
                    case "FIVEMINUTES": activeEffect.duration.seconds = 60 * 5; break;
                    case "20MINUTES": activeEffect.duration.seconds = 60 * 20; break;
                    case "HOUR": activeEffect.duration.seconds = 60 * 60; break;
                    case "6HOURS": activeEffect.duration.seconds = 60 * 60 * 6; break;
                    case "DAY": activeEffect.duration.seconds = 60 * 60 * 24; break;
                    case "WEEK": activeEffect.duration.seconds = 604800; break;
                    case "MONTH": activeEffect.duration.seconds = 2.628e+6; break;
                    case "SEASON": activeEffect.duration.seconds = 2.628e+6 * 3; break;
                    case "YEAR": activeEffect.duration.seconds = 3.154e+7; break;
                    case "FIVEYEARS": activeEffect.duration.seconds = 3.154e+7 * 5; break;
                    case "TWENTYFIVEYEARS": activeEffect.duration.seconds = 3.154e+7 * 25; break;
                    case "CENTURY": activeEffect.duration.seconds = 3.154e+7 * 100; break;
                    default: await ui.notifications.error(`DELAYEDRETURNRATE has unhandled option ${delayedReurnRate?.OPTIONID}`);
                }
            }

            if (ActivePoints > 0) {
                await token.actor.addActiveEffect(activeEffect);

                if (item.system.XMLID === "TRANSFER" && keyY) {
                    let activeEffectY = deepClone(activeEffect);
                    activeEffectY.id = `${item.system.XMLID}.${item.id}.${keyY}`;
                    activeEffectY.name = `${item.system.XMLID} +${parseInt(levelsY)} ${keyY.toUpperCase()} [${item.actor.name}]`;
                    activeEffectY.changes[0].key = "system.characteristics." + keyY + ".max";
                    activeEffectY.changes[0].value = parseInt(levelsY);
                    activeEffectY.flags.target = keyY;
                    await item.actor.addActiveEffect(activeEffectY);

                    let newValueY = item.actor.system.characteristics[keyY].value + parseInt(levelsY);
                    await item.actor.update({ [`system.characteristics.${keyY}.value`]: newValueY })
                }
            }

        }

        // Add levels to value
        let newValue = token.actor.system.characteristics[keyX].value + (["DRAIN", "TRANSFER"].includes(item.system.XMLID) ? -parseInt(levelsX) : parseInt(levelsX));
        await token.actor.update({ [`system.characteristics.${keyX}.value`]: newValue })

    }


    let cardData = {
        item: item,
        // dice rolls

        // stun
        stunDamage: ActivePoints,
        levelsX: ["DRAIN", "TRANSFER"].includes(item.system.XMLID) ? -parseInt(levelsX) : parseInt(levelsX),
        levelsY: parseInt(levelsY),
        xmlidX: xmlidX,
        xmlidY: xmlidY,

        // effects
        //effects: effectsFinal,


        // defense
        defense: defense,

        // misc
        targetToken: token
    };

    // render card
    let cardHtml = await renderTemplate(template, cardData)
    let speaker = ChatMessage.getSpeaker({ actor: item.actor })

    const chatData = {
        user: game.user._id,
        content: cardHtml,
        speaker: speaker,
    }

    return ChatMessage.create(chatData);
}

async function _onApplySenseAffectingToSpecificToken(event, tokenId, damageData, defense) {
    const button = event.currentTarget;
    //const damageData = { ...button.dataset }
    const item = fromUuidSync(damageData.itemid)
    if (!item) {
        // This typically happens when the attack id stored in the damage card no longer exists on the actor.
        // For example if the attack item was deleted or the HDC was uploaded again.
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    const template = "systems/hero6efoundryvttv2/templates/chat/apply-sense-affecting-card.hbs"
    const token = canvas.tokens.get(tokenId)

    if (!item.actor) {
        return ui.notifications.error(`Attack details are no longer availble.`);
    }

    // FLASHDEFENSE
    const flashDefense = item.actor.items.find(o => o.system.XMLID === "FLASHDEFENSE");
    if (flashDefense) {
        const value = parseInt(flashDefense.system.LEVELS.value || 0);
        damageData.bodydamage = Math.max(0, damageData.bodydamage - value);
        defense = `${value} Flash Defense`;
    }

    // Create new ActiveEffect
    if (damageData.bodydamage > 0) {
        token.actor.addActiveEffect({
            ...HeroSystem6eActorActiveEffects.blindEffect,
            name: `${item.system.XMLID} ${damageData.bodydamage} [${item.actor.name}]`,
            duration: {
                seconds: damageData.bodydamage,
            },
            flags: {
                bodyDamage: damageData.bodydamage,
                XMLID: item.system.XMLID,
                source: item.actor.name,
            },
            origin: item.uuid
        })
        // let activeEffect =
        // {
        //     name: `${item.system.XMLID} ${damageData.bodyDamage} [${item.actor.name}]`,
        //     id: `${item.system.XMLID}.${item.id}`,
        //     //icon: item.img,
        //     statuses: ['blind'],
        //     duration: {
        //         seconds: 12,
        //     },
        //     flags: {
        //         bodyDamage: damageData.bodyDamage,
        //         XMLID: item.system.XMLID,
        //         source: item.actor.name,
        //     },
        //     origin: item.uuid
        // }
        // await item.actor.createEmbeddedDocuments("ActiveEffect", [activeEffect]);
    }

    let cardData = {
        item: item,
        // dice rolls

        // body
        damageData,

        // defense
        defense: defense,

        // misc
        targetToken: token
    };

    // render card
    let cardHtml = await renderTemplate(template, cardData)
    let speaker = ChatMessage.getSpeaker({ actor: item.actor })

    const chatData = {
        user: game.user._id,
        content: cardHtml,
        speaker: speaker,
    }

    return ChatMessage.create(chatData);
}


async function _calcDamage(damageResult, item, options) {
    let damageDetail = {}
    const itemData = item.system
    let body = 0;
    let stun = 0;
    let countedBody = 0;

    let pip = 0

    // USESTANDARDEFFECT
    if (item.system.USESTANDARDEFFECT) {

        // Override term results
        for (let term of damageResult.terms.filter(o => o.number)) {
            if (term.results) {
                for (let result of term.results) {
                    if (term.faces === 6) {
                        result.result = 3;
                        stun += 3;
                        body += 1;
                    } else {  // + half dice
                        result.result = 1;
                        stun += 1;
                        body += 1;
                    }
                }
            } else { // +1
                stun += 1;
                body += 1;
            }
        }
    }

    else {



        // We may have spoofed a roll, so total is missing.
        if (!damageResult.total) {
            damageResult._total = 0

            for (let term of damageResult.terms) {
                if (term instanceof OperatorTerm) continue;
                if (term instanceof Die) {
                    for (let result of term.results) {
                        damageResult._total += result.result
                    }
                    continue
                }
                if (term instanceof NumericTerm) {
                    damageResult._total += term.number
                }
            }

            damageResult._formula = damageResult.terms[0].results.length + "d6"
            if (damageResult.terms[1]) {
                damageResult._formula += " + "

                if (damageResult.terms[2] instanceof Die) {
                    damageResult._formula += damageResult.terms[2].results[0].rersults += "1d3"
                }

                if (damageResult.terms[2] instanceof NumericTerm) {
                    damageResult._formula += damageResult.terms[2].number
                }


            }


            damageResult._evaluated = true
        }
    }

    let hasStunMultiplierRoll = false;
    //let renderedStunMultiplierRoll = null;
    let stunMultiplier = 1;
    let noHitLocationsPower = item.system.noHitLocations || false;


    // Penetrating
    let penetratingBody = 0
    if (item.system.penetrating) {
        for (let die of damageResult.terms[0].results) {
            switch (die.result) {
                case 1:
                    penetratingBody += 0;
                    break;
                case 6:
                    penetratingBody += 2;
                    break;
                default:
                    penetratingBody += 1;
                    break;
            }
        }
    }
    penetratingBody = Math.max(0, penetratingBody - options.impenetrableValue)

    // get hit location
    let hitLocationModifiers = [1, 1, 1, 0];
    let hitLocation = "None";
    let useHitLoc = false;
    //let noHitLocationsPower = false;
    if (game.settings.get("hero6efoundryvttv2", "hit locations") && !noHitLocationsPower) {
        useHitLoc = true;

        options.aim = options.aim || options.hitLocation
        hitLocation = options.aim;
        if (options.aim === 'none' || !options.aim) {
            let locationRoll = new Roll("3D6")
            let locationResult = await locationRoll.roll({ async: true });
            hitLocation = CONFIG.HERO.hitLocationsToHit[locationResult.total];
        }

        hitLocationModifiers = CONFIG.HERO.hitLocations[hitLocation];

        if (game.settings.get("hero6efoundryvttv2", "hitLocTracking") === "all") {
            let sidedLocations = ["Hand", "Shoulder", "Arm", "Thigh", "Leg", "Foot"]
            if (sidedLocations.includes(hitLocation)) {
                let sideRoll = new Roll("1D2", actor.getRollData());
                let sideResult = await sideRoll.roll();

                if (sideResult.result === 1) {
                    hitLocation = "Left " + hitLocation;
                } else {
                    hitLocation = "Right " + hitLocation;
                }
            }
        }
    }


    if (itemData.killing) {
        // Killing Attack
        hasStunMultiplierRoll = true;
        body = item.system.USESTANDARDEFFECT ? stun : damageResult.total;
        //let hitLocationModifiers = [1, 1, 1, 0];

        // 6E uses 1d3 stun multiplier
        let stunRoll = new Roll("1D3", item.actor.getRollData());

        // 5E uses 1d6-1 for stun multiplier
        if (item.actor.system.is5e) {
            stunRoll = new Roll("max(1D6-1,1)", item.actor.getRollData());
        }

        let stunResult = await stunRoll.roll({ async: true });
        let renderedStunResult = await stunResult.render();
        damageDetail.renderedStunMultiplierRoll = renderedStunResult;

        if (game.settings.get("hero6efoundryvttv2", "hit locations") && !noHitLocationsPower) {
            stunMultiplier = hitLocationModifiers[0];
        } else {
            stunMultiplier = stunResult.total;
        }

        if (options.stunmultiplier) {
            stunMultiplier = options.stunmultiplier
        }

        stun = body * stunMultiplier;

        damageDetail.renderedStunResult = renderedStunResult
    }
    else {
        // Normal Attack
        // counts body damage for non-killing attack
        if (damageResult.terms[0].results) { // Possible 0d6 roll
            for (let die of damageResult.terms[0].results) {
                switch (die.result) {
                    case 1:
                        countedBody += 0;
                        break;
                    case 6:
                        countedBody += 2;
                        break;
                    default:
                        countedBody += 1;
                        break;
                }
            }
        }

        stun = item.system.USESTANDARDEFFECT ? stun : damageResult.total;
        body = item.system.USESTANDARDEFFECT ? body : countedBody;
    }


    let bodyDamage = body;
    let stunDamage = stun;


    let effects = "";
    if (item.system.EFFECT) {
        effects = item.system.EFFECT + ";"
    }

    // Splits an attack into two equal parts for the purpose of
    // determining BODY damage and applying it to the target’s
    // defenses (though it’s still resolved with one Attack Roll and
    // treated as a single attack).
    // This is super awkward with the current system.
    // KLUGE: Apply body defense twice.
    let REDUCEDPENETRATION = item.findModsByXmlid("REDUCEDPENETRATION");
    if (REDUCEDPENETRATION) {
        if (item.killing) {
            body = Math.max(0, body - options.resistantValue);
        }
        body = Math.max(0, body - options.defenseValue);
    }

    // determine knockback
    let useKnockBack = false;
    let knockbackMessage = "";
    let knockbackRenderedResult = null;
    let knockbackMultiplier = parseInt(itemData.knockbackMultiplier)
    if (game.settings.get("hero6efoundryvttv2", "knockback") && knockbackMultiplier) {
        useKnockBack = true;
        // body - 2d6 m

        let knockBackEquation = body + (knockbackMultiplier > 1 ? "*" + knockbackMultiplier : "") + " - 2D6"
        // knockback modifier added on an attack by attack basis
        const knockbackMod = parseInt(options.knockbackMod || options.knockbadmod || 0)
        if (knockbackMod != 0) {
            knockBackEquation = modifyRollEquation(knockBackEquation, (knockbackMod || 0) + "D6");
        }
        // knockback resistance effect
        const knockbackResistance = parseInt(options.knockbackResistance || 0)
        if (knockbackResistance != 0) {
            knockBackEquation = modifyRollEquation(knockBackEquation, " -" + (knockbackResistance || 0));
        }

        let knockbackRoll = new Roll(knockBackEquation);
        let knockbackResult = await knockbackRoll.roll({ async: true });
        knockbackRenderedResult = await knockbackResult.render();
        let knockbackResultTotal = Math.round(knockbackResult.total);

        if (knockbackResultTotal < 0) {
            knockbackMessage = "No knockback";
        } else if (knockbackResultTotal == 0) {
            knockbackMessage = "inflicts Knockdown";
        } else {
            // If the result is positive, the target is Knocked Back 2m times the result
            knockbackMessage = "Knocked back " + (knockbackResultTotal * 2) + "m";
        }
    }




    // -------------------------------------------------
    // determine effective damage
    // -------------------------------------------------

    if (itemData.killing) {
        stun = stun - (options.defenseValue || 0) - (options.resistantValue || 0);
        body = body - (options.resistantValue || 0);
    } else {
        stun = stun - (options.defenseValue || 0) - (options.resistantValue || 0);
        body = body - (options.defenseValue || 0) - (options.resistantValue || 0);
    }

    stun = RoundFavorPlayerDown(stun < 0 ? 0 : stun);
    body = RoundFavorPlayerDown(body < 0 ? 0 : body);



    let hitLocText = "";
    if (game.settings.get("hero6efoundryvttv2", "hit locations") && !noHitLocationsPower) {
        if (itemData.killing) {
            // killing attacks apply hit location multiplier after resistant damage protection has been subtracted
            // Location : [x Stun, x N Stun, x Body, OCV modifier]
            body = body * hitLocationModifiers[2];

            hitLocText = "Hit " + hitLocation + " (x" + hitLocationModifiers[0] + " STUN x" + hitLocationModifiers[2] + " BODY)";
        } else {
            // stun attacks apply N STUN hit location multiplier after defenses
            stun = RoundFavorPlayerDown(stun * hitLocationModifiers[1]);
            body = RoundFavorPlayerDown(body * hitLocationModifiers[2]);

            hitLocText = "Hit " + hitLocation + " (x" + hitLocationModifiers[1] + " STUN x" + hitLocationModifiers[2] + " BODY)";
        }

        hasStunMultiplierRoll = false;
    }




    // apply damage reduction
    if (options.damageReductionValue > 0) {
        //defense += "; damage reduction " + options.damageReductionValue + "%";
        stun = RoundFavorPlayerDown(stun * (1 - (options.damageReductionValue / 100)));
        body = RoundFavorPlayerDown(body * (1 - (options.damageReductionValue / 100)));
    }

    // minimum damage rule
    if (stun < body) {
        stun = body;
        effects += `minimum damage invoked <i class="fal fa-circle-info" data-tooltip="` +
            `<b>MINIMUM DAMAGE FROM INJURIES</b><br>` +
            `A character automatically takes 1 STUN for every 1 point of BODY
        damage that gets through his defenses. He can Recover this STUN
        normally; he doesn't have to heal the BODY damage first.` +
            `"></i> `
    }

    // The body of a penetrating attack is the minimum damage
    if (penetratingBody > body) {
        if (itemData.killing) {
            body = penetratingBody;
            stun = body * stunMultiplier;
        }
        else {
            stun = penetratingBody;
        }
        effects += "penetrating damage; "
    }

    // StunOnly?
    if (item.system.stunBodyDamage === "stunonly") {
        body = 0;
    }

    // BodyOnly?
    if (item.system.stunBodyDamage === "bodyonly") {
        stun = 0;
    }

    // EffectOnly?
    if (item.system.stunBodyDamage === "effectonly") {
        stun = 0;
        body = 0;
    }

    stun = RoundFavorPlayerDown(stun)
    body = RoundFavorPlayerDown(body)

    damageDetail.body = body
    damageDetail.stun = stun
    damageDetail.effects = effects
    damageDetail.stunDamage = stunDamage
    damageDetail.bodyDamage = bodyDamage
    damageDetail.stunMultiplier = stunMultiplier
    damageDetail.hasStunMultiplierRoll = hasStunMultiplierRoll
    damageDetail.useHitLoc = useHitLoc
    damageDetail.hitLocText = hitLocText
    damageDetail.hitLocation = hitLocation

    damageDetail.knockbackMessage = knockbackMessage
    damageDetail.useKnockBack = useKnockBack
    damageDetail.knockbackRenderedResult = knockbackRenderedResult


    return damageDetail
}
