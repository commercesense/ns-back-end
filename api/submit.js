export default function handler(req, res) {
    if (req.method === 'POST') {
      const formData = req.body;
      console.log('Form data received:', formData);
  
      // Return a success message
      res.status(200).json({ message: 'Form has been successfully completed' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  