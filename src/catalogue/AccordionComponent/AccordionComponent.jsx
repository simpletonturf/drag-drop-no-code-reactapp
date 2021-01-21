import React, { useContext } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';



const AccordionComponent = (props) => {
    const theme = useContext(ThemeContext)
    const styleObj = {
        padding: '1em 0'
    }
    const globalTheme = {
        color:`${theme.theme.primaryColor}`,
        background:`${theme.theme.secColor}`
    }
    return (
            <div style={styleObj && globalTheme}>
                <Accordion  onClick={(e) => props.handleAccordionClick(props.index)} className="width100">
                    <Card style={props.accordData[0].styleObj}>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            {props.accordData[0].defaultData.AccordionTitle}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            {props.accordData[0].defaultData.AccordionBody}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                    </Card>
                </Accordion>
            </div>
    )
}

export default AccordionComponent