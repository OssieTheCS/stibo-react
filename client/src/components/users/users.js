import React, { Component } from 'react';
import Posts from '../posts/posts'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';

import './users.css';

class Users extends Component {
    constructor(props) {
        super(props);
        
        this.switchUser = this.switchUser.bind(this);

        this.state = {
            users: [],
            activeUser: 1
        };
    }

    switchUser(user) {
        console.log('updating user from state: ' + this.state.activeUser + ' to: ' + user.id)
        this.setState(state => ({
            activeUser: user
        }));

        window.scrollTo({ top: 200, behavior: 'smooth' })
    }


    componentDidMount() {
        fetch('/api/users')
            .then(res => res.json())
            .then(users => this.setState({ 
                users: users, 
                activeUser: users[0]
            }));
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className="right-border-dashed">
                        <h2>Users</h2>
                        <Container>
                            <Row>
                            {this.state.users.map(user => 
                                <Col md={4} className='mb-5' key={user.id}>
                                    <Card className="card-user">
                                        <Card.Body>
                                            <Card.Img variant="top" src="blank-profile.png" />
                                            <Card.Title>{user.name}</Card.Title>
                                            <Card.Text>
                                            username: {user.username}
                                            </Card.Text>
                                            <Card.Text>
                                            email: {user.email}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => this.switchUser(user)}>View posts</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <h2>{this.state.activeUser.name}'s posts</h2>
                        <div>
                            <Posts userId={this.state.activeUser.id}/>
                        </div>
                    </Col>
                </Row>
                </Container>
          );
    }
}

export default Users;
