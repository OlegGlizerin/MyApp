
import * as React from 'react';
import './Comment.css';

export default
class Comment extends React.Component{
    
    render(){
        
        
        return(
            <div className='comment' >

                <div className='commentData'>
                    <div className='userImage' >
                        <img src={ require('../../ebalo.jpg') } />
                    </div>
                    <div className='commentContent' >
                        <span className='commentOwner'> {this.props.userId} </span>
                        {this.props.commentContent}
                    </div>
                </div>

                <div className='commentMetaData'>
                    <div className='like'>like</div>
                    <div className='like'>comment</div>
                    <div className='like'>date</div>
                </div>

            </div>
        );
    }
}

