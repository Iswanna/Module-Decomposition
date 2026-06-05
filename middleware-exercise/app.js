import express from "express";

const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const usernameMiddleware = (req, res, next) => {
  const headerValue = req.get("X-username");

  if (headerValue) {
    req.username = headerValue;
  } else {
    req.username = null;
  }

  next();
};

const arrayMiddleware = (req, res, next) => {
  const bodyBytes = [];

  // Every time a piece of data arrives, we put it in our list
  req.on("data", (chunk) => {
    bodyBytes.push(...chunk);
  });

  // When the whole message has arrived, we process it
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);

    let bodyObject;
    try {
      bodyObject = JSON.parse(bodyString);
    } catch (error) {
      res.status(400).send("Invalid JSON");
      return;
    }

    if (
      Array.isArray(bodyObject) &&
      bodyObject.every((item) => typeof item === "string")
    ) {
      req.body = bodyObject;
      next();
    } else {
      res
        .status(400)
        .send(
          "Invalid request body. Expected a JSON array containing only strings.",
        );
    }
  });
};

// Hey Express, whenever a POST request arrives at '/', please call this person first (usernameMiddleware), then this person (arrayMiddleware), then finally do the route logic.
app.post("/", usernameMiddleware, arrayMiddleware, (req, res) => {
  let authPart;
  if (req.username) {
    authPart = `You are authenticated as ${req.username}`;
  } else {
    authPart = "You are not authenticated";
  }
  const MessageCount = req.body.length;

  const messageJoined = req.body.join(",");

  const word = MessageCount <= 1 ? "subject" : "subjects";

  if (MessageCount > 0) {
    res.send(
      `${authPart}\n\nYou have requested information about ${MessageCount} ${word}: ${messageJoined}.`,
    );
  } else {
    res.send(
      `${authPart}\n\nYou have requested information about ${MessageCount} ${word}.`,
    );
  }
});

app.listen(PORT, () => {
  console.log("Type your message here");
});
