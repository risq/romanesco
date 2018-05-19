import * as THREE from "three";

import { deg2rad } from "./helpers";

const defaultMatrix = new THREE.Matrix4().compose(
  new THREE.Vector3(),
  new THREE.Quaternion(),
  new THREE.Vector3(1, 1, 1)
);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

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

function getMatrix({
  x = 0,
  y = 0,
  z = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  s = 1,
  sx,
  sy,
  sz,
} = {}) {
  const matrix = new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(deg2rad(rx), deg2rad(ry), deg2rad(rz))
    ),
    new THREE.Vector3(sx || s, sy || s, sz || s)
  );

  return matrix;
}

export default class GrowerIteration {
  constructor({ grower }) {
    this.rulesDepths = {};
    this.matrix = defaultMatrix.clone();
    this.color = 0xffffff;
    this.grower = grower;
  }

  call(ruleName, params) {
    const matrix = params
      ? this.matrix.clone().multiply(getMatrix(params, this.matrix))
      : this.matrix.clone();

    const newIteration = this.getNewIteration({
      matrix,
      color: (params && params.color) || this.color, // TODO better handing
    });

    if (!newIteration.rulesDepths[ruleName]) {
      newIteration.rulesDepths[ruleName] = 0;
    }
    newIteration.rulesDepths[ruleName]++;

    if (
      this.grower.rules[ruleName].maxDepth &&
      this.rulesDepths[ruleName] > this.grower.rules[ruleName].maxDepth
    ) {
      return;
    }

    this.grower.nextIterationCalls.push({
      ruleName,
      iteration: newIteration,
    });

    if (
      this.grower.rules[ruleName].maxDepth &&
      this.rulesDepths[ruleName] === this.grower.rules[ruleName].maxDepth &&
      this.grower.rules[ruleName].maxDepthCallback
    ) {
      this.call(this.grower.rules[ruleName].maxDepthCallback);
    }
  }

  repeat(count, params, cb) {
    const transformMatrix = getMatrix(params);
    const oldMatrix = this.matrix.clone();

    for (let i = 0; i < count; i++) {
      const multipliedMatrix = oldMatrix.multiply(transformMatrix).clone();

      cb.call(
        Object.assign({}, this, {
          matrix: multipliedMatrix,
        })
      );
    }
  }

  box(params) {
    if (this.grower.objectsCount >= this.grower.maxObjects) {
      return;
    }

    this.grower.objectsCount++;

    const material = new THREE.MeshPhongMaterial({
      color: !params || params.color === undefined ? this.color : params.color,
    });

    const cube = new THREE.Mesh(cubeGeometry, material);

    if (params) {
      cube.applyMatrix(this.matrix.clone().multiply(getMatrix(params)));
    } else {
      cube.applyMatrix(this.matrix);
    }

    this.grower.mesh.add(cube);
  }

  growMesh(shape, params) {
    if (this.grower.objectsCount >= this.grower.maxObjects) {
      return;
    }

    this.grower.objectsCount++;

    const clonedShape = shape.map(point => point.clone()); // TODO
    // clonedShape.forEach(point => point.applyMatrix4(this.matrix))

    if (params) {
      clonedShape.forEach(point =>
        point.applyMatrix4(this.matrix.clone().multiply(getMatrix(params))));
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

        // this.grower.mesh.add(new THREE.VertexNormalsHelper( this.belowMesh, 2, 0x00ff00, 1 ))

        this.belowGeometry.attributes.normal.needsUpdate = true;
      }

      geometry.setIndex(index);
      // geometry.computeFaceNormals();
      // geometry.computeVertexNormals();

      const material = new THREE.MeshPhongMaterial({
        color: this.color,
        // wireframe: true
      });
      const mesh = new THREE.Mesh(geometry, material);

      this.grower.mesh.add(mesh);

      if (this.belowGeometry) {
        // this.grower.mesh.add(new THREE.VertexNormalsHelper( mesh, 2, 0x0000ff, 1 ))
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
      Object.create(GrowerIteration.prototype),
      this,
      { rulesDepths: rulesDepthClone },
      params
    );
  }
}
