import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={withRouter(Checkout)} />
          <Route path="/orders" render={() => <Orders />} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Layout>{routes}</Layout>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token != null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(authCheckState()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
