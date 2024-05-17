require('dotenv').config();

const { Pinecone } = require('@pinecone-database/pinecone');

// Check for required environment variables
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
    throw new Error('Pinecone environment or API key vars missing');
}

// Function to initialize Pinecone
async function initPinecone() {
    try {
        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY || '',
        });
        
        return pinecone;
    } catch (error) {
        console.log('Pinecone error:', error);
        throw new Error('Failed to initialize Pinecone Client');
    }
}

// Function to start the service and handle the top-level await
async function startService() {
    try {
        const pineconeClient = await initPinecone();
        module.exports.pinecone = pineconeClient;
        
        console.log("Pinecone client initialized successfully.");
    } catch (error) {
        console.error("Service failed to start:", error);
    }
}

// Start the service
startService();
