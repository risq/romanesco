import chroma from "chroma-js";

// Uniform distribution
export function float() {
  return Math.random();
}

export function spread(amplitude = 1, initial = 0) {
  return initial + (amplitude / 2 - float() * amplitude);
}

export function between(min = 0, max = 1) {
  return float() * (min - max) + max;
}

export function betweenInt(min = 0, max = 1) {
  return Math.floor(between(min, max + 1));
}

// Generic helpers (uniform distribution)
export function sign(value = 1) {
  return float() < 0.5 ? value : -value;
}

export function bool(percentage = 0.5) {
  return float() < percentage;
}

export function angle(max = 360) {
  return betweenInt(0, max);
}

export function oneIn(n) {
  return between(0, n) < 1;
}

export function color({ hue = angle(), sat = float(), lightness = float() }) {
  return chroma.hsl(hue, sat, lightness);
}

export function from(...items) {
  return items[betweenInt(0, items.length - 1)];
}

export function fromList(items) {
  return from(...items);
}

// Triangular distribution
export function triang() {
  return 1 - Math.sqrt(float());
}

export function spreadTriang(amplitude = 1, initial = 0) {
  return initial + (amplitude / 2 - triang() * amplitude);
}

export function betweenTriang(min = 0, max = 1) {
  return triang * (min - max) + max;
}

export function betweenIntTriang(min = 0, max = 1) {
  return Math.floor(betweenTriang(min, max));
}

// Inversed triangular distribution
export function triangInv() {
  return Math.sqrt(float());
}

export function spreadTriangInv(amplitude = 1, initial = 0) {
  return initial + (amplitude / 2 - triangInv() * amplitude);
}

export function betweenTriangInv(min = 0, max = 1) {
  return triangInv * (min - max) + max;
}

export function betweenIntTriangInv(min = 0, max = 1) {
  return Math.floor(betweenTriangInv(min, max));
}

// Exponential distribution
export function exp() {
  return float() ** 2;
}

export function spreadExp(amplitude = 1, initial = 0) {
  return initial + (amplitude / 2 - exp() * amplitude);
}

export function betweenExp(min = 0, max = 1) {
  return exp * (min - max) + max;
}

export function betweenIntExp(min = 0, max = 1) {
  return Math.floor(betweenExp(min, max));
}

// Inversed exponential distribution
export function expInv() {
  return 1 - float() ** 2;
}

export function spreadExpInv(amplitude = 1, initial = 0) {
  return initial + (amplitude / 2 - expInv() * amplitude);
}

export function betweenExpInv(min = 0, max = 1) {
  return expInv * (min - max) + max;
}

export function betweenIntExpInv(min = 0, max = 1) {
  return Math.floor(betweenExpInv(min, max));
}
