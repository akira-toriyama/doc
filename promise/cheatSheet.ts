const asyncFn1 = () => Promise.resolve("asyncFn1");
const asyncFn2 = () => Promise.resolve("asyncFn2");
const asyncFn3 = () => Promise.resolve("asyncFn3");
const asyncFn4 = () => Promise.resolve("asyncFn4");
const asyncFn5 = () => Promise.resolve("asyncFn5");
const asyncFnX = () => Promise.reject(new Error("x"));

/**
 * 一貫性のあるchain
 */
const m1 = () => {
  // asyncFn1().then(asyncFn2).then(asyncFn3).then(asyncFn4).then(asyncFn5);

  // 上記と同じ書き方だが、一貫性がある
  Promise.resolve()
    .then(asyncFn1)
    .then(asyncFn2)
    .then(asyncFn3)
    .then(asyncFn4)
    .then(asyncFn5);

  // 将来的に導入されるかも
  // Promise.try
};

/**
 * Promise.rejectの書き方
 */
const m2 = () => {
  Promise.reject(new Error("error"));
};

/**
 * catchに流す方法
 */
const m3 = () => {
  Promise.resolve()
    .then(() => {
      // 下記のどちらかの方法でcatchに流れる
      // throw new Error("error");
      // return Promise.reject(new Error("error"));
    })
    .catch((e) => {
      console.log(e);
    });
};

/**
 * Promise.all
 *
 * 1つでもエラーならば、catchへ
 * 他の結果を利用して、使用したいに使用する。
 *
 * 下記例だと、asyncFnXがあるのでcatchへ
 */
const m4 = () => {
  Promise.all([asyncFn1(), asyncFn2(), asyncFnX()])
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
};

/**
 * Promise.allSettled
 *
 * かならず、thenへ
 * 他の結果を使用せず、楽観的な実行
 *
 * 下記例だと、asyncFnXがあるがthenへ流れる
 */
const m5 = () => {
  Promise.allSettled([asyncFn1(), asyncFn2(), asyncFnX()]).then((r) => {
    console.log(r);
  });
};

/**
 * Promise.any
 *
 * どれか1つでも成功した場合は、thenへ
 * すべて失敗した場合は、集約されたエラーが catchへ
 */
const m6 = () => {
  Promise.any([asyncFn1(), asyncFn2(), asyncFnX()])
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
};
