import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


function RenderDirectoryItem({campsite, onClick}) {
    return (
        <Card >
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

function Directory(props) {

    const directory = props.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });

    return (
        <div className="container">
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