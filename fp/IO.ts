{
  // 型
  type IO<T> = () => T;
  type Of = <T>(v: T) => IO<T>;
  type Map = <T, U>(f: (v: T) => U) => (fa: IO<T>) => IO<U>;
  type Flatten = <T>(mm: IO<IO<T>>) => IO<T>;
  type FlatMap = <T, U>(f: (v: T) => IO<U>) => (fa: IO<T>) => IO<U>;

  // 実装
  const of: Of = (v) => () => v;
  const map: Map = (f) => (fa) => of(f(fa()));
  const flatten: Flatten = (mm) => mm();
  const flatMap: FlatMap = (f) => (fa) => f(fa());
}
