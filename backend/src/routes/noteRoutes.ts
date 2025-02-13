import axios from 'axios';
import Note from '../models/Note';
import { API_KEY } from '../server';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/notes', async (req: Request, res: Response) => {
  const { title, content, position } = req.body;
  try {
    const note = new Note({ title, content, position });
    await note.save();
    res.status(201).json(note);
  } catch (err : any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/notes', async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    console.log("notes", notes);
    res.status(200).json(notes);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/notes/:id', async (req: Request, res: Response) => {
  const { title, content, position } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content, position }, { new: true });
    res.status(200).json(note);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/notes/:id', async (req: Request, res: Response) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/enhance-note', async (req: Request, res: Response) => {
  const { content } = req.body;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'user',
          content: `Improve the grammar and style of the following note: ${content} output only the content`,
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ content: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Error enhancing note' });
  }
});


export default router;
