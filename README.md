<<<<<<< HEAD
<<<<<<< HEAD
# project_ap

=======
>>>>>>> 49a0b47f75e864dba2e39ddcdff956d829738003
## 🚀 Getting Started

### 1. Install React Frontend

Open a terminal and run:
```bash
npx create-react-app client
cd client
npm install axios
```

### 2. Install MongoDB & MongoDB Compass

- Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
- Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass) for a GUI to view your data.

Start MongoDB on your computer (it usually runs automatically after install).

### 3. Install Backend Dependencies

Open a new terminal in your project root (where `server` folder is) and run:
```bash
cd server
npm install
```

### 4. Running the App

#### Option 1: Run Each Part Separately

- **Start the backend:**  
  In the `server` folder terminal:
  ```bash
  node server.js
  ```
  *(or use `npx nodemon server.js` if you have nodemon installed)*

- **Start the frontend:**  
  Open a new terminal, go to the `client` folder:
  ```bash
  npm start
  ```

#### Option 2: Run Both with One Command (using `concurrently`)

- In your project root, install concurrently:
  ```bash
  npm install concurrently --save-dev
  ```
- Add this to your root `package.json` scripts:
  ```json
  "scripts": {
    "dev": "concurrently \"cd server && node server.js\" \"cd client && npm start\""
  }
  ```
- Then run:
  ```bash
  npm run dev
  ```

---

Now you can access the app at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:5000](http://localhost:5000).

<<<<<<< HEAD
---
=======
---
>>>>>>> 49a0b47f75e864dba2e39ddcdff956d829738003
=======

>>>>>>> 298ed46e4153a87f25fc5cd964ece87f97ffad0d
