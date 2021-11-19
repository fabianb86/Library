import React from "react";
import { Route, Redirect } from "react-router";
import { getSesion } from "../helper/helper";

const checkAuth = () => {
  return !getSesion() ? false : true;
};

export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Auth: false };
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.setState({
      auth: checkAuth() && !this.state.auth,
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          this.state.auth ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: this.props.location } }}
            />
          )
        }
      />
    );
  }
}