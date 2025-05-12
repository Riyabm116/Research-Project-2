const http = require("http");
const { MongoClient, ObjectId } = require("mongodb");
const url = require("url"); 
const cors = require("cors"); 


const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const dbName = "admin";
const collectionName = "patients";


const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 

  if (req.method === "POST" && req.url === "/add-patient") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const patientData = JSON.parse(body);

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await collection.insertOne(patientData);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "✅ Patient saved successfully" }));
      } catch (err) {
        console.error("❌ Error saving patient:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } finally {
        await client.close();
      }
    });
  }

    else if (req.method === "GET" && req.url.startsWith("/get-patient-by-name")) {
    const parsedUrl = url.parse(req.url, true);
    let patientName = parsedUrl.query.name; 
    
    if (!patientName) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Patient name is required");
      return;
    }

    patientName = patientName.trim(); 
    console.log("Looking for patient with name:", patientName); 

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const patient = await collection.findOne({ name: patientName });

      if (patient) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(patient));
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Patient not found");
      }
    } catch (error) {
      console.error("❌ Error retrieving patient:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
    } finally {
        await client.close(); 
      }
    }
    
else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});


server.listen(3002, () => {
  console.log("🚀 Backend server running at http://localhost:3002");
});
