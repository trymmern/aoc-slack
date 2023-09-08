import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

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
    const url = inputs.url;

    const jsonData = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "",
      },
    })
      .then((res) => {
        const json = res.json();
        console.log("HELLO!", json);
        return json;
      })
      .catch((e) => console.error(e));

    return { outputs: { jsonData: jsonData } };
  },
);

// function getPromise() {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve({ "country": "INDIA" });
//     }, 2000);
//   });
// }

// async function getResult() {
//   let result = await getPromise();
//   return result;
// }

// async function doTask() {
//   let data = await getResult();
//   console.log(data);
// }
// doTask();