import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index';
import { connect } from 'react-redux';

class PostsNew extends Component {
    renderField(field) {
        const { meta : { touched, error }} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
          <div className={className}>
              <label>{field.label}</label>
              <input
                  className="form-control"
                  type="text"
                  {...field.input}
              />
              <div className="text-help">
              {touched ? error : ''}
              </div>
          </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
                label="Title"
                name="title"
                component={this.renderField}
            />
            <Field
                label="Categories"
                name="categories"
                component={this.renderField}
            />
            <Field
                label="Content"
                name="content"
                component={this.renderField}
            />
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link
                  className="btn btn-danger"
                  to="/">Cancel
              </Link>
          </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if(!values.title) {
        errors.title="Required";
    }
    if(!values.categories) {
        errors.categories = "Enter the categories";
    }
    if(!values.content || values.content.length <3 ) {
        errors.content = "Enter the content";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{ createPost}) (PostsNew)
);
