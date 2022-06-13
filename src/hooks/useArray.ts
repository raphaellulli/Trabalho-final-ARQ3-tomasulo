/* eslint-disable */
import { useCallback, useMemo, useState } from 'react';

export interface UseArrayActions<T> {
    setValue: any,
    value: T[],
    length: number,
    push: (value: T | T[]) => void,
    clear: () => void,
    removeIndex: (index: any) => void,
    removeById: (id: any, idLabel?: string) => void,
    editById: (id: string, entity: T, idLabel?: string) => void,
    findByStringId: (index: string, idLabel?: string) => T,
}

export function useArray<T>(initialValue: T[]): UseArrayActions<T> {

    const [value, setValue] = useState<T[]>(initialValue);
    const [selected, setSelected] = useState<T | null>(null);
    const length = value?.length;
    const push = useCallback((a:any) => setValue(v => [...v, ...(Array.isArray(a) ? a : [a])]), []);
    const unshift = useCallback((a:any) => setValue(v => [...(Array.isArray(a) ? a : [a]), ...v]), []);
    const clear = useCallback(() => setValue(() => []), []);
    const removeIndex = useCallback((index:any) => setValue(v => {
        const copy = v.slice();
        copy.splice(index, 1);
        return copy;
    }), []);

    const removeById = useCallback(
        (id: any, idLabel: string = 'id') =>
            setValue(arr =>
                arr.filter((v: T) => {
                    //@ts-ignore
                    if (v && v[idLabel]) return (v[idLabel] !== id)
                    console.error(`Bad Hook (useArray) implementaion ->->${idLabel}<-<- do not exist on the object type`);
                    return true
                })
            )
        , []);

    const simpleRemoveById = useCallback(
        (id: any) =>
            setValue(arr =>
                arr.filter((v: T) => {
                    //@ts-ignore
                    if (v) return (v !== id)
                    return true
                })
            )
        , []);

    const editById = (id: string, entity: T, idLabel: string = 'id') => {
        //@ts-ignore
        const foundIndex = value.findIndex((element: T) => element[idLabel] === id)
        value[foundIndex] = entity
        setValue([...value])
    }

    const selectById = (id: number|string, idLabel: string = 'id') => {
        setSelected(
            //@ts-ignore
            value.find((v: T) => {
                //@ts-ignore

                if (v && (v[idLabel] || v[idLabel] === 0)) return (v[idLabel] === id)
                console.error(`Bad Hook (useArray) implementaion ->->${idLabel}<-<- do not exist on the object type`);
            })
        )

    }

    const findById = (id: number, idLabel: string = 'id') => {
        //@ts-ignore
        return value.find((v: T) => v[idLabel] === id)
    }

    const clearSelected = () => {
        setSelected(null);
    }

    const findByStringId = (id: string, idLabel: string = 'id') => {
        //@ts-ignore
        return value.find((v: T) => v[idLabel] === id)
    }

    const simpleFind = (id: any) => {
        //@ts-ignore
        return value.find((v: T) => v === id)
    }

    const removeSelected = useCallback(() => setTimeout(() => setSelected(null), 200), []);

    const actions = useMemo(() => ({
        setValue,
        unshift,
        push,
        clear,
        removeById,
        simpleRemoveById,
        removeIndex,
        removeSelected
    }), [push, unshift, clear, removeById, removeSelected, removeIndex]);
    //@ts-ignore
    return { value, selected, selectById, findById, findByStringId, simpleFind, simpleRemoveById, editById, clearSelected, setSelected, length, ...actions }
}