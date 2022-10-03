import React, { FunctionComponent } from 'react'
import IconButton from '@mui/material/IconButton'
import { TToolbarComponentProps, TToolbarButtonSize } from './Toolbar'
import Tooltip from '@mui/material/Tooltip'

interface IToolbarButtonProps {
    id?: string
    editorId?: string
    label: string
    style: string
    type: string
    active?: boolean
    icon?: JSX.Element
    onClick?: any
    inlineMode?: boolean
    disabled?: boolean
    size?: TToolbarButtonSize
    component?: FunctionComponent<TToolbarComponentProps>
    tooltip?: string;
}

const ToolbarButton: FunctionComponent<IToolbarButtonProps> = (props) => {
    const size = !props.inlineMode ? (props.size || "medium") : "small"
    const toolbarId = props.inlineMode ? "-toolbar" : ""
    const editorId = props.editorId || "mui-rte"
    const elemId = editorId + "-" + (props.id || props.label) + "-button" + toolbarId
    const sharedProps = {
        id: elemId,
        onMouseDown: (e: React.MouseEvent) => {
            e.preventDefault()
            if (props.onClick) {
                props.onClick(props.style, props.type, elemId, props.inlineMode)
            }
        },
        disabled: props.disabled || false
    }
    if (props.icon) {
        const iconButton = (
            <IconButton
                {...sharedProps}
                aria-label={props.label}
                color={props.active ? "primary" : "default"}
                size={size}
            >
                {props.icon}
            </IconButton>
        );

        if (props.tooltip) {
            return <Tooltip title={props.tooltip}>{iconButton}</Tooltip>
        }

        return iconButton;
    }
    if (props.component) {
        return (
            <props.component
                {...sharedProps}
                active={props.active || false}
            />
        )
    }
    return null
}

export default ToolbarButton
