import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import env from "../env.json" assert { type: "json" };

export const GetLeaderboardFunctionDef = DefineFunction({
  callback_id: "get_leaderboard_function",
  title: "Get Leaderboard",
  source_file: "functions/get_leaderboard.ts",
  input_parameters: {
    properties: {
      url: {
        type: Schema.types.string,
        description: "URL to the leaderboard JSON file",
      },
    },
    required: ["url"],
  },
  output_parameters: {
    properties: {
      jsonData: {
        type: Schema.types.object,
        description: "The leaderboard json data",
      },
    },
    required: ["jsonData"],
  },
});

export default SlackFunction(
  GetLeaderboardFunctionDef,
  async ({ inputs }) => {
    try {
      const jsonData = await fetch(inputs.url, {
        credentials: "include",
        headers: {
          Cookie: env.cookie,
        },
      }).then((res: Response) => {
        if (res.status === 200) return res.json();
        else throw new Error(`HTTP Error: ${res.status}`);
      });

      return { outputs: { jsonData: jsonData } };
    } catch (e) {
      console.error(e);
      return {
        error: `An error occurred: ${e}`,
      };
    }
  },
);
