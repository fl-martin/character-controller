import { Canvas } from "@react-three/fiber";
import CharacterControllerDemo from "./components/canvas/CharacterControllerDemo";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";
import LoadingScreen from "./components/canvas/LoadingScreen";
import Overlay from "./components/dom/Overlay";

function App() {
	return (
		<>
			<Canvas performance={{ min: 0.5, max: 1 }} shadows>
				<Suspense fallback={<LoadingScreen />}>
					<AdaptiveDpr />
					<CharacterControllerDemo />
				</Suspense>
			</Canvas>
			<Overlay />
		</>
	);
}

export default App;
