import React, { useState, useEffect } from 'react';
import { createBasicUsfmEditor, withChapterPaging, withChapterSelection, withToolbar } from "usfm-editor"
import './App.css';
import { DemoToolbarSpecs } from './DemoToolbarSpecs'

const loading = String.raw`
\id XXA LOADING
\ide UTF-8
\c 1
\p
\v 1 Loading, please wait...
`.trimLeft()

function App() {
  const CustomEditor = withToolbar(withChapterSelection(withChapterPaging(createBasicUsfmEditor())))

  const [sourceString, setSourceString] = useState(loading);
  useEffect(() => {
    window.fetch("https://git.door43.org/unfoldingWord/en_ult/raw/tag/25/27-DAN.usfm")
          .then(r=> r.text())
          .then(text => { setSourceString(text) })
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          USFM Editor
        </p>
      </header>
      <CustomEditor
        usfmString={sourceString}
        toolbarSpecs={DemoToolbarSpecs}
        />
    </div>
  );
}

export default App;
