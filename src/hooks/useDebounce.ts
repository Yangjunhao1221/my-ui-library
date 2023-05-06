import {useEffect, useState} from "react";
//该hook用法
// 1.将需要防抖的值传入第一个参数，第二个参数为防抖时间，默认300ms
// 2.返回值为防抖后的新值
const UseDebounce = (val: string, time: number = 300) => {
    const [debounceVal, setDebounceVal] = useState(val)
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebounceVal(val)
        }, time)
        return () => {
            clearTimeout(timer)
        }
    }, [val, time])
    return debounceVal
}
export default UseDebounce
