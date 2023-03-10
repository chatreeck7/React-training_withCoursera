import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, CardImg, Breadcrumb, BreadcrumbItem, Button, ModalHeader, Modal, ModalBody, Row, Col, Label } from "reactstrap";
import { Link } from "react-router-dom"
import { Control, LocalForm, Errors } from "react-redux-form"
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger" model=".author" show="touched" messages={{
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
// initiate action upon the user submitting
function RenderComments({comments, postComment, dishId}) {
    if(comments != null) {
        // console.log(dish.comments);
        const comment = 
            comments.map(({author, comment, date, id, rating}) => {                    
            // let dateformat = new Date(date);
            // console.log('Date format: ', dateformat.getTime());
            return (    
                    <Fade in>
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
                    </Fade>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        { comment }
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
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
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>                 
            </FadeTransform>
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
    const postComment = props?.postComment;
    // console.log(`Dish : `,dish);
    // console.log(`Comments : `, comments);
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
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
                    <RenderComments comments={comments}
                        postComment={postComment}
                        dishId={dish.id}
                    />
                </div>
            </div>
        );
    }
}

export default DishDetail;