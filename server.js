require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 9345;

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: MONGODB_URI is not defined.');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use(express.json());

let tasksCollection;

async function connectToMongoDB() {
  try {
    await client.connect();
    //console.log('mongoDB connected successfully');
    const database = client.db('todolist');
    tasksCollection = database.collection('tasks');
  } catch (error) {
    console.error('failed connect to mongodb', error);
    process.exit(1);
  }
}

connectToMongoDB();

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await tasksCollection.find({}).toArray();
    res.json(tasks);
  } catch (err) {
    console.error('error fetching tasks:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const task = {
    text: req.body.text,
    completed: req.body.completed || false,
    createdAt: new Date()
  };
  try {
    const result = await tasksCollection.insertOne(task);
    const newTask = { _id: result.insertedId, ...task };
    res.status(201).json(newTask);
  } catch (err) {
    console.error('error creating task:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const result = await tasksCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { completed: req.body.completed } },
      { returnDocument: 'after' }
    );
    if (!result) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('error updating task:', err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});