// @flow
import React, {InputHTMLAttributes, ReactNode} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import classnames from "classnames";
import Icon from "../Icon";


type iconSize = 'lg' | 'sm'
type nodeType = string | ReactNode

export  interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean,
    size?: iconSize,
    icon?: IconProp,
    startNode?: nodeType,
    endNode?: nodeType,
    children?: ReactNode
}

const Input: React.FC<InputProps> = (props: InputProps) => {
    const {
        disabled, size, icon
        , startNode, endNode, children, ...restProps
    } = props

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
                <input className={inputClasses} disabled={disabled} {...restProps}>
            </input>
                {icon ? <Icon icon={icon} className={iconClasses}></Icon> : ''}
           </span>
            {endNode ? <span className={endNodeClasses}>{endNode}</span> : ''}
        </span>

    );
};
Input.defaultProps = {
    size: 'sm',
    disabled: false,
    placeholder: '请输入'
}
export default Input
