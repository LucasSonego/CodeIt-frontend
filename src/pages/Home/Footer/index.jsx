import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoMarkGithub, GoMail, GoIssueOpened } from "react-icons/go";

import { Container } from "./styles";

function Footer() {
  const [githubData, setGithubData] = useState({});

  useEffect(() => {
    async function getGitHubData() {
      const response = await axios.get(
        "https://api.github.com/users/LucasSonego"
      );
      setGithubData(response.data);
    }
    getGitHubData();
  }, []);
  return (
    <Container>
      {githubData && (
        <>
          <div className="about">
            <div className="avatar">
              <img src={githubData.avatar_url} alt="" srcSet="" />
            </div>
            <div className="info">
              <h3>Lucas Sônego</h3>
              <div className="git">
                <GoMarkGithub />
                <a
                  href={githubData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/LucasSonego
                </a>
              </div>
              <div className="email">
                <GoMail />
                <a href="mailto:lucassonego@ufpr.br">lucassonego@ufpr.br</a>
              </div>
            </div>
          </div>
          <div className="issues">
            <h4>Encontrou algum bug?</h4>
            <p>
              Abra uma <em>issue</em> descrevendo o problema;
            </p>
            <a
              href="https://github.com/LucasSonego/CodeIt-frontend/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoIssueOpened /> Issues
            </a>
          </div>
        </>
      )}
    </Container>
  );
}

export default Footer;
