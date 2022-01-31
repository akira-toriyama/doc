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
// コンテナに入っていない値を、コンテナを持った値に適用する事ができる。
// []と[].mapをファンクタとして見る事ができる
// 対応するデータ型と関数の対応(map)
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

// ------------------------------------------------------
// 値を包むコンテナ
{
  /**
   * コンテナ
   */
  type Container<T> = {
    value: T;
  };

  /**
   * 値をコンテナに入れる
   */
  type Of = <T>(p: T) => Container<T>;
  const of: Of = (value) => ({ value });

  /**
   * コンテナの値に関数を適用する
   */
  type Map = <T, U>(f: (p: T) => U) => (fa: Container<T>) => Container<U>;
  const map: Map = (f) => (fa) => of(f(fa.value));

  const getLen = (s: string) => s.length;

  const wrappedStr = of("foo");
  const lenGetter = map(getLen);

  const len = lenGetter(wrappedStr);
}
// ------------------------------------------------------

// ------------------------------------------------------
// アプリカティブ
{
  // コンテナの中に入れた関数を、コンテナの中に入れた値を変換することができます。
  type Container<T> = {
    value: T;
  };

  type Of = <T>(value: T) => Container<T>;
  const of: Of = (value) => ({ value });

  type Map = <T, U>(f: (p: T) => U) => (fa: Container<T>) => Container<U>;
  const map: Map =
    (f) =>
    ({ value }) =>
      of(f(value));

  type Applicative = <T, U>(
    f: Container<(p: T) => U>
  ) => (fa: Container<T>) => Container<U>;

  const applicative: Applicative =
    ({ value: f }) =>
    ({ value }) =>
      of(f(value));

  const inc = (x: number) => x + 1;

  const wf = of(inc);
  const wv = of(3);
  const c = applicative(wf)(wv);
}
// ------------------------------------------------------
