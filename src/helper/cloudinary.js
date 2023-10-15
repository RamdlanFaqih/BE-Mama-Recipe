const cloudinary = require ("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: "dlveexbli", 
  api_key: "298162444921734", 
  api_secret: "74odbfcZXfCMN1nBpTGyQkh6xAg" 
});

module.exports = cloudinary;