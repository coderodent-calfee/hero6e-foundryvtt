import { HeroSystem6eCombat } from "./combat.js";
import { HEROSYS } from "./herosystem6e.js";

export class HeroSystem6eCombatTracker extends CombatTracker {
    static get defaultOptions() {
        var path = "systems/hero6efoundryvttv2/templates/combat/combat-tracker.hbs";
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: path,
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('.segment-active').click(ev => this._onSegmentToggleContent(ev));
    }

    _onSegmentToggleContent(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const segment = header.closest(".segment-container");
        const content = segment.querySelector(".segment-content");
        content.style.display = content.style.display === "none" ? "block" : "none";
    }

    async getData(options) {


        let context = await super.getData(options);

        // Copy combatants from context.turns to segments.
        // Combatants in context.turns was altered (super) to include CSS, and possibly other stuff.
        for (let i = 1; i <= 12; i++) {
            //let newSegment = []
            if (!context.combat?.segments[i]) break;
            for (let _combatant of context.combat?.segments[i]) {

                let turn = _combatant.turn;

                _combatant.css = context.turns[turn].css;
                _combatant.effects = context.turns[turn].effects;
                _combatant.canPing = context.turns[turn].canPing;
                _combatant.active = context.turns[turn].active;
                _combatant.hidden = context.turns[turn].hidden;
            }
        }


        if (context.combat) {

            // Active Segment is expanded, all others are collapsed
            context.activeSegments = [];
            for (let i = 1; i <= 12; i++) {
                context.activeSegments[i] = (context.combat.turn === null && i === 12) || (context.combat?.combatant && context.combat.combatant.segment === i);
            }
            context.segments = context.combat.segments;
        }

        return context;

    }


    /**
   * Scroll the combat log container to ensure the current Combatant turn is centered vertically
   */
    scrollToTurn() {
        //console.log("scrollToTurn");
        const combat = this.viewed;
        if (!combat || (combat.turn === null)) return;
        let active = this.element.find(".active")[0];
        if (!active)
            return;
        let container = active.closest("ol.directory-list"); 

        // Collapse all segments except for the one with the active combatant.
        // Scroll to sement header because it would be nice if it was in view.
        let segment = combat.turns[combat.turn].segment;
        for (let s = 1; s <= 12; s++) {
            let el = container.querySelector(`[data-segment-id="${s}"]`);
            if (el) {
                if (s === segment) {
                    el.style.display = "block";
                    el.parentElement.querySelector("h3").scrollIntoViewIfNeeded()
                } else {
                    el.style.display = "none";
                }
            }
        }

        // Scroll active combatant into view.
        let el = container.querySelector(`[data-turn-id="${combat.turn}"]`)
        if (el) {
            el.scrollIntoViewIfNeeded();
        }
    }
}