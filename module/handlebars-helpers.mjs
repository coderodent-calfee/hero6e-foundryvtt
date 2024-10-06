import { HEROSYS } from "./herosystem6e.mjs";

export function initializeHandlebarsHelpers() {
    Handlebars.registerHelper("indexOf", indexOf);
    Handlebars.registerHelper("abs", abs);
    Handlebars.registerHelper("increment", increment);
    Handlebars.registerHelper("gameConfigValue", gameConfigValue);
    Handlebars.registerHelper("getModulePath", getModulePath);
    Handlebars.registerHelper("isdefined", function (value) {
        return value !== undefined;
    });
    Handlebars.registerHelper("includes", includes);
    Handlebars.registerHelper("math", math);
}

function indexOf(str, searchTerm) {
    return str.indexOf(searchTerm);
}

function abs(str) {
    return Math.abs(parseInt(str));
}

function increment(str, value) {
    return parseInt(str) + parseInt(value);
}

function gameConfigValue(configSetting) {
    return game.settings.get(HEROSYS.module, configSetting);
}

function getModulePath(templateDirectory) {
    return `systems/${HEROSYS.module}/templates/${templateDirectory}`;
}

function includes(str, searchTerm) {
    return str?.includes(searchTerm);
}

function math(...theArguments) {
    const params = [];
    // [0] is the operator
    const operator = theArguments[0];
    let initialValue = 0;
    for (const [index, arg] of theArguments.entries()) {
        if( index === 0){
            continue;
        }
        if (typeof arg !== "number") {
            // todo: maybe parse a string?
            break;
        }
        // [1] is an initial value
        if( index === 1){
            initialValue = arg;
        }
        else if (index > 1) {
            params.push(arg);
        }
    }
    switch (operator) {
        case "+":
            return params.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, initialValue);
        case "-":
            return params.reduce((accumulator, currentValue) => {
                return accumulator - currentValue;
            }, initialValue);

        default:
            return `Operator ${operator} Not Implemented`;
    }
}
