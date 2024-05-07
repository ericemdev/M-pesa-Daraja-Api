// Using  dynamic import to import node-fetch for CORSE midware
import('node-fetch').then(({ default: nodeFetch }) => {
  const express = require('express');
  const cors = require('cors');
  
  const app = express();
  const port = 3000;

  // Enabling CORS middleware- security feat..
  app.use(cors());

  app.post('/mpesa/stkpush', async (req, res) => {
    try {
      const response = await nodeFetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // Forwarding the request body
      });

      const data = await response.json();
      res.json(data); // Forwarding the response back to the frontend hell NOO!
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
