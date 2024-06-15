import { Schema, model, Document } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  duration: number;
  genre: string;
  releaseDate: Date;
  songUrl: string;
}

const SongSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  songUrl: { type: String, required: true }
});

export const Song = model<ISong>('Song', SongSchema);
