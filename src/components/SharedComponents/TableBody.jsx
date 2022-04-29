import React from "react";
import {
    Icon,
    UserAvatar,
    DataTableBody,
    DataTableHead,
    DataTableRow,
    DataTableItem,
    TooltipComponent,
  } from "../../components/Component";
  import {
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
  } from "reactstrap";
  import { Link } from "react-router-dom";
  import { findUpper } from "../../utils/Utils";


const TableBody = ({data, tableHeadreFeilds, editHandler}) =>{
const onEditClick = (userId) =>{
     editHandler(userId);
}

const keys = Object.keys(tableHeadreFeilds[0]);
const values = Object.values(tableHeadreFeilds[0]);

    return(
        <DataTableBody compact>
        <DataTableHead>
          {
            values.length > 0 && values.map((item)=>{
                 return(
                  <DataTableRow key={item}>
                  <span className="sub-text">{item}</span>
                  </DataTableRow>
                 );
            })
          }
           <DataTableRow>
                  <span className="sub-text">ACTION</span>
            </DataTableRow>
         
        </DataTableHead>
        {/*Head*/}
        {data?.data?.rows.length > 0
          ? data?.data?.rows.map((item, i) => {
              return (
                <DataTableItem key={item.id+""+i}>
                {
                  keys.map((k, i)=>{
                       return (
                        <DataTableRow size="md" key={i+""+item.id}>
                          <span>{item[k]}</span>
                        </DataTableRow>
                       ) 
                  })
                }

               {
                  values.map((v, i)=>{
                   
                    if(v === "ID"){
                      return(
                        <DataTableRow className="nk-tb-col-tools" key={i}>
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onEditClick(item[keys[i]])}>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Edit</span>
                                    </DropdownItem>
                                  </li>
                                  
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                      )
                    }
                   
               })
               }

                  {/* <DataTableRow>
                    <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item.id}`}>
                      <div className="user-card">
                        <UserAvatar
                          theme={item.avatarBg}
                          className="xs"
                          text={findUpper(item.name)}
                          image={item.image}
                        ></UserAvatar>
                        <div className="user-name">
                          <span className="tb-lead">{item.name}</span>
                        </div>
                      </div>
                    </Link>
                  </DataTableRow> */}
                       
                 
                </DataTableItem>
              );
            })
          : null}
      </DataTableBody>
    
    );
}


export default TableBody;