const { SendMessageCommand } = require("@aws-sdk/client-sqs")
const { sqsClient } = require("./sqsClient")

const sendMessage = async ( body ) => {
    params = {
        MessageGroupId: "lambda-crud",
        MessageDeduplicationId: "lambda-crud",
        MessageBody: JSON.stringify(body),
        QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/731706226892/transaction-queue.fifo"
    }
    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        console.log("Success, message sent. MessageID:", data.MessageId);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
}

module.exports = { sendMessage }