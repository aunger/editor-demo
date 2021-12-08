import React, { useState, useEffect } from 'react';
import { usfmToSlate } from "usfm-editor/dist/transforms/usfmToSlate"
import './App.css';

const InitialUrl = "https://git.door43.org/WycliffeAssociates/en_ulb/raw/branch/master/57-TIT.usfm"

function App() {
  const [usfmUrl, setUsfmUrl] = useState(InitialUrl);
  const [slateString, setSlateString] = useState("");
  useEffect(() => {
    window.fetch(usfmUrl)
          .then(r=> {
            if (r.ok) return r.text()
            else throw r.statusText
          })
          .then(usfmToSlate)
          .then(slate => JSON.stringify(slate, null, 2))
          .catch(reason => "Error: " + JSON.stringify(reason, null, 2) + reason)
          .then(setSlateString)
  }, [usfmUrl])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>USFM to Slate</p>
      </header>
      <input type="text" value={usfmUrl} onChange={e => setUsfmUrl(e.target.value)} />
      <pre>{slateString}</pre>
    </div>
  );
}

export default App;
