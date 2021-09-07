import { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Questions = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHightlighted: boolean;
  likesCount: number;
  likeId: string | undefined;
};

type firebaseDataQuestions = Record<
  string,
  {
    author: {
      avatar: string;
      name: string;
    };
    content: string;
    isAnswered: boolean;
    isHightlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: firebaseDataQuestions =
        databaseRoom.questions ?? {};
      const parseQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          console.log(Object.entries(value.likes ?? {}));
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHightlighted: value.isHightlighted,
            likesCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => {
              return like.authorId === user?.id;
            })?.[0],
          };
        }
      );

      setQuestions(parseQuestions);
      setTitle(databaseRoom.title);

      return () => {
        roomRef.off("value");
      };
    });
  }, [roomId, user?.id]);

  return { title, questions };
}
