const asyncFn1 = () => Promise.resolve();
const asyncFn2 = () => Promise.resolve();
const asyncFn3 = () => Promise.resolve();
const asyncFn4 = () => Promise.resolve();
const asyncFn5 = () => Promise.resolve();

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
