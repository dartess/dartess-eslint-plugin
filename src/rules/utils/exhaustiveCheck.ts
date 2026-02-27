export function exhaustiveCheck(param: never): never {
  const paramAsString = (() => {
    try {
      return JSON.stringify(param);
    } catch {
      return String(param);
    }
  })();
  throw new Error(`unknown param: ${paramAsString}`);
}
