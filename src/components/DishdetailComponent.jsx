import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, CardImg, Breadcrumb, BreadcrumbItem, Button, ModalHeader, Modal, ModalBody, Row, Col, Label } from "reactstrap";
import { Link } from "react-router-dom"
import { Control, LocalForm, Errors } from "react-redux-form"

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len)

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state={
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return (
            <div> 
                <Button outline onClick={this.toggleModal}><i className="fa fa-solid fa-pencil fa-lg"/> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} fade={false}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger" model=".yourname" show="touched" messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 charracters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }       
}
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
            <div>
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
    // console.log(`Props : `,props);
    const dish = props?.selectedDish;
    const comments = props?.selectedComments;
    // console.log(`Dish : `,dish);
    // console.log(`Comments : `, comments);
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
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={comments}/>
                    <CommentForm/>
                </div>
            </div>
        </div>
    );
}

export default DishDetail;