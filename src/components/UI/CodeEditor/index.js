import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-sql";

import isMobile from "../../../util/isMobile";
import { Container } from "./styles";

function CodeEditor({ initialValue, value, onChange, height, width }) {
  const monacoEditorConfig = {
    fontLigatures: true,
    fontFamily: "Fira Code",
    fontSize: "16",
    formatOnType: true,
    tabSize: 2,
    wordWrap: true,
    autoIndent: true,
    parameterHints: false,
  };

  return (
    <Container>

      <div className="ace">
        <AceEditor
          theme="tomorrow"
          value={value ? value : ""}
          onChange={newValue => {
            onChange(newValue);
          }}
          width={
            width
              ? width
              : !isMobile()
              ? window.screen.availWidth < 1300
                ? `${window.screen.availWidth - 140}px`
                : "1200px"
              : `${window.screen.availWidth}px`
          }
          height={height ? height : "500px"}
          mode="javascript"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontFamily: "Fira code",
            fontSize: 16,
            tabSize: 2,
          }}
        />
      </div>
    </Container>
  );
}

export default CodeEditor;
