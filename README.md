## 🚀 Deployment

### 1. Prepare for Production

- Make sure your backend (`server`) and frontend (`client`) are working locally.
- In your backend, set environment variables for sensitive data (like `JWT_SECRET` and your MongoDB URI).

### 2. Build the Frontend

From the `client` folder, run:
```
npm run build
```
This creates a `build` folder with static files.

### 3. Serve the Frontend with the Backend

You can serve the React build from your Express backend:

In `server/server.js`, add:
```js
const path = require('path');
// ...other code...
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
```

### 4. Deploy to a Hosting Service

- **Render, Heroku, Railway, or similar:**  
  Push your code to GitHub, connect your repo to the service, and set up environment variables.
- **VPS or your own server:**  
  Install Node.js, copy your code, run `npm install` in both `client` and `server`, build the frontend, and start the backend with `node server.js` or a process manager like `pm2`.

### 5. Set Environment Variables

Set these in your hosting dashboard or `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 6. Start the Server

On your server or in your hosting service, run:
```
node server.js
```
or (recommended for production):
```
npx pm2 start server.js
```

---

**Now your app is live!**  
Users can register, log in, and manage their characters from anywhere.

---

**Tip:**  
For more details, see the docs for your chosen hosting provider (Render, Heroku, Railway,
