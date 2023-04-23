import React from "react";
import classnames from 'classnames'
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";

export interface IconProps extends FontAwesomeIconProps {
    theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
}

const Icon: React.FC<IconProps> = (props) => {
    const {className, theme, ...restProps} = props
    const classes = classnames('viking-icon', className, {[`icon-${theme}`]: theme})
    return (
        <FontAwesomeIcon {...restProps} className={classes}></FontAwesomeIcon>
    )
}
export default Icon
