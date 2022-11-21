export default class SettingsHelpers {
    // Initialize System Settings after the Init Hook
    static initLevelSettings() {
      let module = "hero6e-foundryvtt-experimental";

      game.settings.register(module, "stunned", {
        name: "Use Stunned",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        onChange: value=> console.log(value)
      });

      game.settings.register(module, "use endurance", {
        name: "Use Endurance",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        onChange: value=> console.log(value)
      });

      game.settings.register(module, "knockback", {
        name: "Use Knockback",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: value=> console.log(value)
      });

      game.settings.register(module, "hit locations", {
        name: "Hit Locations",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: value=> console.log(value)
      });

      game.settings.register(module, "hitLocTracking", {
        name: "Hit Location: Track Damage Done to Individual Body Parts",
        scope: "world",
        config: true,
        type: String,
        choices: {
          none: "Don't track",
          all: "Track for all"
        },
        default: false,
        onChange: value=> console.log(value)
      });

      game.settings.register(module, "optionalManeuvers", {
        name: "Optional Maneuvers",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: value=> console.log(value)
      });

      game.settings.register(module, "automation", {
        name: "Attack Card Automation",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: value=> console.log(value)
      });
    }
  }