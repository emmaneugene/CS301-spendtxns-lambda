const { ListQueuesCommand } = require("@aws-sdk/client-sqs");
const { sqsClient } = require("./sqsClient.js")

const run = async () => {
  try {
    const data = await sqsClient.send(new ListQueuesCommand({}));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.error(err, err.stack);
  }
};
run();