import * as THREE from "three";
import { Viewer, Grower, rand, shapes } from "../../index";

const viewer = new Viewer();
const grower = new Grower();

viewer.scene.add(grower.mesh);

Object.assign(window, {
  THREE,
  Vector2: THREE.Vector2,
  Vector3: THREE.Vector3,
  Shape: THREE.Shape,
  viewer,
  grower,
  rand,
  shapes,
  def: grower.def.bind(grower),
  start: grower.start.bind(grower),
});
