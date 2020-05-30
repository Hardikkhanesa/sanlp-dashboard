import React from 'react';
import Aux from '../components/Auxiliary';

import tickLogo from '../assets/img/tick.png';

function AddResult(props) {
    if(props.result.status === 200) {
        return (
            <Aux>
                <h3>{ props.result.data.Message }</h3>
                <img style={{width:"100px", height:"100px", margin:"auto"}} src={tickLogo} alt="Success!"/>
            </Aux>
        )
    }
    else if(props.result.status) {
        return (
            <h6>{ props.result.data.Message }</h6>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default AddResult;

