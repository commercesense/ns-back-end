var nsrestlet = require('nsrestlet');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
// CORS configuration to allow specific origin
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
};

// Apply CORS with the above options
app.use(cors(corsOptions));
//app.use(cors());

// Define API routes
app.post('/submit', (req, res) => {
  const formData = req.body;
  console.log('Form data received:', formData);
   
  var accountSettings = {
    accountId: process.env.ACCOUNTID,
    tokenKey: process.env.TOKENKEY,
    tokenSecret: process.env.TOKENSECRET,
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET };
var urlSettings = {
    url: process.env.CREATESALESOPPTYURL,
 }
 
//create a link
var myInvoices = nsrestlet.createLink(accountSettings, urlSettings)
 
//then call get, post, put, or delete
myInvoices.post(formData, function(error, body)
{   console.log(error);
    console.log(body);
});

  // Return a success message
  res.status(200).json({ message: 'Form has been successfully submitted' });
});

// Serve static files in production (if you're building the React app and want to serve it from the same server)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
