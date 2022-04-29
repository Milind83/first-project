import React, { useState, useEffect, useContext } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";

import {
  Block,
  PaginationComponent,
  DataTable,
} from "../../components/Component";
//import { UserContext } from "./UserContext";
import { connect } from 'react-redux'
import { fetchUserRoles, searchUserRoles } from '../../redux/user/action';
import ListPageHead from "../../components/SharedComponents/ListPageHead";
import TableBody from "../../components/SharedComponents/TableBody";
import TableHead from "../../components/SharedComponents/TableHead";
import { useHistory } from "react-router-dom";

const AdminUsersList = ({roles, fetchUserRoles, searchUserRoles}) => {
  // const { contextData } = useContext(UserContext);
  // const [data, setData] = contextData;
  const [sm, updateSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [sort, setSortState] = useState("");
  const history = useHistory();

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);
  // Get current list, pagination
 

  const TableHeadreFeilds = [{
    roleAID: "ID",
    roleName: "ROLE NAME",
  }]

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = 1;
  //const currentItems = TableRows.slice(indexOfFirstItem, indexOfLastItem);
  // Change Page
 
  const list = () =>{
    fetchUserRoles(indexOfFirstItem,itemPerPage);
  }

  useEffect(()=>{
    list();
  },[]);

  useEffect(()=>{
    list();
  },[currentPage]); 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const editHandler = (editId) =>{
    alert("role"+editId);
    history.push(`/admin-user-role-edit/${editId}`);
  }

  const searchHandler = async(data) =>{
    await searchUserRoles(data, indexOfFirstItem, itemPerPage);
 }
  const seachFeild = {
    id: "",
    roleName: ""
  }
  const seachFeildType = {
    roleName: {
      tag: "input",
      type: "text"
    },
    id: {
      tag: "input",
      type: "number"
    },
  }

  const reloadHandler = (setState) =>{
    list();
    setState(seachFeild);
  }

  return (
    <React.Fragment>
      <Head title="User Role List"></Head>
      <Content>
      <ListPageHead sm={sm} pageTitle="User Role List" plusURL="/admin-user-role-add" />

        <Block>
          <DataTable className="card-stretch">
            <TableHead searchHandler={searchHandler} searchFieldData={seachFeild} seachFeildType={seachFeildType} />
            <TableBody data={roles} tableHeadreFeilds={TableHeadreFeilds}  editHandler={editHandler} reloadHandler = {reloadHandler} />
             <div className="card-inner">
              {roles && roles.data?.rows.length > 0  ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={roles.data?.count ? roles.data?.count : []}
                  paginate={paginate}
                  currentPage={currentPage}
                 
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
      
      </Content>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    roles: state.user.roles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserRoles: (indexOfFirstItem,itemPerPage) => dispatch(fetchUserRoles(indexOfFirstItem,itemPerPage)),
    searchUserRoles: (data, indexOfFirstItem,itemPerPage) => dispatch(searchUserRoles(data, indexOfFirstItem,itemPerPage))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminUsersList);
