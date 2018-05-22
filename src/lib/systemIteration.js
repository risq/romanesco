import * as THREE from "three";
import chroma from "chroma-js";

import { deg2rad } from "./helpers";

const defaultMatrix = new THREE.Matrix4().compose(
  new THREE.Vector3(),
  new THREE.Quaternion(),
  new THREE.Vector3(1, 1, 1)
);

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

function getTrianglesNormals({
  i,
  points,
  pointsCount,
  index,
  belowGeometry,
  belowPoints,
  belowIndex,
}) {
  if (!belowGeometry) {
    return new THREE.Vector3(0, 1, 0); // TODO: handle this case: first iteration (base)
  }

  const upperTrianglesIndexes =
    i === 0 ? [0, 1, pointsCount * 2 - 1] : [2 * i - 1, 2 * i, 2 * i + 1];

  const belowTrianglesIndexes =
    i === 0
      ? [0, pointsCount * 2 - 1, pointsCount * 2 - 2]
      : [2 * i - 2, 2 * i - 1, 2 * i];

  const normal = new THREE.Vector3();
  const v0 = new THREE.Vector3();

  const normalSum = upperTrianglesIndexes.reduce((normalSum, triangleIndex) => {
    normal.subVectors(
      points[index[triangleIndex * 3 + 2]],
      points[index[triangleIndex * 3 + 1]]
    );
    v0.subVectors(
      points[index[triangleIndex * 3]],
      points[index[triangleIndex * 3 + 1]]
    );
    normal.cross(v0);

    return normalSum.add(normal);
  }, new THREE.Vector3());

  const normalSum2 = belowTrianglesIndexes.reduce(
    (normalSum, triangleIndex) => {
      normal.subVectors(
        belowPoints[belowIndex[triangleIndex * 3 + 2]],
        belowPoints[belowIndex[triangleIndex * 3 + 1]]
      );
      v0.subVectors(
        belowPoints[belowIndex[triangleIndex * 3]],
        belowPoints[belowIndex[triangleIndex * 3 + 1]]
      );
      normal.cross(v0);

      return normalSum.add(normal);
    },
    normalSum
  );

  return normalSum2.normalize();
}

function getMatrix(transform) {
  const positionX = (transform && transform.x) || 0;
  const positionY = (transform && transform.y) || 0;
  const positionZ = (transform && transform.z) || 0;

  const rotationX = (transform && transform.rx) || 0;
  const rotationY = (transform && transform.ry) || 0;
  const rotationZ = (transform && transform.rz) || 0;

  const scaleX = (transform && (transform.sx || transform.s)) || 1;
  const scaleY = (transform && (transform.sy || transform.s)) || 1;
  const scaleZ = (transform && (transform.sz || transform.s)) || 1;

  const matrix = new THREE.Matrix4().compose(
    new THREE.Vector3(positionX, positionY, positionZ),
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        deg2rad(rotationX),
        deg2rad(rotationY),
        deg2rad(rotationZ)
      )
    ),
    new THREE.Vector3(scaleX, scaleY, scaleZ)
  );

  return matrix;
}

export default class SystemIteration {
  constructor({ system }) {
    this.rulesDepths = {};
    this.matrix = defaultMatrix.clone();
    this.color = 0xffffff;
    this.system = system;
  }

  call(ruleName, transform) {
    if (!this.system.rules[ruleName]) {
      throw new Error(`Rule "${ruleName}" does not exist.`);
    }

    const matrix = this.matrix
      .clone()
      .multiply(getMatrix(transform, this.matrix));

    const newIteration = this.getNewIteration({
      matrix,
      color: this.getColor(transform),
    });

    if (!newIteration.rulesDepths[ruleName]) {
      newIteration.rulesDepths[ruleName] = 0;
    }
    newIteration.rulesDepths[ruleName]++;

    if (
      this.system.rules[ruleName].maxDepth &&
      this.rulesDepths[ruleName] > this.system.rules[ruleName].maxDepth
    ) {
      return;
    }

    this.system.nextIterationCalls.push({
      ruleName,
      iteration: newIteration,
    });

    if (
      this.system.rules[ruleName].maxDepth &&
      this.rulesDepths[ruleName] === this.system.rules[ruleName].maxDepth &&
      this.system.rules[ruleName].maxDepthCallback
    ) {
      this.call(this.system.rules[ruleName].maxDepthCallback);
    }
  }

  repeat(count, params, cb) {
    const transformMatrix = getMatrix(params);
    const oldMatrix = this.matrix.clone();

    for (let i = 0; i < count; i++) {
      const matrix = oldMatrix.multiply(transformMatrix).clone();

      const newIteration = this.getNewIteration({
        matrix,
      });

      cb.call(newIteration);
    }
  }

  box(transform) {
    this.instanciateMesh(cubeGeometry, transform);
  }

  sphere(transform, { segments = 12 } = {}) {
    const geometry = new THREE.SphereBufferGeometry(0.5, segments, segments);

    this.instanciateMesh(geometry, transform);
  }

  plane(transform) {
    const geometry = new THREE.PlaneBufferGeometry(1);

    this.instanciateMesh(geometry, transform);
  }

  cone(transform, { segments = 12 } = {}) {
    const geometry = new THREE.ConeBufferGeometry(0.5, 1, segments, 1);

    this.instanciateMesh(geometry, transform);
  }

  cylinder(
    transform,
    { segments = 12, radiusTop = 0.5, radiusBottom = 0.5 } = {}
  ) {
    const geometry = new THREE.CylinderBufferGeometry(
      radiusTop,
      radiusBottom,
      1,
      segments
    );

    this.instanciateMesh(geometry, transform);
  }

  circle(transform, { segments = 12 } = {}) {
    const geometry = new THREE.CircleBufferGeometry(0.5, segments, segments);

    this.instanciateMesh(geometry, transform);
  }

  torus(
    transform,
    { tubeRadius = 0.4, radialSegments = 8, tubularSegments = 12 } = {}
  ) {
    const geometry = new THREE.TorusBufferGeometry(
      0.5,
      tubeRadius,
      radialSegments,
      tubularSegments
    );

    this.instanciateMesh(geometry, transform);
  }

  tetrahedron(transform) {
    const geometry = new THREE.TetrahedronBufferGeometry(0.5);

    this.instanciateMesh(geometry, transform);
  }

  octahedron(transform) {
    const geometry = new THREE.OctahedronBufferGeometry(0.5);

    this.instanciateMesh(geometry, transform);
  }

  icosahedron(transform) {
    const geometry = new THREE.IcosahedronBufferGeometry(0.5);

    this.instanciateMesh(geometry, transform);
  }

  dodecahedron(transform) {
    const geometry = new THREE.DodecahedronBufferGeometry(0.5);

    this.instanciateMesh(geometry, transform);
  }

  createExtrudeMesh(transform, { shape } = {}) {
    if (!shape) {
      throw new Error("ExtrudedShape mesh requires a `shape` option");
    }

    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
      steps: 1,
      amount: 1,
      bevelEnabled: false,
    });

    this.instanciateMesh(geometry, transform, { fixRotation: true });
  }

  createLatheMesh(transform, { points, segments = 12 } = {}) {
    if (!points) {
      throw new Error("Lathe mesh requires a `points` option");
    }

    const geometry = new THREE.LatheBufferGeometry(points, {
      segments,
    });

    this.instanciateMesh(geometry, transform);
  }

  createParametricMesh(transform, { func, slices = 12, stacks = 12 }) {
    if (!func) {
      throw new Error("Parametric mesh requires a `func` option");
    }
    const geometry = new THREE.ParametricBufferGeometry(func, slices, stacks);

    this.instanciateMesh(geometry, transform);
  }

  instanciateMesh(geometry, transform, { fixRotation } = {}) {
    if (this.system.objectsCount >= this.system.maxObjects) {
      return;
    }

    this.system.objectsCount++;

    const material = new THREE.MeshPhongMaterial({
      color: this.getColor(transform),
    });

    const mesh = new THREE.Mesh(geometry, material);

    if (transform) {
      mesh.applyMatrix(this.matrix.clone().multiply(getMatrix(transform)));
    } else {
      mesh.applyMatrix(this.matrix);
    }

    if (fixRotation) {
      mesh.rotation.x += Math.PI / 2;
    }

    this.system.mesh.add(mesh);
  }

  growMesh(shape, transform) {
    if (this.system.objectsCount >= this.system.maxObjects) {
      return;
    }

    this.system.objectsCount++;

    const clonedShape = shape.map(point => point.clone()); // TODO
    // clonedShape.forEach(point => point.applyMatrix4(this.matrix))

    if (transform) {
      clonedShape.forEach(point =>
        point.applyMatrix4(this.matrix.clone().multiply(getMatrix(transform))));
    } else {
      clonedShape.forEach(point => point.applyMatrix4(this.matrix));
    }

    if (this.lastMeshShape) {
      const geometry = new THREE.BufferGeometry();

      const points = [...this.lastMeshShape, ...clonedShape];

      const vertices = new Float32Array(
        points.reduce(
          (vertices, point) => [...vertices, point.x, point.y, point.z],
          []
        )
      );

      geometry.addAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const verticesCount = this.lastMeshShape.length + clonedShape.length;
      const pointsCount = clonedShape.length;
      const firstNewVerticeIndex = verticesCount - pointsCount;

      const index = [];
      for (let i = 0; i < pointsCount; i++) {
        index.push(
          i,
          firstNewVerticeIndex + i,
          firstNewVerticeIndex + (i + 1) % pointsCount,
          i,
          firstNewVerticeIndex + (i + 1) % pointsCount,
          (i + 1) % pointsCount
        );
      }

      let normalVectors = new Array(points.length).fill(1);

      normalVectors = normalVectors.map(
        (normalVector, i) =>
          (i < pointsCount
            ? getTrianglesNormals({
              i,
              points,
              pointsCount,
              index,
              belowGeometry: this.belowGeometry,
              belowPoints: this.belowPoints,
              belowIndex: this.belowIndex,
            })
            : new THREE.Vector3(0, 1, 0)) // TODO: handle this case: top points
      );

      const normals = new Float32Array(
        normalVectors.reduce(
          (normals, normalVector) => [
            ...normals,
            normalVector.x,
            normalVector.y,
            normalVector.z,
          ],
          []
        )
      );

      geometry.addAttribute(
        "normal",
        new THREE.Float32BufferAttribute(normals, 3)
      );

      if (this.belowGeometry) {
        for (let i = 0; i < pointsCount * 3; i += 3) {
          this.belowGeometry.attributes.normal.array[i + pointsCount * 3] =
            geometry.attributes.normal.array[i];
          this.belowGeometry.attributes.normal.array[i + 1 + pointsCount * 3] =
            geometry.attributes.normal.array[i + 1];
          this.belowGeometry.attributes.normal.array[i + 2 + pointsCount * 3] =
            geometry.attributes.normal.array[i + 2];
        }

        // this.system.mesh.add(new THREE.VertexNormalsHelper( this.belowMesh, 2, 0x00ff00, 1 ))

        this.belowGeometry.attributes.normal.needsUpdate = true;
      }

      geometry.setIndex(index);
      // geometry.computeFaceNormals();
      // geometry.computeVertexNormals();

      const material = new THREE.MeshPhongMaterial({
        color: this.getColor(transform),
        // wireframe: true
      });
      const mesh = new THREE.Mesh(geometry, material);

      this.system.mesh.add(mesh);

      if (this.belowGeometry) {
        // this.system.mesh.add(new THREE.VertexNormalsHelper( mesh, 2, 0x0000ff, 1 ))
      }
      this.lastMeshShape = clonedShape;
      this.belowPoints = points;
      this.belowIndex = index;
      this.belowGeometry = geometry;
      this.belowMesh = mesh;

      return;
    }

    this.lastMeshShape = clonedShape;
  }

  getNewIteration(params = {}) {
    const rulesDepthClone = Object.assign({}, this.rulesDepths);
    return Object.assign(
      Object.create(SystemIteration.prototype),
      this,
      { rulesDepths: rulesDepthClone },
      params
    );
  }

  getColor(transform) {
    const {
      color, hue, sat, lum,
    } = transform || {};

    const baseColor = color || this.color;
    const hsl = chroma(baseColor).hsl();

    if (hue) {
      hsl[0] += hue;
    }
    if (sat) {
      hsl[1] *= sat;
    }
    if (lum) {
      hsl[2] *= lum;
    }

    return chroma.hsl(hsl).hex();
  }
}
