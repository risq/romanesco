import { Vector3 } from "three";

export default {};

export function circle(vertices = 16, radiusX = 0.5, radiusY = radiusX) {
  const angle = 2 * Math.PI / vertices;
  const circle = [];

  for (let i = 0; i < vertices; i++) {
    circle.push(
      new Vector3(
        Math.cos(i * angle) * radiusX,
        0,
        Math.sin(i * angle) * radiusY
      )
    );
  }

  return circle;
}

export function square(width = 1, depth = width) {
  return [
    new Vector3(width / 2, 0, -depth / 2),
    new Vector3(width / 2, 0, depth / 2),
    new Vector3(-width / 2, 0, depth / 2),
    new Vector3(-width / 2, 0, -depth / 2),
  ];
}
