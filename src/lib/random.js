import seedrandom from "seedrandom";
import chroma from "chroma-js";

export default class Random {
  constructor(seed) {
    this.rng = seedrandom(seed);
  }

  // Uniform distribution
  float() {
    return this.rng();
  }

  spread(amplitude = 1, initial = 0) {
    return initial + (amplitude / 2 - this.float() * amplitude);
  }

  between(min = 0, max = 1) {
    return this.float() * (min - max) + max;
  }

  betweenInt(min = 0, max = 1) {
    return Math.floor(this.between(min, max + 1));
  }

  // Generic helpers (uniform distribution)
  sign(value = 1) {
    return this.float() < 0.5 ? value : -value;
  }

  bool(percentage = 0.5) {
    return this.float() < percentage;
  }

  angle(max = 360) {
    return this.betweenInt(0, max);
  }

  oneIn(n) {
    return this.between(0, n) < 1;
  }

  color({ hue = this.angle(), sat = this.float(), lightness = this.float() } = {}) {
    return chroma.hsl(hue, sat, lightness);
  }

  from(...items) {
    return items[this.betweenInt(0, items.length - 1)];
  }

  fromList(items) {
    return this.from(...items);
  }

  // Triangular distribution
  triang() {
    return 1 - Math.sqrt(this.float());
  }

  spreadTriang(amplitude = 1, initial = 0) {
    return initial + (amplitude / 2 - this.triang() * amplitude);
  }

  betweenTriang(min = 0, max = 1) {
    return this.triang() * (min - max) + max;
  }

  betweenIntTriang(min = 0, max = 1) {
    return Math.floor(this.betweenTriang(min, max));
  }

  // Inversed triangular distribution
  triangInv() {
    return Math.sqrt(this.float());
  }

  spreadTriangInv(amplitude = 1, initial = 0) {
    return initial + (amplitude / 2 - this.triangInv() * amplitude);
  }

  betweenTriangInv(min = 0, max = 1) {
    return this.triangInv() * (min - max) + max;
  }

  betweenIntTriangInv(min = 0, max = 1) {
    return Math.floor(this.betweenTriangInv(min, max));
  }

  // Exponential distribution
  exp() {
    return this.float() ** 2;
  }

  spreadExp(amplitude = 1, initial = 0) {
    return initial + (amplitude / 2 - this.exp() * amplitude);
  }

  betweenExp(min = 0, max = 1) {
    return this.exp() * (min - max) + max;
  }

  betweenIntExp(min = 0, max = 1) {
    return Math.floor(this.betweenExp(min, max));
  }

  // Inversed exponential distribution
  expInv() {
    return 1 - this.float() ** 2;
  }

  spreadExpInv(amplitude = 1, initial = 0) {
    return initial + (amplitude / 2 - this.expInv() * amplitude);
  }

  betweenExpInv(min = 0, max = 1) {
    return this.expInv() * (min - max) + max;
  }

  betweenIntExpInv(min = 0, max = 1) {
    return Math.floor(this.betweenExpInv(min, max));
  }
}
