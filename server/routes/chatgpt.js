const express = require('express');
const { OpenAI } = require("openai");
const cors = require('cors');
const router = express.Router();

require("dotenv").config();

router.use(cors());

console.log("1");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("2");

router.post('/', async(req, res) =>{
    try{
        const {actor, actress, genre, director, year} = req.body;

        console.log("Recived data:", actor, actress, genre, director, year );
        res.json({ sucess: true });
    }catch(eror){
        console.error("error processing form data:", error);
        res.status(500).json({error: 'internal server error'})
    }
});


router.get('/', async (req, res) => {

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Example model ID for the Davinci model
            messages : [{"role": "user", "content": "name of korean drama"}],
            max_tokens: 256,
            temperature: 0.7,
            top_p: 1,
            presence_penalty: 0,
        });

        const movieName = response.choices[0].message.content;
        console.log("Movie Name:", movieName);
        console.log("5");

        res.json({ movieName });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

console.log("3");

module.exports = router;
