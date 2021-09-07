import { useHistory } from "react-router-dom";

import { Button } from "../components/Button";

import "../styles/auth.scss";

import { ilustration, logo, googleIcon } from "../assets/images";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();
  const [codeRoom, setcodeRoom] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (codeRoom.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${codeRoom}`).get();
    if (!roomRef.exists()) {
      alert("Sala não existe.");
      setcodeRoom("");
      return;
    }
    if (roomRef.val().closedAt) {
      alert("Sala já foi encerrada");
      setcodeRoom("");
      return;
    }

    history.push(`rooms/${codeRoom}`);
  }

  return (
    <div id="auth-page">
      <aside>
        <img src={ilustration} alt="Imagem da pagina de login" />
        <strong>Pergunte a seu streamer!</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Logo da página de login" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo do Google." />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              onChange={(e) => setcodeRoom(e.target.value)}
              value={codeRoom}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
