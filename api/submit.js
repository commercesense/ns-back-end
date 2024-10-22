export default function handler(req, res) {

    // Add CORS headers to the response
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from localhost:3000
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');   // Specify allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');         // Allow specific headers

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // End preflight request
  }


    if (req.method === 'POST') {
      const formData = req.body;
      console.log('Form data received:', formData);
  
      // Return a success message
      res.status(200).json({ message: 'Form has been successfully completed' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  