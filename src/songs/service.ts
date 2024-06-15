import AWS from 'aws-sdk';
import { Song, ISong } from './models/SongModel';
import { Express } from 'express';

const s3 = new AWS.S3();

export const uploadSongToS3 = async (file: Express.Multer.File): Promise<string> => {
  const params = {
    Bucket: 'nf-upload',
    Key: `songs/${Date.now()}_${file.originalname}`, // Generate a unique key
    Body: 'hello', // The file content
    ContentType: file.mimetype, // The MIME type of the file
  };

  try {
    console.log('Uploading file with params:', params); // Debugging line
    const data = await s3.upload(params).promise();
    console.log('Upload successful:', data); // Debugging line
    return data.Location; // Return the URL of the uploaded file
  } catch (error: any) {
    console.error('Upload failed:', error); // Debugging line
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
};

export const saveSong = async (song: ISong): Promise<ISong> => {
  const newSong = new Song(song);
  return await newSong.save();
};

export const getAllSongs = async (): Promise<ISong[]> => {
  return await Song.find();
};

export const getSongById = async (id: string): Promise<ISong | null> => {
  return await Song.findById(id);
};

export const updateSong = async (id: string, updatedSong: Partial<ISong>): Promise<ISong | null> => {
  return await Song.findByIdAndUpdate(id, updatedSong, { new: true });
};

export const deleteSong = async (id: string): Promise<ISong | null> => {
  return await Song.findByIdAndDelete(id);
};

export const createSong = async (
  songData: { title: string; artist: string; album: string; duration: number; genre: string; releaseDate: Date, songUrl: string }
): Promise<ISong> => {

  const song = new Song({
    ...songData
  });

  return await song.save();
};