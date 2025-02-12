import { mountXlog } from "./src/xlog";
const oldLog = console.log;

type StringUnion<T extends string> = T | string;
type Colors = "green" | "blue" | "gold";
type ConsolableColor = StringUnion<Colors>;

declare global {
  interface Console {
    productionLog: Function;
  }
  function xlog(value: any, color?: ConsolableColor): void;
}

export default function initXlog() {
  mountXlog()
}

if (process.env.NODE_ENV != "development") {
  console.log = () => {}; //remove regular console.log if zin production
}
