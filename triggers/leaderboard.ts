import { TriggerTypes } from "deno-slack-api/mod.ts";
import { Trigger } from "deno-slack-api/types.ts";
import env from "../env.json" assert { type: "json" };
import LeaderboardWorkflowDef from "../workflows/leaderboard.ts";

const trigger: Trigger<typeof LeaderboardWorkflowDef.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Leaderboard Trigger",
  description: "Triggers the posting of AoC leaderboard",
  workflow: `#/workflows/${LeaderboardWorkflowDef.definition.callback_id}`,
  inputs: {
    channel: {
      value: env.channelId,
    },
    url: {
      value: env.url,
    },
  },
};

export default trigger;
