import React, { Component } from 'react';
import  Menu  from './MenuComponent'
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
// Add a Container Component
class Main extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    const HomePage = () => {
        return (
            <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    const DishWithId = ({match}) => {
        return (
            <DishDetail 
              selectedDish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              selectedComments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            />
        );
    }

    return (
        //Configuring the Router
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/contactus" component={Contact}/>
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
                <Redirect to="/home" /> {/* Redirect to home if path is not in configuration router */}
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
