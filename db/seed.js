import db from "#db/client";
import { createPlaylist } from "#db/queries/playlists";
import { createTrack } from "#db/queries/tracks";
import { addTrackToPlaylist } from "#db/queries/playlist_tracks";

await db.connect();
await seed();
await db.end();

console.log("🌱 Database seeded.");

async function seed() {
  const playlists = [];
  const tracks = [];
  for (let i = 1; i <= 10; i++) {
    playlists.push(await createPlaylist("Playlist " + i));
  }
  for (let j = 1; j <= 20; j++) {
    tracks.push(await createTrack("Track " + j, 1000 * j));
  }
  let count = 0;
  for (let i = 0; i < playlists.length && count < 15; i++) {
    for (let j = 0; j < tracks.length && count < 15; j++) {
      await addTrackToPlaylist(playlists[i].id, tracks[j].id);
      count++;
    }
  }
}