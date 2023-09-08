import { TriggerTypes } from "deno-slack-api/mod.ts";
import { Trigger } from "deno-slack-api/types.ts";
import LeaderboardWorkflowDef from "../workflows/leaderboard.ts";

const trigger: Trigger<typeof LeaderboardWorkflowDef.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Leaderboard Trigger",
  description: "Triggers the posting of AoC leaderboard",
  workflow: `#/workflows/${LeaderboardWorkflowDef.definition.callback_id}`,
  inputs: {
    channel: {
      value: "C05RHUZSB6E",
    },
    url: {
      value:
        "https://adventofcode.com/2022/leaderboard/private/view/1537702.json",
    },
  },
};

export default trigger;
