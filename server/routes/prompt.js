const express = require("express");
const { OpenAI } = require("openai"); 

const route = express.Router();
require("dotenv").config(); 

route.get("/", async(req,res,next) => {
    const openai = new OpenAI({apiKey: process.env.OPENAI_SECRET_KEY}); 
    const userInput = req.query.prompt;
    console.log("userInput: ", userInput);
    const completion = await openai.chat.completions.create({
        messages: [{role: "user", content: userInput}],
        model: "gpt-3.5-turbo"
    })
    console.log("completion: ", completion)
})

module.exports = route;
// let APIcall = async () => { 
// const newConfig = new Configuration({ 
// 	apiKey: process.env.OPENAI_SECRET_KEY 
// }); 
// const openai = new OpenAIApi(newConfig); 
	
// const chatHistory = []; 

// do { 
// 	const user_input = readlineSync.question("Enter your input: "); 
// 	const messageList = chatHistory.map(([input_text, completion_text]) => ({ 
// 	role: "user" === input_text ? "ChatGPT" : "user", 
// 	content: input_text 
// 	})); 
// 	messageList.push({ role: "user", content: user_input }); 

// 	try { 
// 	const GPTOutput = await openai.createChatCompletion({ 
// 		model: "gpt-3.5-turbo", 
// 		messages: messageList, 
// 	}); 

// 	const output_text = GPTOutput.data.choices[0].message.content; 
// 	console.log(output_text); 

// 	chatHistory.push([user_input, output_text]); 
// 	} catch (err) { 
// 	if (err.response) { 
// 		console.log(err.response.status); 
// 		console.log(err.response.data); 
// 	} else { 
// 		console.log(err.message); 
// 	} 
// 	} 
// } while (readlineSync.question("\nYou Want more Results? (Y/N)").toUpperCase() === "Y"); 
// }; 
// APIcall();


