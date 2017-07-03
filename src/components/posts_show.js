import React, { Component } from 'react';
import { showPost, deletePost } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        this.props.showPost(this.props.match.params.id);
    }

    onDeleteClick() {
        console.log('id:', this.props.match.params.id);
        this.props.deletePost(this.props.match.params.id, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { post } = this.props;
        if(!post) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="post-detail">
                <Link className="btn btn-secondary" to="/">
                            Back
                </Link>
                <button className="btn btn-danger pull-xs-right"
                         onClick={this.onDeleteClick.bind(this)}>Delete</button>
                <h3>{post.title}</h3>
                <h6>Category: { post.categories }</h6>
                <p>
                    {post.content}
                </p>
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    console.log(posts[ownProps.match.params.id]);
    return { post : posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { showPost, deletePost } )(PostsShow);
