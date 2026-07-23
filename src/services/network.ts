export function simulateNetwork<T>(value: T, ms = 450): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
