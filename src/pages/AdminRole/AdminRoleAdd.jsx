import React, { useState, useEffect } from "react";
import {
  Block,
  BlockDes,
  PreviewCard,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import AddForm from  "./AddForm";
import {useParams,
} from "react-router-dom";
import { connect } from 'react-redux'
import { getUserRoleById } from '../../redux/user/action';


const FormValidation = ({getUserRoleById, roleData}) => {
  const { roleId } = useParams();
  const [isEdit, setIsEdit] = useState(typeof roleId !== 'undefined' ? true : false);
  
  useEffect(async()=>{
    if(typeof roleId !== 'undefined'){
      await getUserRoleById(roleId);
    }
  },[isEdit]);
  return (
    <React.Fragment>
      <Head title="Form Validation"></Head>
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>

              <BlockTitle tag="h5"> {
                  isEdit ? "Edit Admin User Role" : "Add Admin User Role"
                }</BlockTitle>
              <BlockDes>
               
                <p>FIELD WITH (<span style={{color: "#f3245f"}}>*</span>) ARE MANDATORY </p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <AddForm id="form-2" alter  isEdit={isEdit} roleId={roleId} roleData={roleData} />
          
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    roleData: state.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserRoleById: (id) => dispatch(getUserRoleById(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormValidation);
