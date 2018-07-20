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



export default 
class Post extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            expended: false,
        }

        this.showMessages = this.showMessages.bind( this );
    }
    showMessages(){
        this.setState({
            expended: !this.state.expended,
        });
        console.log(this.state.expended);
    }


    render(){
        const media = {
            height: 0,
            paddingTop: '70%',
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
                        title = { this.props.userId }
                        subheader = 'i need some one to build me app called arab detecter :)'

                    />
                    <CardMedia image = 'dna.jpg' style = { media } />
                    <CardContent>
                        This impressive paella is a perfect party dish and a fun meal to cook together with
                        your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </CardContent>
                    <CardActions>
                        <IconButton>
                            <Favorite />
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
                    <Collapse in = { this.state.expended } > 
                        <CardContent>
                            loremloremloremlo remloremloremloreml oremloremloremlorem
                            loremloremloremlo remloremloremloreml oremloremloremlorem
                            loremloremloremlo remloremloremloreml oremloremloremlorem
                            loremloremloremlo remloremloremloreml oremloremloremlorem
                            loremloremloremlo remloremloremloreml oremloremloremlorem
                        </CardContent>
                    </Collapse>
                  
                    
                   
                </Card>
            </div>
        );
    }
}


