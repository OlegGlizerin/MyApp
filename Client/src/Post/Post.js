
import * as React from 'react'

import './Post.css';


function Post( props ){
        return(
            <div className='post' >
                <div className='userName' > { props.userName } </div>
                <div> { props.catalog } </div>
                <div> { props.subject } </div>
                <div> { props.content } </div>
                
            </div>
           
            
        );
}
export default Post;
