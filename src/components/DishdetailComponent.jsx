import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, CardImg } from "reactstrap";

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        if(comments != null) {
            // console.log(dish.comments);
            const comment = comments.map(({author, comment, date, id, rating}) => {                    
                // let dateformat = new Date(date);
                // console.log('Date format: ', dateformat.getTime());
                return (    
                        <li key={id}>
                            <p>{comment}</p>
                            <p>-- {author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(date))}
                            </p>
                        </li>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        { comment }
                    </ul>
                </div>
            );    
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderDish(dish) {
        if(dish != null) {
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>                 
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    render() {
        const dish = this.props.selectedDish;
        return (
            <div className='row'>
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                {this.renderComments(dish?.comments)}
            </div>
        );
    }

}

export default DishDetail;