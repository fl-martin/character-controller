import { Canvas } from "@react-three/fiber";
import CharacterControllerDemo from "./components/canvas/CharacterControllerDemo";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";
import LoadingScreen from "./components/dom/LoadingScreen";
import Overlay from "./components/dom/Overlay";

function App() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Canvas performance={{ min: 0.5, max: 1 }} shadows>
				<AdaptiveDpr />
				<CharacterControllerDemo />
			</Canvas>
			<Overlay />
		</Suspense>
	);
}

export default App;
