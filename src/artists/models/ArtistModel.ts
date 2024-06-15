import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  height: Number,
  url: String,
  width: Number
});

const ExternalUrlSchema = new Schema({
  spotify: String
});

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  genres: [String],
  followers: {
    total: {
      type: Number,
      default: 0
    }
  },
  popularity: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  images: [ImageSchema],
  external_urls: ExternalUrlSchema,
  spotify_id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    default: 'artist'
  }
}, {
  timestamps: true
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
