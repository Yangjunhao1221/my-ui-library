// @flow
import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import Input, {InputProps} from "../Input";
import classnames from "classnames";
import useDebounce from "../../hooks/useDebounce";
//满足需求
// 1.用户可传入查询函数支持异步
// 2.可传入onSelect获取当前搜索后点击筛选菜单中的值
// 3.点击筛选菜单中的值同步到input输入框中，并且关闭菜单，点击除组件外的地方也会关闭菜单
// 4.可筛选不同类型的数据结构
// 5.异步在支持防抖
// 6.支持自定义模板
interface requiredProps {
    value: string
}

type inputFnType = (e: ChangeEvent<HTMLInputElement>) => void
export  type autoCompleteDataType<T = {}> = T & requiredProps

export interface autoCompleteProps extends Omit<InputProps, 'onsSelcte'> {
    searchFn: (str: string) => autoCompleteDataType[] | Promise<autoCompleteDataType[]>,
    Selcte?: (str: autoCompleteDataType) => void,
    customTemplete?: (item: autoCompleteDataType) => ReactElement//自定义模板
}

const AutoComplete: React.FC<autoCompleteProps> = (props) => {
    const {searchFn, Selcte, value, customTemplete, ...restProps} = props
    const [inputValue, setInputValue] = useState(value as string)
    const [list, setList] = useState<autoCompleteDataType[]>([])
    const debounceVal = useDebounce(inputValue, 3000)
    const filterList = (data: autoCompleteDataType[]) => {
        if (data && data.length) {
            setList(data)
        }
    }
    const listClick = (item: autoCompleteDataType) => {
        if (Selcte) {
            Selcte(item)
        }
        setInputValue(item.value)
        setList([])
    }
    const renderList = () => {
        const classes = classnames('li-style')
        return (
            list.map((item, index) => {
                return <li className={classes} key={index}
                           onClick={() => listClick(item)}>{customTemplete ? customTemplete(item) : item.value}</li>
            })
        )
    }
    useEffect(() => {
        if (debounceVal) {
            const res = searchFn(debounceVal as string)
            if (res instanceof Promise) {
                res.then(res => {
                    filterList(res)
                })
            } else {
                filterList(res)
            }
        } else {
            setInputValue('')
            setList([])
        }
    }, [debounceVal])
    const inputChangeHandle: inputFnType = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim()
        setInputValue(val)
    }
    return (
        <div>
            <Input {...restProps} value={inputValue} onChange={inputChangeHandle}></Input>
            <ul>
                {
                    list.length > 0 && renderList()
                }
            </ul>
        </div>
    );
};
AutoComplete.defaultProps = {
    value: ''
}
export default AutoComplete
