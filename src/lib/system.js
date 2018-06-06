import * as THREE from "three";

import SystemIteration from "./systemIteration";

export default class System {
  constructor({ viewer, seed }) {
    this.viewer = viewer;
    this.rules = {};
    this.mesh = new THREE.Object3D();
    this.nextIterationCalls = [];
    this.objectsCount = 0;
    this.maxObjects = 10000;
    this.depth = 0;
    this.maxDepth = 100;
    this.seed = seed;

    if (this.viewer) {
      this.viewer.addMesh(this.mesh);
    }
  }

  start(rule, endCallback, { seed } = {}) {
    if (endCallback) {
      this.endCallback = endCallback;
    }

    const systemIteration = new SystemIteration({
      system: this,
      seed: seed || this.seed,
    });

    systemIteration.call(rule);

    this.iterate();
  }

  rule(name, ruleFunction, weight = 1) {
    if (!this.rules[name]) {
      this.rules[name] = {
        variations: [],
      };
    }

    const rule = this.rules[name];
    const variation = {
      rule: ruleFunction,
      weight,
    };

    rule.variations.push(variation);

    return {
      maxDepth(maxDepth, maxDepthReachedRule) {
        rule.maxDepth = maxDepth;
        rule.maxDepthReachedRule = maxDepthReachedRule;
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
      const rule = iteration.rand.weighted(
        this.rules[ruleName].variations.map(({ rule, weight }) => ({
          value: rule,
          weight,
        }))
      );

      rule.call(iteration);
    });

    console.log("iteration", this.depth, "objects", this.objectsCount); // eslint-disable-line

    if (this.viewer) {
      this.viewer.needsUpdate = true;
    }

    setTimeout(this.iterate.bind(this), 1);
  }
}
