import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
// Turn Menu Component into a Presentational Component
    // Use less constructor warning
    function RenderMenuItem ({dish, onClick}) {
        return (
            <Card onClick={() => onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card> 
        );
    }

    const Menu = (props) => {
        const menu = props.dishes.map((dish) =>{
            return (
                // Key is required because react need key to map or be given to elements inside the arrray
                // - help identify which items have changed, are added or removed
                <div className="col-12 col-md-5 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish} onClick={props.onClick}/>
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

export default Menu;