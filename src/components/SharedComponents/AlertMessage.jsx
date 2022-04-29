import {  Alert } from "reactstrap";
import { Icon } from "../../components/Component";

const AlertMessage = ({isError, message}) =>{
   return(
        <div className="mb-3">
        <Alert color={`${isError ? 'danger' : 'success'}`} className="alert-icon">
            {" "}
            <Icon name="alert-circle" /> {message}{" "}
        </Alert>
        </div>
   );   
}

export default AlertMessage