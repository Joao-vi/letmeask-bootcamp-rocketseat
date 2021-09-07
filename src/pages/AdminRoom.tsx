import { logo, deleteImg, checkIcon, answerIcon } from "../assets/images/";
import "../styles/room.scss";

import { RoomCodeBtn } from "../components/RoomCodeBtn";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { AnswerIcon } from "../components/AnswerIcon";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const { title, questions } = useRoom(params.id);

  async function handleCloseRoom() {
    if (window.confirm("Tem certeza ?")) {
      await database.ref(`rooms/${params.id}`).update({
        closedAt: new Date(),
      });
      history.push("/");
    } else {
      return;
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja deletar ?")) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(
    questionId: string,
    isAnswered: boolean
  ) {
    if (isAnswered) {
      await database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
        isAnswered: false,
      });
    } else {
      await database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
        isAnswered: true,
      });
    }
  }

  async function handleHighlighetedQuestion(
    questionId: string,
    isHighlighted: boolean
  ) {
    if (isHighlighted) {
      await database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
        isHightlighted: false,
      });
    } else {
      await database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
        isHightlighted: true,
      });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Logo do site." />
          <div>
            <RoomCodeBtn code={params.id} />
            <Button onClick={handleCloseRoom} isOutlined>
              Encerrar
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta (s)</span>}
        </div>

        <div className="question-section">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHightlighted={question.isHightlighted}
              >
                <>
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(
                            question.id,
                            question.isAnswered
                          )
                        }
                      >
                        <img src={checkIcon} alt="Responder pergunta." />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleHighlighetedQuestion(
                            question.id,
                            question.isHightlighted
                          )
                        }
                      >
                        <AnswerIcon
                          color={`${
                            question.isHightlighted ? "#835afd" : "#737380"
                          }`}
                        />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Botao de deletar." />
                  </button>
                </>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
