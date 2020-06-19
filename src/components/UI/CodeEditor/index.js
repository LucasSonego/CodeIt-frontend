import React from "react";
import { ControlledEditor as MonacoEditor } from "@monaco-editor/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";

import isMobile from "../../../util/isMobile";

import { Container } from "./styles";

function CodeEditor({ initialValue, value, onChange }) {
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
      {!isMobile() ? (
        <div className="monacoeditor">
          <MonacoEditor
            value={initialValue}
            language="javascript"
            theme="dark"
            height="500px"
            width={
              window.screen.availWidth < 1300
                ? `${window.screen.availWidth - 140}px`
                : "1200px"
            }
            onChange={(_, newValue) => onChange(newValue)}
            options={monacoEditorConfig}
          />
        </div>
      ) : (
        <div className="ace">
          <AceEditor
            theme="tomorrow"
            name="aceeditor"
            value={value}
            onChange={newValue => onChange(newValue)}
            width={`${window.screen.availWidth}px`}
            height="400px"
            fontSize="16px"
            tabSize={2}
            mode="javascript"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </div>
      )}
    </Container>
  );
}

export default CodeEditor;
