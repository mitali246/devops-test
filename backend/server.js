// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });

const TodoSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String
});
const Todo = mongoose.model('Todo', TodoSchema);

// POST Route
app.post('/submittodoitem', async (req, res) => {
    const { itemName, itemDescription } = req.body;
    const newTodo = new Todo({ itemName, itemDescription });
    await newTodo.save();
    res.json({ message: 'Item saved successfully!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
