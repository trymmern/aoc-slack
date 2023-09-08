import { Manifest } from "deno-slack-sdk/mod.ts";
import { GetLeaderboardFunctionDef } from "./functions/get_leaderboard.ts";
import LeaderboardWorkflowDef from "./workflows/leaderboard.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "aoc-slack",
  description:
    "An app that post daily updates about the Advent of Code challenge in a Slack channel",
  icon: "assets/default_new_app_icon.png",
  functions: [GetLeaderboardFunctionDef],
  workflows: [LeaderboardWorkflowDef],
  outgoingDomains: ["adventofcode.com"],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
