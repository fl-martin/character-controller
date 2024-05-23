import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import slopesModel from "../../assets/models/slopes.glb";

export default function Slopes() {
	// Load models
	const slopes = useGLTF(slopesModel);

	useEffect(() => {
		// Receive Shadows
		slopes.scene.traverse((child) => {
			if (
				child instanceof Mesh &&
				child.material instanceof MeshStandardMaterial
			) {
				child.receiveShadow = true;
			}
		});
	}, []);

	return (
		<group position={[-10, -1, 10]}>
			<RigidBody
				type="fixed"
				colliders="trimesh"
				rotation={[0, Math.PI, 0]}
				userData={{ floor: true }}
			>
				<primitive object={slopes.scene} />
			</RigidBody>
		</group>
	);
}
