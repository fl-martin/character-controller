import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import directionOffset from "../../utils/directionOffset";
import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { MOUSE, Quaternion, Vector3 } from "three";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Character from "./Character";

function CharacterController({ characterState, setCharacterState }) {
	const camera = useThree((state) => state.camera);

	const { forward, backward, leftward, rightward, run, jump } =
		useKeyboardControls((state) => state);

	const rigidbody = useRef();
	const character = useRef();
	const controlsRef = useRef();
	const dirLight = useRef();

	const [velocity, setVelocity] = useState(2);
	const [isJumping, setIsJumping] = useState(false);
	const [shouldSwitch, setShouldSwitch] = useState(false);

	const walkDirection = useMemo(() => new Vector3(), []);
	const rotateAngle = useMemo(() => new Vector3(0, 1, 0), []);
	const cameraTarget = useMemo(() => new Vector3(), []);
	const rotateQuaternion = useMemo(() => new Quaternion(), []);

	let angleYCameraDirection;
	let newDirectionOffset;
	let position = new Vector3();
	let moveX;
	let moveZ;

	const updateCameraTarget = useCallback(
		(position) => {
			const cameraDirection = new Vector3();
			camera.getWorldDirection(cameraDirection);

			// Definir la distancia deseada entre la cámara y el personaje
			const desiredDistance = 3; // Por ejemplo, una distancia de 3 unidades

			// Calcular el desplazamiento relativo multiplicando la dirección de la cámara por la distancia deseada
			const relativeCameraOffset = cameraDirection
				.clone()
				.multiplyScalar(-desiredDistance); // El signo negativo es para mover la cámara detrás del personaje

			// Aplicar el desplazamiento relativo a la posición del personaje para obtener la nueva posición de la cámara
			const newCameraPosition = position
				.clone()
				.add(relativeCameraOffset);

			// Mover la cámara hacia la nueva posición
			camera.position.lerp(newCameraPosition, 0.1);

			const newCameraTarget = new Vector3(
				position.x,
				position.y + 2,
				position.z
			);
			cameraTarget.lerp(newCameraTarget, 0.1);

			if (controlsRef.current)
				controlsRef.current.target.copy(cameraTarget);
		},
		[camera, cameraTarget]
	);

	const cameraCharacterCtrl = useCallback(
		(forward, backward, leftward, rightward, delta, velocity) => {
			position = vec3(rigidbody.current?.translation());

			updateCameraTarget(position);

			if (forward || backward || leftward || rightward) {
				dirLight.current.position.x = position.x - 2;
				//dirLight.current.position.y = position.y + 2;
				dirLight.current.position.z = position.z;
				//dirLight.current.target = character.current;

				angleYCameraDirection = Math.atan2(
					camera.position.x - position.x,
					camera.position.z - position.z
				);

				newDirectionOffset = directionOffset(
					forward,
					backward,
					leftward,
					rightward
				);

				rotateQuaternion.setFromAxisAngle(
					rotateAngle,
					angleYCameraDirection + newDirectionOffset
				);

				character.current.quaternion.rotateTowards(
					rotateQuaternion,
					0.2
				);

				camera.getWorldDirection(walkDirection);
				walkDirection.y = 0;
				walkDirection.normalize();
				walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

				moveX = walkDirection.x * delta * velocity;
				moveZ = walkDirection.z * delta * velocity;

				rigidbody.current.setTranslation(
					{
						x: position.x + moveX,
						y: position.y,
						z: position.z + moveZ,
					},
					true
				);
			}
		},
		[]
	);

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Shift" && !shouldSwitch) setShouldSwitch(true);
		});
		window.addEventListener("keyup", (e) => {
			if (e.key === "Shift") setShouldSwitch(false);
		});

		updateCameraTarget(vec3(rigidbody.current.translation()));
	}, []);

	useEffect(() => {
		if (isJumping) return;

		if (forward || leftward || rightward || backward) {
			setCharacterState("walking");

			setVelocity(2);

			if (run) {
				setCharacterState("running");

				setVelocity(3.5);
			}
		} else {
			setCharacterState("idle");
		}
	}, [
		forward,
		backward,
		leftward,
		rightward,
		run,
		setCharacterState,
		isJumping,
	]);

	useEffect(() => {
		if (jump && !isJumping) {
			setIsJumping(true);

			rigidbody.current.setLinvel({ x: 0, y: 7, z: 0 }, true);
		}
	}, [jump, isJumping, setCharacterState]);

	useFrame((state, delta) => {
		cameraCharacterCtrl(
			forward,
			backward,
			leftward,
			rightward,
			delta,
			velocity
		);
	});

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				enablePan={false}
				enableZoom={true}
				maxPolarAngle={Math.PI / 2.5}
				minPolarAngle={Math.PI / 2.5}
				mouseButtons={{
					LEFT: shouldSwitch ? MOUSE.PAN : MOUSE.ROTATE,
					MIDDLE: MOUSE.DOLLY,
					RIGHT: shouldSwitch ? MOUSE.ROTATE : MOUSE.PAN,
				}}
			></OrbitControls>
			<directionalLight
				ref={dirLight}
				castShadow
				position-y={10}
				shadow-camera-left={-20}
				shadow-camera-right={20}
				shadow-camera-top={20}
				shadow-camera-bottom={-20}
			/>
			<RigidBody
				ref={rigidbody}
				enabledRotations={[false, false, false]}
				position={[0, 10, 0]}
				colliders={false}
				gravityScale={1.5}
				onCollisionEnter={({ other }) => {
					if (
						other.rigidBodyObject &&
						other.rigidBodyObject.userData.floor
					) {
						setIsJumping(false);
					}
				}}
				name={"character"}
			>
				<CapsuleCollider
					args={[0.5, 0.5]}
					position={[0, 0.9, 0]}
					restitution={0}
					friction={1.5}
				/>

				<group ref={character}>
					<Character
						rotation={[0, Math.PI, 0]}
						isJumping={isJumping}
						characterState={characterState}
					/>
				</group>
			</RigidBody>
		</>
	);
}

export default CharacterController;
