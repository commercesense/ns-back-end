var nsrestlet = require('nsrestlet');

export default function handler(req, res) {

    // Add CORS headers to the response
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from localhost:3000
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');   // Specify allowed HTTP methods
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');         // Allow specific headers

   // Add CORS headers to allow requests from the front-end
   res.setHeader('Access-Control-Allow-Origin', 'https://ns-front-end.vercel.app'); // Allow only your front-end origin
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');            // Specify allowed HTTP methods
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');                  // Allow specific headers
  
  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // End preflight request
  }


    if (req.method === 'POST') {
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
     console.log('url settings received:', urlSettings.url);
     console.log('Form data received:', accountSettings);
    //create a link
    var myInvoices = nsrestlet.createLink(accountSettings, urlSettings)
     
    //then call get, post, put, or delete
    myInvoices.post(formData, function(error, body)
    {    if (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error });
      } else {
        console.log('Response from NetSuite:', body);
        return res.status(200).json({ message: "Opportunity Saved" });
      }
    
    }); 
   
      
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  