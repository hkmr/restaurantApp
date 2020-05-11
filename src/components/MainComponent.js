import React, { Component } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Home from "./Home.js";
import Menu from "./Menu.js";
import DishDetail from "./DishDetail";
import Contact from "./Contact";
import About from "./About";
import { Switch, Route, Redirect } from "react-router-dom";
import { DISHES } from "../shared/dishes.js";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish: null
    };
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
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    const DishId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              dish => dish.id === parseInt(match.params.dishid, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishid, 10)
          )}
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
                dishes={this.state.dishes}
                onClick={dish => this.onDishSelect(dish)}
              />
            )}
          />
          <Route exact path="/contact" component={Contact} />
          <Route
            exact
            path="/about"
            component={() => <About leaders={this.state.leaders} />}
          />
          <Route path="/menu/:dishid" component={DishId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
