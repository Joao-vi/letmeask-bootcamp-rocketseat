import { ReactNode } from "react";
import "../styles/question.scss";
import cx from "classnames";
import { isCallExpression } from "typescript";
type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHightlighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered,
  isHightlighted,
}: QuestionsProps) {
  return (
    <div
      className={cx({
        question: true,
        highlighted: isHightlighted,
        answered: isAnswered && !isHightlighted,
      })}
    >
      <p> {content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="Foto do usuario." />
          <span>{author.name}</span>
        </div>
        <div className="question-btns">{children}</div>
      </footer>
    </div>
  );
}
