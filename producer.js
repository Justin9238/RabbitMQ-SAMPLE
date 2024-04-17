const amqp = require("amqplib");

async function sendMessage() {
  const connection = await amqp.connect(
    "amqp://admin:admin@192.168.10.128:5672"
  );
  const channel = await connection.createChannel();

  const queue = "hello";

  await channel.assertQueue(queue);

  for (let i = 1; i <= 10; i++) {
    let message = `Hello, ${i}`;
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent %s", message);
  }

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

sendMessage().catch(console.error);
