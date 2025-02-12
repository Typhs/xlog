import { darkColors, lightColors } from "./colors";

let colors = lightColors;

export default function xlog(value: unknown, identifier = "") {
  const color = getSeededRandomItem(colors, identifier);

  try {
    if (typeof value == "object") {
      value = JSON.stringify(value, null, 4);
    }
  } catch (err) {}

  console.log("%c" + value, `color: ${color}`);
}

export function mountXlog() {
  const isDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkMode) {
    colors = darkColors;
  }
  return xlog;
}

function mulberry32(a: number) {
  // Mulberry32 - a fast and reliable 32-bit seeded random number generator
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getSeededRandomItem(array: unknown[], seed = "") {
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  };

  const random = mulberry32(hashString(seed));

  // Get a random index using the seeded generator
  const index = Math.floor(random() * array.length);
  return array[index];
}
