import * as THREE from "three";
import { Viewer, System, rand, shapes } from "../../index";

const viewer = new Viewer();
const system = new System({ viewer });

Object.assign(window, {
  THREE,
  Vector2: THREE.Vector2,
  Vector3: THREE.Vector3,
  Shape: THREE.Shape,
  viewer,
  system,
  rand,
  shapes,
  rule: system.rule.bind(system),
  start: system.start.bind(system),
});
