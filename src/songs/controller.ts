import { Request, Response } from 'express';
import * as songService from './service';

export const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const songs = await songService.getAllSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
};

export const getSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const song = await songService.getSongById(req.params.id);
    if (!song) {
      res.status(404).send('Song not found');
      return;
    }
    res.json(song);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
};

export const createSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, artist, album, duration, genre, releaseDate } = req.body;
    const file = req.file;
    console.log(title, artist, album, duration, genre, releaseDate, file)
    if (!file) {
      res.status(400).send('No file uploaded');
      return;
    }

    const songUrl = (req.file as any).location;

    const song = await songService.createSong(
      { title, artist, album, duration, genre, releaseDate: new Date(releaseDate), songUrl }
    );
    res.status(201).json(song);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
};

export const updateSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSong = await songService.updateSong(req.params.id, req.body);
    if (!updatedSong) {
      res.status(404).send('Song not found');
      return;
    }
    res.json(updatedSong);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
};

export const deleteSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSong = await songService.deleteSong(req.params.id);
    if (!deletedSong) {
      res.status(404).send('Song not found');
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as any).message);
  }
};
