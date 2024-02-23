## Installation

- Here is the image for your reference.

![Installation Image](../assets/installation.png)

<hr>

To run the Request Analyzer locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Swarnendu0123/http-request-inspector
   ```
2. Navigate to the project directory:

   ```bash
   cd http-request-inspector
   ```
3. Install dependencies for the server:

   ```bash
   cd server
   npm install
   ```
4. Open another terminal and Install dependencies for the client:

   ```bash
   cd client
   npm install
   ```
5. Start the server:

   ```bash
   npm run dev
   ```
6. Start the client:

   ```bash
   npm run dev
   ```
7. Now the front end is running on `http://localhost:5173`. The backend is running on `http://localhost:8000`.

8. Go to `client\config.js` and set the `BACKEND_URL` to `http://localhost:8000`
   ```js
   export const BACKEND_URL = 'http://localhost:8000';
   ```
9.  Go to `server\config.js` and select all and paste the code:
    ```js
    const BACKEND_URL = 'http://localhost:8000';
    const FRONTEND_URL = 'http://localhost:5173/';

    module.exports = {
          BACKEND_URL,
          FRONTEND_URL,
    };
    ```

Now, you are good to go.
