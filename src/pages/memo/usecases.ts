import { makeDefaultMemo } from "../../domains/memo";
import type { Memo } from "../../domains/memo";
import { dummyData } from "./make-dummy-data";
import { update } from "./store";

export const fetchMemos = async (): Promise<void> => {
  const data: Memo[] = await new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 0);
  });

  update((state) => ({
    ...state,
    memos: data,
  }));
};

export const editTitle = (edited: string): void => {
  update((state) => {
    if (state.current === null) {
      throw new Error("Illegal call: state.current is null.");
    }

    const current = {
      ...state.current,
      title: edited,
    };
    return {
      ...state,
      current,
      memos: state.memos.map((v) => (v.id === current.id ? current : v)),
    };
  });
};

export const editContent = (edited: string): void => {
  update((state) => {
    if (state.current === null) {
      throw new Error("Illegal call: state.current is null.");
    }

    const current = {
      ...state.current,
      content: edited,
    };
    return {
      ...state,
      current,
      memos: state.memos.map((v) => (v.id === current.id ? current : v)),
    };
  });
};

export const switchMemo = (memo: Memo): void => {
  update((state) => ({
    ...state,
    current: memo,
  }));
};

export const searchByKeyword = (keyword: string): void => {
  update((state) => ({
    ...state,
    keyword,
  }));
};

export const deleteMemo = (memo: Memo): void => {
  update((state) => ({
    ...state,
    current: null,
    memos: state.memos.filter((v) => v.id !== memo.id),
  }));
};

export const createMemo = (): void => {
  const newMemo = makeDefaultMemo();
  update((state) => ({
    ...state,
    current: newMemo,
    memos: [newMemo, ...state.memos],
  }));
};
