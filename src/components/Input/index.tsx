// @flow
import React, {InputHTMLAttributes, ReactNode, useState} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import classnames from "classnames";
import Icon from "../Icon";
import {listProps} from "../../App";

type iconSize = 'lg' | 'sm'
type nodeType = string | ReactNode

interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean,
    size?: iconSize,
    icon?: IconProp,
    startNode?: nodeType,
    endNode?: nodeType,
    children?: ReactNode,
    searchData?: Array<listProps>
}

const Input: React.FC<InputProps> = (props: InputProps) => {
    const {
        disabled, size, icon
        , startNode, endNode, children, searchData, ...restProps
    } = props
    const [listStr, setListStr] = useState<Array<ReactNode>>()
    const renderHintList = (arr: Array<listProps>) => {
        console.log(arr)
        const a: ReactNode[] = []
        arr.forEach(item => {
            a.push(<li>{item.value}</li>)
        })
        setListStr([a])
    }
    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListStr([])
        if (searchData && e.target.value) {
            const val = e.target.value
            const newArr: Array<listProps> = []
            searchData.forEach(item => {
                item.value.includes(val) && newArr.push(item)
            })
            renderHintList(newArr)
        }
    }
    const inputClasses = classnames('viking-input', {
        'input-disabled': disabled,
        [`input-${size}`]: size,
        'is-icon': icon,
        'is-haveStart': startNode,
        'is-haveEnd': endNode
    })
    const iconClasses = classnames('input-icon', {[`icon-${size}`]: size, 'icon-disabled': disabled})
    const startNodeClasses = classnames('input-start', {[`start-${size}`]: size})
    const endNodeClasses = classnames('input-end', {[`end-${size}`]: size})
    return (
        <span className={'input-main'}>
           {startNode ? <span className={startNodeClasses}>{startNode}</span> : ''}
            <span className={'input-container'}>
                <input onInput={changeInput} className={inputClasses} disabled={disabled} {...restProps}>
            </input>
                {icon ? <Icon icon={icon} className={iconClasses}></Icon> : ''}
           </span>
            {endNode ? <span className={endNodeClasses}>{endNode}</span> : ''}
            <ul>
                {
                    listStr
                }
            </ul>
        </span>

    );
};
Input.defaultProps = {
    size: 'sm',
    disabled: false,
    placeholder: '请输入'
}
export default Input
