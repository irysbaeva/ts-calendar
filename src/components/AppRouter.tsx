import { Switch, Redirect, Route } from "react-router-dom";
import React, { FC } from "react";
import { privateRoutes, publicRoutes, RouteNames } from "../router";

import { useTypeSelector } from "../hooks/useTypesSelector";

const AppRouter: FC = () => {
  const { isAuth } = useTypeSelector((state) => state.auth);
  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to={RouteNames.EVENT} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
};
export default AppRouter;
