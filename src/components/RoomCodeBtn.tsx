import { copyBtn } from "../assets/images";
import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCodeBtn(props: RoomCodeProps) {
  function copyCodeRoom(e: any) {
    navigator.clipboard.writeText(props.code);
    e.target.parentNode.classList.add("active");
    setTimeout(
      () => {
        e.target.parentNode.classList.remove("active");
      },

      1500
    );
  }
  return (
    <button className="room-code">
      <div onClick={copyCodeRoom}>
        <img src={copyBtn} alt="Código da sala." />
      </div>
      <span>Sala {props.code}</span>
    </button>
  );
}
