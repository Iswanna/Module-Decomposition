import express from "express";

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

    const bodyObject = JSON.parse(bodyString);

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
