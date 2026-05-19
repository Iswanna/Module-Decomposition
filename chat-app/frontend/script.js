async function getAllMessages() {
  try {
    const response = await fetch("http://localhost:3000/messages");

    const data = await response.json();

    const messageContainer = document.getElementById("all-messages");

    messageContainer.textContent = "";

    data.forEach((message) => {
      const newElement = document.createElement("div");

      newElement.textContent = message.sender + ": " + message.text;

      messageContainer.appendChild(newElement);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

getAllMessages();
