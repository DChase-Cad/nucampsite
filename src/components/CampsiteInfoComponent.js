import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';




function renderCampsite(campsite) {

    return (
        <div className="col-md-5">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}



function renderComments(comments) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments =>
                    <div key={comments.id}>
                        <p>{comments.text}<br />
                            --{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</p>
                    </div>

                )};
            </div>
        )
    }
    return <div />
}

function CampsiteInfo(props){

    if (props.campsite) {
        return (
            <div className="container">
                <div className='row'>
                    {renderCampsite(props.campsite)}
                    {renderComments(props.campsite.comments)}
                </div>
            </div>
        );
    }

    return <div />;
}


export default CampsiteInfo;