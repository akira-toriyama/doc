// 純粋関数
// 下記は、純粋関数ではない
// - グローバル変数を参照している
// - 冪等性が無い 内部で状態を持っている
// - 値を返す以外の事を行っている console.log など

// ------------------------------------------------------
// 副作用の扱い

// 純粋関数のみでは、プログラムの結果を出力できない
const print1 = (p: string) => {
  // 副作用を持つ関数
  console.log(p);
};

// 関数を返す事で対応する
const print2 = (p: string) => {
  return () => console.log(p);
};

// ------------------------------------------------------
// 関数の合成
type Fn<P, R> = (p: P) => R;
const compose =
  <P, PnR, R>(f1: Fn<PnR, R>, f2: Fn<P, PnR>) =>
  (p: P) =>
    f1(f2(p));

const f1 = (p: number) => p * 2;
const f2 = (p: string) => p.length;

const doubleLength = compose(f1, f2);

const n = doubleLength("hello");
// ------------------------------------------------------
