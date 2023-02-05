const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);


app.post('/api/v1/message', async (req, res, next) => {
    try {
        const message = req.body.message;
        if (!message) res.status(400).json({ message: "Please enter message." });

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        res.status(200).json({
            success: true,
            message: completion.data.choices[0].text.slice(2)
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/api/v1/image', async (req, res) => {
    try {
        const message = req.body.message;
        if (!message) res.status(400).json({ message: "Plese request for an image." });

        const response = await openai.createImage({
            prompt: message,
            n: 1,
            size: "1024x1024"
        });

        res.status(200).json({
            success: true,
            url: response.data.data[0].url
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

app.use(express.static(path.join(__dirname + "./../frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../frontend/build/index.html"));
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at:${process.env.PORT}`);
})