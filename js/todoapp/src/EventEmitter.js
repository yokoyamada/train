export class EventEmitter {
  constructor() {
    // 登録する[イベント名,Set(リスナー関数)]を管理するMap
    this._listeners = new Map();
  }

  /**
   * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  addEventListener(type, listener) {
    // 指定したイベントに対応するSetを作成しリスナー関数を登録する
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    // listenerSet を更新すると __listeners.get(type) の内容も更新される(参照型？)
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listener);
  }

  /**
   * 指定したイベントをディスパッチする
   * @param {string} type イベント名
   */
  emit(type) {
    // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      // this: listener関数の中でthisとして使用されるもの
      // この例では、TodoListModelだった。
      listener.call(this);
    });
  }

  /**
   * 指定したイベントのイベントリスナーを解除する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventListener(type, listener) {
    // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
