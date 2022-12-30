import React, { Component } from 'react';
import  Menu  from './MenuComponent'
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'
import { Switch, Redirect, Route } from 'react-router-dom';
// Add a Container Component
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      selectedDish: null
    };
  }

  onDishSelect (dishId) {
    this.setState({selectedDish: dishId});
   };

  render(){
    const HomePage = () => {
        return (
            <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    const DishWithId = ({match}) => {
        return (
            <DishDetail 
              selectedDish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              selectedComments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            />
        );
    }
    
    return (
        //Configuring the Router
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="/home" /> {/* Redirect to home if path is not in configuration router */}
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default Main;
