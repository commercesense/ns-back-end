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

// Define your list of allowed origins
const allowedOrigins = ['https://ns-front-end.vercel.app', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin, such as mobile apps or curl requests
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed origins list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // Other options like credentials, methods, etc.
};

// Apply the CORS middleware to all routes
app.use(cors(corsOptions));
 

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
{   if (error) {
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal Server Error', details: error });
} else {
  console.log('Response from NetSuite:', body);
 ///return res.status(200).json({ message: body });
   // Return a success message
   res.status(200).json({ message: 'Form has been successfully submitted' });
}

});


});

app.get('/corporatepartners', (req, res) => {
    const formData = req.body;
    console.log('Form data received:', formData);
    
    var accountSettings = {
      accountId: process.env.ACCOUNTID,
      tokenKey: process.env.CPTOKENKEY,
      tokenSecret: process.env.CPTOKENSECRET,
      consumerKey: process.env.CPCONSUMERKEY,
      consumerSecret: process.env.CPCONSUMERSECRET };
  var urlSettings = {
      url: process.env.GETCORPPARTNERSURL,
  }
  console.log('url settings received:', urlSettings.url);
  //create a link
  var corporatepartners = nsrestlet.createLink(accountSettings, urlSettings)
  console.log('Form data received:', corporatepartners);
  corporatepartners.get({action: 'getCorporatePartners'}, function(error, body){
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error });
    } else {
      console.log('Response from NetSuite:', body);
      return res.status(200).json({ message: body });
    }
  });  
});

app.get('/dofmembers', (req, res) => {
  const formData = req.body;
  console.log('Form data received:', formData);
  
  var accountSettings = {
    accountId: process.env.ACCOUNTID,
    tokenKey: process.env.CPTOKENKEY,
    tokenSecret: process.env.CPTOKENSECRET,
    consumerKey: process.env.CPCONSUMERKEY,
    consumerSecret: process.env.CPCONSUMERSECRET };
var urlSettings = {
    url: process.env.GETCORPPARTNERSURL,
}
console.log('url settings received:', urlSettings.url);
//create a link
var dofmembers = nsrestlet.createLink(accountSettings, urlSettings)
console.log('Form data received:', dofmembers);
dofmembers.get({action: 'getDOFMembers'}, function(error, body){
  if (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error });
  } else {
    console.log('Response from NetSuite:', body);
    return res.status(200).json({ message: body });
  }
});  
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
