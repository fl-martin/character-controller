import { AnimationMixer } from "three";
import { create } from "zustand";

const CharacterControllerStore = create(() => ({
	groundObjects: {},
	actions: {},
	mixer: new AnimationMixer(),
}));

export default CharacterControllerStore;
