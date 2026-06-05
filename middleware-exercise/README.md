# Middleware Exercise: Custom vs. Off-the-Shelf

This project demonstrates the implementation of Middleware in Express.js. It explores two ways of handling request data: manually parsing raw data streams and using built-in Express tools.

## 🚀 How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the Custom Middleware version:**
   ```bash
   node "two custom-written middlewares.js"
   ```

3. **Run the Off-the-Shelf version:**
   ```bash
   node off-the-shelf-middleware.js
   ```

*Note: The server defaults to port `3000`. To use a specific port, use: `PORT=4000 node [filename].js`*

## 🛠 Key Concepts Learned

### 1. The Middleware Pattern
Middleware functions sit between the request and the final route handler. In this project:
- **Username Middleware:** Extracts identity from headers.
- **Validation Middleware:** Ensures the incoming data matches the expected format before the route logic runs.

### 2. Manual Parsing vs. `express.json()`
- **Custom Parsing:** Uses `req.on("data")` and `req.on("end")` to catch raw bytes, translate them via `String.fromCharCode`, and parse them.
- **Built-in Parsing:** Uses `express.json()`, which requires the client to send the `Content-Type: application/json` header.

### 3. Environment Variables & Safety
- **Port Fallback:** Used `process.env.PORT` with a fallback to `3000`.
- **Parsing Numbers:** Used `parseInt(..., 10)` to ensure the port string from the environment is converted to a base-10 integer.
- **ES Modules:** Set `"type": "module"` in `package.json` to allow the use of modern `import/export` syntax.

### 4. Process Management
Learned how to identify and terminate "zombie" processes hanging on a port using:
```bash
sudo lsof -iTCP:3000 -sTCP:LISTEN -Pn
sudo kill -9 <PID>
```

## 🧪 Testing with `curl`

To test the application, use the following commands in your terminal:

**Valid Request (with Username):**
```bash
curl -X POST -H "Content-Type: application/json" -H "X-Username: Ahmed" -d '["Bees", "Birds"]' http://localhost:3000/
```

**Valid Request (Guest):**
```bash
curl -X POST -H "Content-Type: application/json" -d '["Lizards"]' http://localhost:3000/
```

**Invalid Data (should return 400):**
```bash
curl -X POST -H "Content-Type: application/json" -d 'notjson' http://localhost:3000/
```

