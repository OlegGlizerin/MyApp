
import * as React from 'react'

import './Post.css';


function Post( props ){
        return(
            <div className='post' >
                <div className='postHeader'>
                    <div className='postHeaderImg'>
                        <img src={ require('../ebalo.jpg') } />
                    </div>
                    <div className='postHeaderUsrData'>
                        <div className='postUsrName' > Oleg Grizli </div>
                        <div className='postTime' > 12:40 </div>
                    </div>
                </div>
                <div className='postContent'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker includi
                    versions of Lorem Ipsum.
                </div>
                <hr />
                <div className='postFooter'>
                    <div className='postLike'> Like</div>
                    <div className='postComment'> Comment</div>
                    <div className='postShare'> Share </div>
                </div>

                <hr />

                <div className='comments'>

                    <div className='comment' >
                        <div className='userImage' >
                            <img src={ require('../ebalo.jpg') } />
                        </div>
                        <div className='commentContent' > comment 2 </div>
                    </div>
                    <div className='comment' >
                        <div className='userImage' >
                            <img src={ require('../ebalo.jpg') } />
                        </div>
                        <div className='commentContent' > comment 2 </div>
                    </div>
                    <div className='comment' >
                        <div className='userImage' >
                            <img src={ require('../ebalo.jpg') } />
                        </div>
                        <div className='commentContent' > comment 2 </div>
                    </div>              
                
                </div>
                

                {/* <div className='userName' > { props.userName } </div>
                <div> { props.catalog } </div>
                <div> { props.subject } </div>
                <div> { props.content } </div> */}
             
            </div>
           
            
        );
}
export default Post;
