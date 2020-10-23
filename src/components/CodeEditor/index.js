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

import isMobile from "../../util/isMobile";
import { Container } from "./styles";
import availableLanguages from "./availableLanguages";
import Dropdown from "../Dropdown";

function CodeEditor({
  value,
  onChange,
  height,
  width,
  language,
  setLanguage,
  allowLanguageSelection,
}) {
  const [editorLanguage, setEditorLanguage] = useState({
    label: "selecionar...",
    language: "",
  });

  useEffect(() => {
    const noLanguage = {
      label: "selecionar...",
      language: "",
    };
    if (language) {
      setEditorLanguage(
        availableLanguages.find(element => element.language === language) ||
          noLanguage
      );
    }
  }, [language]);

  return (
    <Container>
      <div className="language-selector">
        <Dropdown
          items={availableLanguages}
          value={editorLanguage}
          onChange={value => {
            setLanguage(value.language);
            setEditorLanguage(value);
          }}
          disabled={!allowLanguageSelection}
        />
      </div>

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
          mode={`${language}`}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontFamily: "Fira code, monospace",
            fontSize: 16,
            tabSize: 2,
          }}
          readOnly={!onChange}
        />
      </div>
    </Container>
  );
}

export default CodeEditor;
