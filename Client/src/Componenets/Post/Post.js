import * as React from 'react';

import {  
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
} from '@material-ui/core';

import {
    ExpandMore,
    Favorite,
    MoreVert,
    Share,
} from '@material-ui/icons';


import PostApi from '../../api/post'


export default 
class Post extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            expended: false,
            liked: false,
            comment: '',
            allComments: this.props.commentContent
        }
       
        this.showMessages = this.showMessages.bind( this );
    }
    showMessages(){
        this.setState({
            expended: !this.state.expended,
        });
        console.log(this.state.expended);
    }

    setLike() {
        console.log(this);
        
        this.setState({
            liked: !this.state.liked
        });
        
    }

    async addComment() {
        let x = this.state.comment;
       await PostApi.createComment(this.state.comment);

       this.setState(function (state, props) {  return {   allComments: state.allComments.concat([this.state.comment]) } });

       console.log(this.state.allComments);
    }




    render(){
        console.log(this.props);
        // const allCommentsCardContents = this.state.allComments.map((comment, i) => {
        //     return <CardContent key={i}> {comment} </CardContent>
        // });
        var allCommentsCardContents;
        const media = {
            height: 0,
            paddingTop: '30%',
          };
        return(
            <div className='postWrapper' >
                <Card>
                    <CardHeader 
                        avatar = {
                            <Avatar src = 'ebalo.jpg' />
                        }
                        action = { 
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        }
                        title = { this.props.ownerName }
                        subheader = { this.props.userName + ", " + this.props.catalogName + ", " + this.props.createDate + "\n" + this.props.postSubject} 
                        

                    />
                    <CardMedia image = 'dna.jpg' style = { media } />
                    <CardContent>
                    { this.props.postContent}
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={this.setLike.bind(this)}>
                            <Favorite color={this.state.liked ? 'secondary' : 'primary'}/>
                        </IconButton>
                        <IconButton>
                            <Share />
                        </IconButton>
                        <IconButton 
                            onClick = {this.showMessages}
                            aria-expanded = {this.expended}                        
                        >
                            <ExpandMore />
                        </IconButton>
                    </CardActions>
                    <input type="text" className="postComment" onInput={(event) => {this.state.comment = event.target.value}}/>
                    <br/><br/>
                    <input type="submit" onClick={() => {this.addComment()}}/>
                    <Collapse in = { this.state.expended } > 
                         {allCommentsCardContents}  
                    </Collapse>
                  
                    
                   
                </Card>
            </div>
        );
    }
}


