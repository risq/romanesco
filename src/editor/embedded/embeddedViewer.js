import * as THREE from "three";
import bus from "framebus";

import { Viewer, System, shapes } from "../../index";

const viewer = new Viewer();
const system = new System({ viewer });

Object.assign(window, {
  THREE,
  Vector2: THREE.Vector2,
  Vector3: THREE.Vector3,
  Shape: THREE.Shape,
  viewer,
  system,
  shapes,
  rule: system.rule.bind(system),
  start: system.start.bind(system),
});

bus.on("take-screenshot", () => {
  viewer.render();
  bus.emit("screenshot", viewer.renderer.domElement.toDataURL());
});
