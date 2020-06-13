import React from "react";
import { ControlledEditor as MonacoEditor } from "@monaco-editor/react";

import isMobile from "../../../util/isMobile";

import { Container } from "./styles";

function CodeEditor({ code, onChange, language, theme }) {
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
        <div className="editorcontainer">
          <MonacoEditor
            value={code}
            language={language}
            theme={theme}
            onChange={(_, value) => onChange(value)}
            height="500px"
            width={
              window.screen.availWidth < 1300
                ? `${window.screen.availWidth - 140}px`
                : "1200px"
            }
            options={monacoEditorConfig}
          />
        </div>
      ) : (
        <h3>Mobile support comming soon!</h3>
      )}
    </Container>
  );
}

export default CodeEditor;
