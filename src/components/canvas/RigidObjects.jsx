import {
	BallCollider,
	CuboidCollider,
	CylinderCollider,
	RigidBody,
} from "@react-three/rapier";

export default function RigidObjects() {
	return (
		<>
			{/* Rigid body boxes */}
			<RigidBody position={[15, -0.25, 2]} userData={{ floor: true }}>
				<mesh receiveShadow castShadow>
					<boxGeometry args={[0.5, 0.5, 0.5]} />
					<meshStandardMaterial
						color={"green"}
						roughness={0.2}
						metalness={0.8}
					/>
				</mesh>
			</RigidBody>
			<RigidBody position={[15, -0.75, 2]} userData={{ floor: true }}>
				<mesh receiveShadow castShadow>
					<boxGeometry args={[0.5, 0.5, 0.5]} />
					<meshStandardMaterial
						color={"green"}
						roughness={0.2}
						metalness={0.8}
					/>
				</mesh>
			</RigidBody>
			<RigidBody
				position={[15, -0.5, 0]}
				colliders={false}
				userData={{ floor: true }}
			>
				<CuboidCollider args={[0.5, 0.5, 0.5]} />
				<mesh receiveShadow castShadow>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial
						color={"green"}
						roughness={0.2}
						metalness={0.8}
					/>
				</mesh>
			</RigidBody>
			<RigidBody
				position={[15, -0.25, -2]}
				colliders={false}
				userData={{ floor: true }}
			>
				<CuboidCollider args={[1.5 / 2, 1.5 / 2, 1.5 / 2]} />
				<mesh receiveShadow castShadow>
					<boxGeometry args={[1.5, 1.5, 1.5]} />
					<meshStandardMaterial
						color={"green"}
						roughness={0.2}
						metalness={0.8}
					/>
				</mesh>
			</RigidBody>
			<RigidBody
				position={[15, 0, -5]}
				colliders={false}
				userData={{ floor: true }}
			>
				<CuboidCollider args={[1, 1, 1]} />
				<mesh receiveShadow castShadow>
					<boxGeometry args={[2, 2, 2]} />
					<meshStandardMaterial
						color={"green"}
						roughness={0.2}
						metalness={0.8}
					/>
				</mesh>
			</RigidBody>

			{/* Fun toy */}
			<RigidBody
				colliders={false}
				position={[15, -0.75, -10]}
				userData={{ floor: true }}
			>
				<CylinderCollider args={[0.03, 2.5]} position={[0, 0.25, 0]} />
				<BallCollider args={[0.25]} />
				<mesh receiveShadow castShadow>
					<cylinderGeometry args={[2.5, 0.2, 0.5]} />
					<meshStandardMaterial
						color={"green"}
						roughness={0.7}
						metalness={1}
						flatShading
					/>
				</mesh>
			</RigidBody>
		</>
	);
}
