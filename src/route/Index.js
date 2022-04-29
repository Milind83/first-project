import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";
import { UserContextProvider } from "../pages/Admin/UserContext";
import AdminUsersList from "../pages/Admin/AdminUsersList";
import AdminUsersAdd from "../pages/Admin/AdminUserAdd";
import AdminUsersRoleList from "../pages/AdminRole/AdminUserRoleList";
import Homepage from "../pages/Homepage";
import AdminRoleAdd from "../pages/AdminRole/AdminRoleAdd";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/admin-user-list`}
          component={AdminUsersList}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin-user-add`} component={AdminUsersAdd}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin-user-edit/:userId`} component={AdminUsersAdd}></Route>

        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/admin-user-role-list`}
          render={() => (
            <UserContextProvider>
              <AdminUsersRoleList />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin-user-role-add`} component={AdminRoleAdd}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin-user-role-edit/:roleId`} component={AdminRoleAdd}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
