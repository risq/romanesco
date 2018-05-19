export function sign(value) {
  return Math.random() > 0.5 ? value : -value;
}

export function bool() {
  return Math.random() > 0.5;
}

export function between(min, max) {
  return Math.random() * (min - max) + max;
}

export function angle() {
  return Math.floor(between(0, 360));
}
