import CharacterController from "./CharacterController";
import { Environment, KeyboardControls, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import PhysicsFloor from "./PhysicsFloor";
import PhysicsPlatforms from "./PhysicsPlatforms";
import RigidObjects from "./RigidObjects";
import Slopes from "./Slopes";
import { Suspense, useEffect, useMemo, useState } from "react";
import { SchoolStairs } from "./SchoolStairs";
import { Stairs } from "./Stairs";
//import CharacterController2 from "./CharacterController2";

const CharacterControllerDemo = () => {
	const [pausedPhysics, setPausedPhysics] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setPausedPhysics(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, []);

	const [characterState, setCharacterState] = useState("idle");

	const map = useMemo(
		() => [
			{ name: "forward", keys: ["ArrowUp", "KeyW"] },
			{ name: "backward", keys: ["ArrowDown", "KeyS"] },
			{ name: "leftward", keys: ["ArrowLeft", "KeyA"] },
			{ name: "rightward", keys: ["ArrowRight", "KeyD"] },
			{ name: "jump", keys: ["Space"] },
			{ name: "run", keys: ["Shift"] },
		],
		[]
	);

	return (
		<Suspense>
			<ambientLight intensity={0.2} />

			<Environment preset="sunset" />
			<Sky
				distance={4500}
				sunPosition={[2, 0, 6]}
				inclination={2}
				azimuth={0.95}
			/>
			<Physics>
				<PhysicsFloor />
				<PhysicsPlatforms />
				<RigidObjects />
				<Slopes />
				<Stairs position={[-9, -1, -2]} />
				<KeyboardControls map={map}>
					<CharacterController
						characterState={characterState}
						setCharacterState={setCharacterState}
					></CharacterController>
				</KeyboardControls>
			</Physics>
		</Suspense>
	);
};

export default CharacterControllerDemo;
