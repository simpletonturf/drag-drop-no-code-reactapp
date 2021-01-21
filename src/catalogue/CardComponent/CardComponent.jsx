import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import "./CardComponent.scss"


const CardComponent = (props) => {
    const theme = useContext(ThemeContext)
    const styleObj = {
        padding: '1em 0'
    }
    const globalTheme={
        color:`${theme.theme.primaryColor}`
    }
    const cardBody = () => {
        return (
            <React.Fragment>
                <Card.Body>
                    <Card.Title>{props.cardData[0].defaultData.cardTitle || 'Card Title'}</Card.Title>
                    <Card.Subtitle className="mb-2">{props.cardData[0].defaultData.cardSubTitle || 'Card Subtitle'}</Card.Subtitle>
                    <Card.Text>{props.cardData[0].defaultData.cardText || 'Card Description'}
                    </Card.Text>
                </Card.Body>
            </React.Fragment>
        )
    }
    return (
        // <Draggable >
        <div style={styleObj}>
            <Card
                className="main-card-wrap width100"
                style={props.cardData[0].styleObj && globalTheme}
                onClick={(e) => props.handleCardClick(props.index)}
                border={props.cardData[0].defaultData.cardBorderColor || 'secondary'}>
                {props.cardData[0].defaultData.isCardImg &&
                    <Card.Img
                        variant="bottom"
                        src={props.cardData[0].defaultData.cardImgSrc} />
                }
                {props.cardData[0].defaultData.isImgOveralay === 'true' ?
                    (<Card.ImgOverlay>
                        {cardBody()}
                    </Card.ImgOverlay>) :
                    (<React.Fragment>
                        {cardBody()}
                    </React.Fragment>)
                }

            </Card>
        </div>
        // </Draggable>
    )
}

export default CardComponent