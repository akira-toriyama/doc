/**
 * @see https://note.com/taka44/n/n07e39c66df6a
 */
const uIState = {
  /**
   * 何も登録されていない状態
   */
  blank: "blank",
  /**
   * ロードしている状態
   */
  loading: "loading",
  /**
   * 不完全な状態
   */
  partial: "partial",
  /**
   * エラーが起きている
   */
  error: "error",
  /**
   * 理想的な状態
   */
  ideal: "ideal",
} as const;

type Props =
  | {
      uIState:
        | typeof uIState.blank
        | typeof uIState.error
        | typeof uIState.loading;
      data: null;
    }
  | {
      uIState: typeof uIState.ideal | typeof uIState.partial;
      data: {
        value: string;
      };
    };

type APIRes = null | { error: boolean; data: Array<string> };
type Fn = (res: APIRes) => Props;
/**
 * TSの型を考慮するとUIの状態は、`boolean`より文字列が良い。
 */
export const fn: Fn = (res) => {
  if (res == null) {
    return {
      uIState: uIState.loading,
      data: null,
    };
  }

  if (res.error) {
    return {
      uIState: uIState.error,
      data: null,
    };
  }

  if (res.data.length === 0) {
    return {
      uIState: uIState.blank,
      data: null,
    };
  }

  if (res.data.length < 5) {
    return {
      uIState: uIState.partial,
      data: {
        value: "",
      },
    };
  }

  return {
    uIState: uIState.ideal,
    data: {
      value: "",
    },
  };
};
