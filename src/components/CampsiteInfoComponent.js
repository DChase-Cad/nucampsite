import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);

        //initializing state with the ids of the form fields and modal toggling, touched for validation on firstName
        this.state = {
            author: '',
            rating: '',
            text: '',
            isModalOpen: false,
            touched: {
                author: false
            },
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //toggle function for showing and removing the modal
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    //alerting & console logging the state data from the form inputs/selection
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <>
                {/* button to show the comment modal */}
                <Button onClick={this.toggleModal} outline type="button"><i className="fa fa-pencil fa-lg" />Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader onClick={this.toggleModal} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            {/* onSubmit fires the handlesumbit function */}
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>

                                {/* rating selection 1-5 */}
                                <div className='form-group'>
                                    <Label htmlFor='rating'>Rating</Label>

                                    <Control.select model='.rating' id='rating' name='rating'
                                        defaultValue='1'
                                        className="form-control">
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>

                                </div>

                                {/* first name input field */}
                                <div className='form-group'>
                                    <Label htmlFor='author'>Your Name</Label>
                                    <Control.text model='.author' id='author' name='author'
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.author'
                                        show='touched'
                                        component='div'
                                        messages={{
                                            minLength: 'Must be at least 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                    />
                                </div>

                                {/* comment text area */}
                                <div className='form-group'>
                                    <Label htmlFor='text'>Comment</Label>
                                    <Control.textarea model='.text' id='text' name='text'
                                        rows='6'
                                        className="form-control" />
                                </div>

                                {/* submit button */}
                                <div className='form-group'>
                                    <Button type='submit' color='primary'>
                                        Submit
                                    </Button>
                                </div>
                            </LocalForm>
                        {/* div on following line closes div the form is in */}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5">
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}



function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments =>
                    <div key={comments.id}>
                        <p>{comments.text}<br />
                            --{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</p>
                    </div>

                )}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        )
    }
    return <div />
}

function CampsiteInfo(props) {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    
    
    
    if (props.campsite) {
        return (
            <div className="container content">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    /> 
                </div>

            </div>
        );
    }
    return <div />;
}





export default CampsiteInfo;