import { RigidBody } from "@react-three/rapier";
import mapURL from "../../assets/images/metal2/Metal_scratched_009_roughness.jpg";
import normalMapURL from "../../assets/images/metal2/Metal_scratched_009_normal.jpg";
import roughnessMapURL from "../../assets/images/metal2/Metal_scratched_009_roughness.jpg";
import aoMapURL from "../../assets/images/metal2/Metal_scratched_009_ambientOcclusion.jpg";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import CharacterControllerStore from "../store";

export default function PhysicsFloor() {
	const ref = useRef();
	const groundObjects = CharacterControllerStore(
		(state) => state.groundObjects
	);

	useEffect(() => {
		const id = ref.current.name;
		groundObjects[id] = ref.current;
		return () => {
			delete groundObjects[id];
		};
	}, [groundObjects, ref]);

	const textures = useTexture({
		map: mapURL,
		normalMap: normalMapURL,
		roughnessMap: roughnessMapURL,
		aoMap: aoMapURL,
	});

	return (
		<RigidBody type="fixed" userData={{ floor: true }}>
			<mesh
				receiveShadow
				position={[0, -3.5, 0]}
				name={"floor"}
				ref={ref}
			>
				<boxGeometry args={[100, 5, 100]} />
				<meshStandardMaterial
					color="gray"
					{...textures}
					roughness={2}
				/>
			</mesh>
		</RigidBody>
	);
}
