import React from 'react';
import Draggable from 'react-draggable';
import { Badge } from 'react-bootstrap';



const BadgeComponent = (props) => {
    console.log(props.badgeData[0].styleObj)
    const styleObj = {
        padding: '1em 0'
    }
    return (
        // <Draggable >
            <div style={styleObj}>
                <Badge style={props.badgeData[0].styleObj} variant={props.badgeData[0].defaultData.variant} onClick={(e) => props.handleBadgeClick(props.index)}>
                    {props.badgeData[0].defaultData.badgeText || 'Badge Text'}
                </Badge>
            </div>
        // </Draggable>
    )
}

export default BadgeComponent