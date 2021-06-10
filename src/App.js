import React, { useState, useEffect, useMemo } from 'react';
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
  const [sourceString, setSourceString] = useState(loading);
  const [output, setOutput] = useState()

  const CustomEditor = useMemo(
    () => withToolbar(withChapterSelection(withChapterPaging(createBasicUsfmEditor()))),
    [sourceString]
  )

  useEffect(() => {
    window.fetch("https://git.door43.org/unfoldingWord/en_ult/raw/tag/25/27-DAN.usfm")
          .then(r=> r.text())
          .then(text => { setSourceString(text) })
  })

  const HandleOutputData = (data) => {
    console.log(data)
    setOutput(data)
  }
  
  const onIdentificationChangeHandle = (id) => {
    console.log(id)
  }
  
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
        onChange={HandleOutputData}
        onIdentificationChange={onIdentificationChangeHandle}
        />
    </div>
  );
}

export default App;
