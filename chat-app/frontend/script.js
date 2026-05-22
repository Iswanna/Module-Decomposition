let lastIdSeen = -1;

async function getAllMessages() {
  try {
    const response = await fetch(
      `http://localhost:3000/messages?since=${lastIdSeen}`,
    );

    const data = await response.json();

    const messageContainer = document.getElementById("all-messages");

    data.forEach((message) => {
      const newElement = document.createElement("div");

      newElement.textContent = message.sender + ": " + message.text;
      lastIdSeen = message.id;
      messageContainer.appendChild(newElement);
    });
    setTimeout(getAllMessages, 5000);
  } catch (error) {
    setTimeout(getAllMessages, 5000);
    console.error("Error fetching messages:", error);
  }
}

getAllMessages();

const formElement = document.getElementById("chat-form");
const senderElement = document.getElementById("chat-sender");
const messageElement = document.getElementById("chat-message");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const senderValue = senderElement.value;
  const messageValue = messageElement.value;

  try {
    // Send the data
    const response = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: senderValue,
        text: messageValue,
      }),
    });

    if (response.ok) {
      // clear the sender and message input values
      senderElement.value = "";
      messageElement.value = "";
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
});
