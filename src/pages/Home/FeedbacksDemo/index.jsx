import React from "react";
import { MdFeedback } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiCodeSSlashLine } from "react-icons/ri";

import { Container } from "./styles";
import teacherPage from "../../../assets/demos/feedbacks-teacher.svg";
import studentPage from "../../../assets/demos/feedbacks-student.svg";

function IconTips() {
  return (
    <div className="icon-tips">
      <span className="tip">
        <FaCheck className="icon green" />: A resposta foi aceita;
      </span>
      <span className="tip">
        <AiOutlineCloseCircle className="icon red" />: A resposta não foi
        aceita;
      </span>
      <span className="tip">
        <MdFeedback className="icon grey" /> /{" "}
        <MdFeedback className="icon yellow" />: Feedback em texto disponível;
      </span>
      <span className="tip">
        <RiCodeSSlashLine className="icon grey" /> /{" "}
        <RiCodeSSlashLine className="icon yellow" />: Feedback em código
        disponível;
      </span>
    </div>
  );
}

function FeedbacksDemo({ teacher }) {
  return (
    <Container>
      <div className="title">
        <MdFeedback /> <h2>Feedbacks</h2>
      </div>
      {teacher ? (
        <div className="teacher">
          <img src={teacherPage} alt="" srcSet="" />
          <span className="tip">
            Os feedbacks serão listados, e alguns ícones são exibidos ao lado:
          </span>
          <IconTips />
        </div>
      ) : (
        <div className="student">
          <img src={studentPage} alt="" srcSet="" />
          <span className="tip">
            Os feedbacks de suas respostas serão listados, e alguns ícones são
            exibidos ao lado:
          </span>
          <IconTips />
        </div>
      )}
    </Container>
  );
}

export default FeedbacksDemo;
