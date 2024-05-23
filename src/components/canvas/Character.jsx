import modelURL from "../../assets/models/anim-model2.glb";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";

export default function Character({ isJumping, rotation, characterState }) {
	const group = useRef();

	const { nodes, materials, animations } = useGLTF(modelURL);
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		actions["jumping"].timeScale = 1.5;
		actions["jumping"].setLoop(LoopOnce);
	}, []);

	useEffect(() => {
		actions[characterState].reset().fadeIn(0.2).play();

		if (isJumping) {
			actions["jumping"].reset().fadeIn(0.2).play();
			actions["jumping"].time = 0.3;
		}

		return () => {
			if (isJumping) {
				actions["jumping"]?.fadeOut(0.2);
			}

			actions[characterState]?.fadeOut(0.2);
		};
	}, [characterState, actions, isJumping]);

	return (
		<group ref={group} rotation={rotation} dispose={null}>
			<group name="Scene">
				<group name="Armature">
					<skinnedMesh
						name="avaturn_glasses_0"
						geometry={nodes.avaturn_glasses_0.geometry}
						material={materials.avaturn_glasses_0_material}
						skeleton={nodes.avaturn_glasses_0.skeleton}
					/>
					<skinnedMesh
						name="avaturn_glasses_1"
						geometry={nodes.avaturn_glasses_1.geometry}
						material={materials.avaturn_glasses_1_material}
						skeleton={nodes.avaturn_glasses_1.skeleton}
					/>
					<skinnedMesh
						name="avaturn_look_0"
						geometry={nodes.avaturn_look_0.geometry}
						material={materials.avaturn_look_0_material}
						skeleton={nodes.avaturn_look_0.skeleton}
						castShadow
					/>
					<skinnedMesh
						name="avaturn_shoes_0"
						geometry={nodes.avaturn_shoes_0.geometry}
						material={materials.avaturn_shoes_0_material}
						skeleton={nodes.avaturn_shoes_0.skeleton}
						castShadow
					/>
					<skinnedMesh
						name="Body_Mesh"
						geometry={nodes.Body_Mesh.geometry}
						material={materials.Body}
						skeleton={nodes.Body_Mesh.skeleton}
						castShadow
					/>
					<skinnedMesh
						name="Eye_Mesh"
						geometry={nodes.Eye_Mesh.geometry}
						material={materials.Eyes}
						skeleton={nodes.Eye_Mesh.skeleton}
						morphTargetDictionary={
							nodes.Eye_Mesh.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Eye_Mesh.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="EyeAO_Mesh"
						geometry={nodes.EyeAO_Mesh.geometry}
						material={materials.EyeAO}
						skeleton={nodes.EyeAO_Mesh.skeleton}
						morphTargetDictionary={
							nodes.EyeAO_Mesh.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.EyeAO_Mesh.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="Eyelash_Mesh"
						geometry={nodes.Eyelash_Mesh.geometry}
						material={materials.Eyelash}
						skeleton={nodes.Eyelash_Mesh.skeleton}
						morphTargetDictionary={
							nodes.Eyelash_Mesh.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Eyelash_Mesh.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="Head_Mesh"
						geometry={nodes.Head_Mesh.geometry}
						material={materials.Head}
						skeleton={nodes.Head_Mesh.skeleton}
						morphTargetDictionary={
							nodes.Head_Mesh.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Head_Mesh.morphTargetInfluences
						}
						castShadow
					/>
					<skinnedMesh
						name="Teeth_Mesh"
						geometry={nodes.Teeth_Mesh.geometry}
						material={materials.Teeth}
						skeleton={nodes.Teeth_Mesh.skeleton}
						morphTargetDictionary={
							nodes.Teeth_Mesh.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Teeth_Mesh.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="Tongue_Mesh"
						geometry={nodes.Tongue_Mesh.geometry}
						material={materials["Teeth.001"]}
						skeleton={nodes.Tongue_Mesh.skeleton}
						morphTargetDictionary={
							nodes.Tongue_Mesh.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Tongue_Mesh.morphTargetInfluences
						}
					/>
					<primitive object={nodes.Hips} />
				</group>
			</group>
		</group>
	);
}

useGLTF.preload(modelURL);
