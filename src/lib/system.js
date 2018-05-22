import * as THREE from "three";

import SystemIteration from "./systemIteration";

export default class System {
  constructor({ viewer }) {
    this.viewer = viewer;
    this.rules = {};
    this.mesh = new THREE.Object3D();
    this.nextIterationCalls = [];
    this.objectsCount = 0;
    this.maxObjects = 10000;
    this.depth = 0;
    this.maxDepth = 100;

    if (this.viewer) {
      this.viewer.addMesh(this.mesh);
    }
  }

  start(iteration, endCallback) {
    if (endCallback) {
      this.endCallback = endCallback;
    }

    const systemIteration = new SystemIteration({
      system: this,
    });
    iteration.call(systemIteration);
    this.iterate();
  }

  rule(name, cb) {
    const rule = {
      rule: cb,
    };

    this.rules[name] = rule;

    return {
      maxDepth(maxDepth, callback) {
        rule.maxDepth = maxDepth;
        rule.maxDepthCallback = callback;
      },
    };
  }

  iterate() {
    if (this.depth >= this.maxDepth || this.objectsCount >= this.maxObjects) {
      if (this.endCallback) {
        this.endCallback();
      }
      return;
    }

    this.depth++;

    if (!this.nextIterationCalls.length) {
      if (this.endCallback) {
        this.endCallback();
      }
      return;
    }

    const iterationCalls = [...this.nextIterationCalls]; // clone array

    this.nextIterationCalls = []; // empty old array

    iterationCalls.forEach(({ ruleName, iteration }) => {
      this.rules[ruleName].rule.call(iteration);
    });

    console.log("iteration", this.depth, "objects", this.objectsCount); // eslint-disable-line

    if (this.viewer) {
      this.viewer.needsUpdate = true;
    }

    setTimeout(this.iterate.bind(this), 1);
  }
}
