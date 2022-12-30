import React from "react";
import { Card, CardTitle, CardText, CardBody, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom"

    // Use less constructor warning
    function RenderComments({comments}) {
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
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(date)))}
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

    function RenderDish({dish}) {
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

    const DishDetail = (props) => {
        console.log(`Props : `,props);
        const dish = props?.selectedDish;
        const comments = props?.selectedComments;
        console.log(`Dish : `,dish);
        console.log(`Comments : `, comments);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}/>
                    </div>
                    <RenderComments comments={comments}/>
                </div>
            </div>
        );
    }

export default DishDetail;