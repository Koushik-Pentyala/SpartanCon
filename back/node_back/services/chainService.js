require('dotenv').config();

const { OpenAI } = require("langchain/llms/openai");
const pineconeService= require('../services/pineconeService')
const { Pinecone } = require('@pinecone-database/pinecone');

const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { ConversationalRetrievalQAChain } = require("langchain/chains");

async function initChain() {
    console.log("Initializing OpenAI model...");
    const model = new OpenAI({});
    console.log("OpenAI model initialized.");
    console.log("Retrieving Pinecone index...");
    console.log(process.env.PINECONE_INDEX)
    
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY || '',
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX ?? '');
    //console.log(await pineconeIndex.query({ topK: 1, id: 'doc_10172'}));

    try {

        console.log("Creating vector store from existing index...");
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({}),
            {
                pineconeIndex: pineconeIndex,
                textKey: 'text',
            },
        );
        console.log("Vector store created successfully.");

        console.log("Initializing ConversationalRetrievalQAChain...");
        const chain = ConversationalRetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
            { returnSourceDocuments: true }
        );
        console.log("ConversationalRetrievalQAChain initialized successfully.");

        return chain;
    } catch (error) {
        console.error("Error creating vector store or initializing QA chain:", error);
        throw error;
    }
}

// Function to initialize the chain and handle the top-level await
async function startService() {
    try {
        const chain = await initChain();
        module.exports.chain = chain;
        console.log("Service started successfully.");
    } catch (error) {
        console.error("Service failed to start:", error);
    }
}

// Start the service
startService();
