export function modifyRollEquation(equation, value) {
    if (!value) {
        return equation;
    }

    if (value != 0) {
        let sign = " + ";
        if (value < 0) {
            sign = " - ";
        }
        equation = equation + sign + Math.abs(value);
    }

    return equation;
}

export function getPowerInfo(options) {
    const xmlid =
        options.xmlid ||
        options.item?.XMLID ||
        options.item?.system?.XMLID ||
        options.item?.system?.xmlid ||
        options.item?.system?.id;

    const actor = options?.actor || options?.item?.actor;
    if (!actor) {
        // This has a problem if we're passed in an XMLID for a power as we don't know the actor so we don't know if it's 5e or 6e
        console.warn(
            `${xmlid} for ${options.item?.name} has no actor provided. Assuming 6e.`,
        );
    }

    const powerList = actor?.system.is5e
        ? CONFIG.HERO.powers5e
        : CONFIG.HERO.powers6e;
    let powerInfo = powerList.find((o) => o.key === xmlid);

    // TODO: Why are we modifying the power entries from config here?
    if (powerInfo) {
        powerInfo.xmlid = xmlid;
        powerInfo.XMLID = xmlid;
    }

    // LowerCase
    // TODO: Make powers correct and remove this
    if (powerInfo?.duration)
        powerInfo.duration = powerInfo.duration.toLowerCase();

    return powerInfo;
}

export function getModifierInfo(options) {
    const xmlid =
        options.xmlid ||
        options.item?.system?.XMLID ||
        options.item?.system?.xmlid ||
        options.item?.system?.id;

    const actor = options?.actor || options?.item?.actor;
    if (!actor) {
        // This has a problem if we're passed in an XMLID for a power as we don't know the actor so we don't know if it's 5e or 6e
        console.warn(
            `${xmlid} for ${options.item?.name} has no actor provided. Assuming 6e.`,
        );
    }

    let modifierOverrideInfo = CONFIG.HERO.ModifierOverride[xmlid];
    if (!modifierOverrideInfo || actor?.system?.is5e) {
        modifierOverrideInfo = {
            ...modifierOverrideInfo,
            ...CONFIG.HERO.ModifierOverride5e[xmlid],
        };
    }

    if (Object.entries(modifierOverrideInfo).length == 0) {
        modifierOverrideInfo = getPowerInfo(options);
    } else {
        console.warn("modifierOverrideInfo using older format", xmlid);
    }

    return modifierOverrideInfo;
}

function _isNonIgnoredCharacteristicsAndMovementPowerForActor(actor) {
    return (power) =>
        (power.type?.includes("characteristic") ||
            power.type?.includes("movement")) &&
        !power.ignoreFor?.includes(actor.type) &&
        (!power.onlyFor || power.onlyFor.includes(actor.type)) &&
        !power.key.match(/^CUSTOM[0-9]+.*/); // Ignore CUSTOM characteristics until supported.
}

export function getCharacteristicInfoArrayForActor(actor) {
    const isCharOrMovePowerForActor =
        _isNonIgnoredCharacteristicsAndMovementPowerForActor(actor);
    const powerList = actor.system.is5e
        ? CONFIG.HERO.powers5e
        : CONFIG.HERO.powers6e;

    const powers = powerList.filter(isCharOrMovePowerForActor);

    return powers;
}
