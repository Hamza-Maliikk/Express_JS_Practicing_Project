const mongoose = require("mongoose")
const dns = require("dns"); dns

async function connectToDatabase(uri) {

  try{
    dns.setServers(["1.1.1.1", "8.8.8.8"]); 
     await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     })
    console.log("Connected to MongoDB")
  } catch(error) {
    console.error("Error connecting to MongoDB:", error)
    throw error
  };
}

module.exports = {
  connectToDatabase
}