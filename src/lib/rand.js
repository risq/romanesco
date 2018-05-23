export function sign(value = 1) {
  return Math.random() < 0.5 ? value : -value;
}

export function bool(percentage = 0.5) {
  return Math.random() < percentage;
}

export function spread(value = 1) {
  return value / 2 - Math.random() * value;
}

export function between(min = 0, max = 1) {
  return Math.random() * (min - max) + max;
}

export function betweenInt(min = 0, max = 1) {
  return Math.floor(between(min, max));
}

export function angle(max = 360) {
  return Math.betweenInt(0, max);
}

export function oneIn(n) {
  return between(0, n) < 1;
}

export function triang() {
  return 1 - Math.sqrt(Math.random());
}

export function triangSpread(value = 1) {
  return value / 2 - triang() * value;
}

export function triangBetween(min = 0, max = 1) {
  return triang * (min - max) + max;
}

export function triangBetweenInt(min = 0, max = 1) {
  return Math.floor(triangBetween(min, max));
}

export function exp() {
  return Math.random() ** 2;
}

export function expSpread(value = 1) {
  return value / 2 - triang() * value;
}

export function expBetween(min = 0, max = 1) {
  return exp * (min - max) + max;
}

export function expBetweenInt(min = 0, max = 1) {
  return Math.floor(expBetween(min, max));
}
