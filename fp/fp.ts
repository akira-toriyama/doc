// ------------------------------------------------------
// 純粋関数
{
  {
    // 純粋関数である
    // 同じ引数には、同じ結果を返す
    // 関数を直接の値に変えてもプログラムの動作が同じになる -> 参照透過性
    const fn = (p) => p + 1;
  }
  {
    // 純粋関数 ではない
    // グローバル変数を参照している為
    // 冪等性が無い 内部で状態を持っている
    let x: number;
    const fn = () => x + 1;
  }
  {
    // 純粋関数 ではない
    // 値を返す以外の事を行っている console.log など
    const fn = (p: number) => {
      console.log(p);
      return p + 1;
    };
  }
}
// ------------------------------------------------------
// 副作用の扱い
{
  {
    // 純粋関数のみでは、プログラムの結果を出力できない
    const print = (p: string) => {
      // 副作用を持つ関数
      console.log(p);
    };
  }

  {
    // 関数を返す事で対応する
    const print = (p: string) => {
      return () => console.log(p);
    };
  }
}
// ------------------------------------------------------
// 関数の合成
{
  type Fn<P, R> = (p: P) => R;
  const compose =
    <P, PnR, R>(f1: Fn<PnR, R>, f2: Fn<P, PnR>) =>
    (p: P) =>
      f1(f2(p));

  const double = (p: number) => p * 2;
  const getLength = (p: string) => p.length;

  const doubleLength = compose(double, getLength);

  const n = doubleLength("hello");
}
// ------------------------------------------------------
// functor 関手
// 下記を含めた一連のプログラミングパターンの事
// コンテナに入った値
// コンテナ内の値に関数を適用し、再度コンテナでラップするための関数 ([].map, Promise.then など
{
  type A1<T> = [T];
  type Fn<P, R> = (p: P) => R;

  type A1Map = <P, R>(a1: A1<P>, fn: Fn<P, R>) => [R];
  const a1Map: A1Map = (a1, fn) => [fn(a1[0])];

  // 関数の持ち上げ lifting
  // Arrayから中身を出して、関数を適用して、Arrayに戻す
  const a1Lift =
    <P, R>(fn: Fn<P, R>) =>
    (a1: [P]) =>
      a1Map(a1, fn);

  const getLen = a1Lift<string, number>((p) => p.length);
  getLen(["foo"]);
}
// ------------------------------------------------------
// 恒等関数
// 入力値をそのまま返す
const identify = <T>(p: T) => p;
// ------------------------------------------------------
