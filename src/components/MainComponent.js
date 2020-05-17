import React, { Component } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Home from "./Home.js";
import Menu from "./Menu.js";
import DishDetail from "./DishDetail";
import Contact from "./Contact";
import About from "./About";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "../redux/actions";
import { actions } from "react-redux-form";

const mapStoreToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, username, comment) =>
    dispatch(addComment(dishId, rating, username, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  onDishSelect(dish) {
    this.setState({
      selectedDish: dish
    });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.msg}
          promotion={this.props.promotions.filter(promo => promo.featured)[0]}
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    const DishId = ({ match }) => {
      // console.log("MainComponent: " + this.props.addComment);
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === parseInt(match.params.dishid, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.msg}
          comments={this.props.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishid, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => (
              <Menu
                dishes={this.props.dishes}
                onClick={dish => this.onDishSelect(dish)}
              />
            )}
          />
          <Route
            exact
            path="/contact"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          <Route
            exact
            path="/about"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route path="/menu/:dishid" component={DishId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStoreToProps,
    mapDispatchToProps
  )(Main)
);
