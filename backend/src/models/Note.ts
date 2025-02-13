import mongoose, { Schema, Document } from 'mongoose';

interface INote extends Document {
  title: string;
  content: string;
  position: { x: number, y: number };
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    position: { type: Object, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INote>('Note', NoteSchema);
