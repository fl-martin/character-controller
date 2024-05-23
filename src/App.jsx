import { Canvas } from "@react-three/fiber";
import CharacterControllerDemo from "./components/canvas/CharacterControllerDemo";
import Overlay from "./components/dom/Overlay";
import { AdaptiveDpr } from "@react-three/drei";

function App() {
	return (
		<>
			<Canvas performance={{ min: 1 }}>
				<AdaptiveDpr pixelated />
				<CharacterControllerDemo />
			</Canvas>
			<Overlay />
		</>
	);
}

export default App;
