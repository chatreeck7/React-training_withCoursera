import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardTitle, CardBody} from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    onDishSelect (dish) {
        this.setState({selectedDish: dish});
    };

    render() {
        const menu = this.props.dishes.map((dish) =>{
            return (
                // Key is required because react need key to map or be given to elements inside the arrray
                // - help identify which items have changed, are added or removed
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    { menu }
                </div>
                <DishDetail selectedDish={this.state.selectedDish}/>
            </div>
        );
    }
}

export default Menu;