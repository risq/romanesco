import * as THREE from "three";

import GrowerIteration from "./growerIteration";

export default class Grower {
  constructor() {
    this.rules = {};
    this.mesh = new THREE.Object3D();
    this.nextIterationCalls = [];
    this.objectsCount = 0;
    this.maxObjects = 10000;
    this.depth = 0;
    this.maxDepth = 100;
  }

  start(iteration, endCallback) {
    this.endCallback = endCallback;
    const growerIteration = new GrowerIteration({
      grower: this,
    });
    iteration.call(growerIteration);
    this.iterate();
  }

  def(name, cb) {
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
      this.endCallback();
      return;
    }

    this.depth++;

    if (!this.nextIterationCalls.length) {
      if (this.endCallback) {
        this.endCallback();
      }
      return;
    }

    console.log("iteration", this.depth, "objects", this.objectsCount); // eslint-disable-line

    const iterationCalls = [...this.nextIterationCalls]; // clone array

    this.nextIterationCalls = []; // empty old array

    iterationCalls.forEach(({ ruleName, iteration }) => {
      this.rules[ruleName].rule.call(iteration);
    });

    setTimeout(this.iterate.bind(this), 1);
  }
}
