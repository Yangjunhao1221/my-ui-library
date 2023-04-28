// @flow
import React, {ChangeEvent, useState} from 'react';
import Input, {InputProps} from "../Input";
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

export  type autoCompleteDataType<T = {}> = T & requiredProps

export interface autoCompleteProps extends Omit<InputProps, 'onsSelcte'> {
    searchFn: (str: string) => autoCompleteDataType[],
    Selcte?: (str: autoCompleteDataType[]) => void,
    customTemplete?: () => {}//自定义模板
}

const AutoComplete: React.FC<autoCompleteProps> = (props) => {
    const {searchFn, Selcte, value, ...restProps} = props
    const [inputValue, setInputValue] = useState(value)
    const [list, setList] = useState<autoCompleteDataType[]>([])
    const filterList = (data: autoCompleteDataType[]) => {
        if (data.length) {
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
        return (
            list.map((item, index) => {
                return <li key={index} onClick={() => listClick(item)}>{item.value}</li>
            })
        )
    }
    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim()
        if (val) {
            setInputValue(val)
            filterList(searchFn(val))
        } else {
            setInputValue('')
            setList([])
        }
    }
    return (
        <div>
            <Input {...restProps} value={inputValue} onChange={inputChangeHandle}></Input>
            <ul>
                {
                    list.length ? renderList() : ''
                }
            </ul>
        </div>
    );
};
export default AutoComplete
