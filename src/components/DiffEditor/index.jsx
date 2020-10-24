import React, { useState, useEffect } from "react";
import { DiffEditor as Diff } from "@monaco-editor/react";
import { BsLayoutSplit } from "react-icons/bs";

import { Container, SplitButton } from "./styles";
import isMobile from "../../util/isMobile";

function DiffEditor({ code, diffCode, language, height, width }) {
  const [renderSideBySide, setSideBySide] = useState(false);

  const [editorLanguage, setEditorLanguage] = useState("");

  useEffect(() => {
    //fix lang name difference between Monaco Editor and AceEditor
    language !== "c_cpp"
      ? setEditorLanguage(language)
      : setEditorLanguage("cpp");
  }, [language]);

  return (
    <Container>
      {!isMobile() && (
        <SplitButton
          className="split"
          onClick={() =>
            renderSideBySide ? setSideBySide(false) : setSideBySide(true)
          }
          active={renderSideBySide}
        >
          <BsLayoutSplit />
        </SplitButton>
      )}
      <Diff
        original={code}
        modified={diffCode}
        language={editorLanguage}
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
        theme="dark"
        options={{
          fontLigatures: true,
          fontFamily: "Fira Code",
          fontSize: "16px",
          tabSize: 2,
          readOnly: true,
          inDiffEditor: true,
          renderSideBySide: renderSideBySide,
          lineNumbersMinChars: 3,
        }}
      />
    </Container>
  );
}

export default DiffEditor;
