import React from "react";
import { FormGroup } from "reactstrap";
import PropTypes from 'prop-types';
import { Button } from "../../components/Component";


const FormButton = ({size, color, type, text}) =>{
    return(
        <FormGroup>
            <Button type={type} color={color} size={size} >
           {text}
            </Button>
        </FormGroup>
    );
}

FormButton.defaultProps = {
    type: "submit",
    color:"primary",
    size: "lg"
}

FormButton.propTypes = {
    color: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string.isRequired
}

export default FormButton;