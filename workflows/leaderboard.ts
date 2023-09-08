import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { GetLeaderboardFunctionDef } from "../functions/get_leaderboard.ts";

const LeaderboardWorkflowDef = DefineWorkflow({
  callback_id: "leaderboard_workflow",
  title: "Leaderboard Workflow",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      url: {
        type: Schema.types.string,
      },
    },
    required: ["channel", "url"],
  },
});

const getLeaderBoardStep = LeaderboardWorkflowDef.addStep(
  GetLeaderboardFunctionDef,
  { url: LeaderboardWorkflowDef.inputs.url },
);

console.log(getLeaderBoardStep.outputs.jsonData);

LeaderboardWorkflowDef.addStep(Schema.slack.functions.SendMessage, {
  channel_id: LeaderboardWorkflowDef.inputs.channel,
  message: getLeaderBoardStep.outputs.jsonData.toString(),
});

export default LeaderboardWorkflowDef;
