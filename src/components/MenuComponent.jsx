import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
// Turn Menu Component into a Presentational Component
class Menu extends Component {

    // Use less constructor warning
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const menu = this.props.dishes.map((dish) =>{
            return (
                // Key is required because react need key to map or be given to elements inside the arrray
                // - help identify which items have changed, are added or removed
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
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
            </div>
        );
    }
}

export default Menu;