import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

function RenderDirectoryItem({ campsite, onClick }) {
    return (
        <Card >
            <Link to={`/directory/${campsite.id}`}>
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {

    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });

    if (props.campsites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container content">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
    );
}

export default Directory;



















// import React, { Component } from 'react';
// import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
// import CampsiteInfoComponent from './CampsiteInfoComponent';


// class Directory extends Component {
//     constructor(props) {
//         super(props);}




//     render() {
//         const directory = this.props.campsites.map(campsite => {
//             return (
//                 <div key={campsite.id} className="col-md-5 m1">
//                     <Card className="m-2" onClick={() => this.props.onClick(campsite.id)}>
//                         <CardImg width="100%" top className="rounded" src={campsite.image} alt={campsite.name} />
//                         <CardImgOverlay>
//                             <CardTitle>{campsite.name}</CardTitle>
//                         </CardImgOverlay>
//                     </Card>
//                 </div>
//             );
//         })


//         return (
//             <div className="container">
//                 <div className="row">
//                     {directory}
//                 </div>
//                 <CampsiteInfoComponent campsite={this.props.selectedCampsite} />
//             </div>
//         );
//     }
// }


// export default Directory;