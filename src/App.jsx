import { Leva } from "leva";
import { Loader } from "@react-three/drei";
import HeroCanvas from "./components/HeroCanvas";
import Overlay from "./components/Overlay";
import "./App.css";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        margin: 0,
        padding: 0,
      }}
    >
      <Leva hidden={import.meta.env.PROD} />
      {/* Background 3D Canvas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <HeroCanvas />
      </div>

      {/* Foreground UI Overlay */}
      <Overlay />
      <Loader />
    </div>
  );
}

export default App;
