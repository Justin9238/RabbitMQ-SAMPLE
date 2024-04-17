const amqp = require("amqplib");

async function receiveMessage() {
  const connection = await amqp.connect(
    "amqp://admin:admin@192.168.10.128:5672"
  );
  const channel = await connection.createChannel();

  const queue = "hello";

  await channel.assertQueue(queue);
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  channel.consume(
    queue,
    function (msg) {
      let secs = msg.content.toString().split(".").length - 1;
      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function () {
        console.log(" [x] Done");
        channel.ack(msg);
      }, 2 * 1000);
    },
    { noAck: false }
  );
}

receiveMessage().catch(console.error);
