import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './posts.css';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.state = {
            userId: props.userId,
            posts: [],
            cachedPosts: {}
        };
    }

    componentDidMount() {
        console.log(this.state)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            userId: nextProps.userId,
            posts: prevState.posts,
            cachedPosts: prevState.cachedPosts
        };
    }

    componentDidUpdate(prevProps) {
        let postsAreEmpty = Object.keys(this.state.posts).length === 0
        if (postsAreEmpty || this.props.userId !== prevProps.userId) {
            let cachedPostCollection = this.state.cachedPosts[this.props.userId];
            if(cachedPostCollection){
                console.log('Updated from cache!', this.state)
                this.setState({ posts: cachedPostCollection })
            }
            else {
                console.log('Fetched from API!', this.state)
                this.fetchPosts();
            }
            
        }
    }

    fetchPosts(){
        fetch(`/api/posts/${this.state.userId}`)
            .then(res => res.json())
            .then(posts => {
                let updatedCachedPosts = this.state.cachedPosts;
                updatedCachedPosts[this.state.userId] = posts;
                this.setState({ posts: posts, cachedPosts: updatedCachedPosts})
            });
    } 

    render() {
        return (
            <Container>
            <Row>
            {this.state.posts.map(post => 
                <Col xs={12} className='mb-5' key={post.id}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                            {post.body}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )}
            </Row>
          </Container>
          );
    }
}

export default Posts;
