const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const redis = require("redis");

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

const client = redis.createClient();
const client1 = redis.createClient();

client1.psubscribe("*");
client1.on("pmessage", (pattern, channel, message) => {
  console.log(channel, message);
});

app.post("/publish", (req, res) => {
  client.publish(req.body.key, JSON.stringify(req.body.value));
  res.end();
});

app.listen(6789);
