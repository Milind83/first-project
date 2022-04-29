import React, {useEffect} from "react";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import FormInput from "../../components/FormElements/FormInput";
import FormButton from '../../components/FormElements/FormButton';
import { connect } from "react-redux";
import { addUserRole, editUserRole } from '../../redux/user/action'
import LoadingSpinner from "../../components/Loader/Loader";
import AlertMessage from "../../components/SharedComponents/AlertMessage";
import { useHistory } from "react-router-dom";

const AddForm = ({ alter, id, addUserRole,editUserRole,  errorMsg, loading,  responseData, isEdit,roleId,roleData, props}) => {

  const history = useHistory();
  const { errors, register, handleSubmit, setValue, reset} = useForm();
  
  const onFormSubmit = async(data) => {
    const requestData = {
      roleName: data.role,
   }
   if(isEdit){
   await editUserRole(roleId, requestData);
   }else{
    await addUserRole(requestData);z
   }
  };

  useEffect(() => {
    if(responseData?.error === false){
      reset();
      history.push("/admin-user-role-list");
    }
  }, [responseData?.error])


  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  return (
    <React.Fragment>
     { loading &&   <LoadingSpinner />}
           {errorMsg && (
             <AlertMessage isError={true} message={errorMsg} />
            )}

          {responseData?.message && (
             <AlertMessage isError={false} message={responseData?.message} />
              
            )}
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
              <FormInput
                name="role"
                label="Enter Role"
                placeholder="Enter Rile"
                errors={errors.role}
                refValue={register({ required: true })}
                defaultValue={isEdit ? roleData?.results?.data[0]?.roleName : ""}
               />
          </Col>
          <Col md="12">
            <FormButton text="Save" />
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    responseData: state.user.addResponse,
    loading: state.user.loading,
    errorMsg: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    addUserRole: (data) => dispatch(addUserRole(data)),
    editUserRole: (id, data) => dispatch(editUserRole(id, data))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddForm);
