/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 src/assets/models/school_stairs.glb --transform 
Files: src/assets/models/school_stairs.glb [2.06MB] > /Users/federicomartin/Desktop/Programación/Portfolio/character-controller/school_stairs-transformed.glb [81.76KB] (96%)
Author: yuuuusukeeee (https://sketchfab.com/yuuuusukeeee)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/school-stairs-287058f9d2034f26a9f00e05e2138310
Title: School_[stairs]
*/

import { RigidBody } from "@react-three/rapier";
import modelURL from "../../assets/models/school-stairs.glb";
import { useGLTF } from "@react-three/drei";

export function SchoolStairs(props) {
	const { nodes, materials } = useGLTF(modelURL);
	return (
		<group {...props} dispose={null} scale={0.8}>
			<RigidBody type="fixed" colliders="trimesh">
				<mesh
					geometry={nodes.Object_7.geometry}
					material={materials.PaletteMaterial001}
					scale={0.001}
				/>
				<mesh
					geometry={nodes.Object_62.geometry}
					material={materials.PaletteMaterial002}
					scale={0.001}
				/>
			</RigidBody>
		</group>
	);
}

useGLTF.preload(modelURL);
