/* eslint-disable */
import { useCallback, useMemo, useState } from "react";

export interface UseArrayActions<T> {
  setValue: any;
  push: (value: T | T[]) => void;
  clear: () => void;
  removeById: (id: any, idLabel?: string) => void;
  removeIndex: (index: any) => void;
  value: T[];
  findByStringId: (index: string, idLabel?: string) => T;
  editById: (id: string, entity: T, idLabel?: string) => void;
  length: number;
}

export function useArray<T>(initialValue: T[]): UseArrayActions<T> {
  const [value, setValue] = useState<T[]>(initialValue);
  const length = value?.length;
  const push = useCallback(
    (a: any) => setValue((v) => [...v, ...(Array.isArray(a) ? a : [a])]),
    []
  );
  const clear = useCallback(() => setValue(() => []), []);
  const removeIndex = useCallback(
    (index: any) =>
      setValue((v) => {
        const copy = v.slice();
        copy.splice(index, 1);
        return copy;
      }),
    []
  );

  const removeById = useCallback(
    (id: any, idLabel: string = "id") =>
      setValue((arr) =>
        arr.filter((v: T) => {
          //@ts-ignore
          if (v && v[idLabel]) return v[idLabel] !== id;
          return true;
        })
      ),
    []
  );

  const editById = (id: string, entity: T, idLabel: string = "id") => {
    //@ts-ignore
    const foundIndex = value.findIndex((element: T) => element[idLabel] === id);
    value[foundIndex] = entity;
    setValue([...value]);
  };

  const findByStringId = (id: string, idLabel: string = "id") => {
    //@ts-ignore
    return value.find((v: T) => v[idLabel] === id);
  };

  const actions = useMemo(
    () => ({
      setValue,
      push,
      clear,
      removeById,
      removeIndex,
    }),
    [push, clear, removeById, removeIndex]
  );
  //@ts-ignore
  return { value, findByStringId, editById, length, ...actions };
}
