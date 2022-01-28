// Maybe モナド

// ---------------------------
// 型定義
// ---------------------------

/**
 * 値がある
 */
type Just<T> = {
  __type: "just";
  value: T;
};

/**
 * 値が無い
 */
type Nothing = {
  __type: "nothing";
};

/**
 * 値があるかわからない
 */
type Maybe<T> = Just<T> | Nothing;

/**
 * 値を包む
 */
type Of = <T>(value: T) => Just<T>;

/**
 * Nullableな値を包む
 */
type OfNullable = <T>(value: T | undefined | null) => Maybe<T>;

/**
 * 値を移す
 */
type MapMaybe = <T, U>(f: (a: T) => U) => (maybe: Maybe<T>) => Maybe<U>;

/**
 * 値を潰す
 */
type Flatten = <T>(maybe: Maybe<Maybe<T>>) => Maybe<T>;

/**
 * 値を移して潰す
 */
type FlatMap = <T, U>(f: (a: T) => Maybe<U>) => (maybe: Maybe<T>) => Maybe<U>;

/**
 * 値を取り出す。なければデフォルト値を取り出す。
 */
type GetOrElse = <T>(a: T) => (maybe: Maybe<T>) => T;

// ---------------------------
// 実装
// ---------------------------

const nothing: Nothing = { __type: "nothing" };
const isNothing = <T>(p: Just<T> | Nothing): p is Nothing =>
  p.__type === "nothing";

const of: Of = (value) => ({ __type: "just", value });

const ofNullable: OfNullable = (value) => {
  if (value === undefined) {
    return nothing;
  }
  if (value === null) {
    return nothing;
  }
  return of(value);
};

const map: MapMaybe = (f) => (m) => {
  if (isNothing(m)) {
    return m;
  }
  return of(f(m.value));
};

const flatten: Flatten = (mm) => {
  if (isNothing(mm)) {
    return nothing;
  }
  return mm.value;
};

const flatMap: FlatMap = (f) => (m) => {
  if (isNothing(m)) {
    return m;
  }
  return f(m.value);
};

const getOrElse: GetOrElse = (a) => (m) => {
  if (isNothing(m)) {
    return a;
  }
  return m.value;
};

// ---------------------------
// 利用
// ---------------------------

type Dictionary = Record<string, string>;

type AddItem = (k: string, v: string, d: Dictionary) => Dictionary;
const addItem: AddItem = (k, v, d) => ({ ...d, [k]: v });

type GetItem = (k: string, d: Dictionary) => Maybe<string>;
const getItem: GetItem = (k, d) => ofNullable(d[k]);

type GetChar = (n: number) => (s: string) => Maybe<string>;
const getChar: GetChar = (n) => (s) => ofNullable(s[n]);

const key1 = "001";
const myDictionary = addItem(key1, "apple", {});

// 不確実な値に対して関数を適用

// { "type": "just", "value": "a" }
const r1 = flatMap(getChar(0))(getItem(key1, myDictionary));
// a
const r2 = getOrElse("値が無し")(r1);

// { "type": "nothing" }
const r3 = flatMap(getChar(999))(getItem(key1, myDictionary));
// 値が無し
const r4 = getOrElse("値が無し")(r3);
