import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { uuid } from 'uuidv4'

function App() {

  const [trackList, setTracks] = useState([{}]);
  const [status, setStatus] = useState("Logging in")

  // load tracks
  useEffect(() => {
    console.log("fetching data")
    axios.get('https://cors-anywhere.herokuapp.com/https://www.beatport.com')
      .then((response) => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          let tempTracks = [];

          $('div.top-ten-track-meta').each((i, trackItem) => {
            const trackTitle = $(trackItem).find('span.top-ten-track-primary-title').text();
            const trackArtist = $(trackItem).find('span.top-ten-track-artists').text();
            tempTracks[i] = { "title": trackTitle, "artist": trackArtist };
          });

          console.table(tempTracks)
          setTracks(tempTracks);
        }
      })
      .catch(error => console.log(error));


    return (() => {

    });

  }, []);
  const tracks = trackList.map((track) => {
    return <li key={uuid()}>{`Title: ${track.title}, Artist: ${track.artist}`} </li>;
  })
  return (
    <div className="App">
      <ul className="track-list">
        {tracks}
      </ul>
    </div>
  );
}

export default App;
