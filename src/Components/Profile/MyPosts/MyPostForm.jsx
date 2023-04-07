import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
const myPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newPostText'} component={'textarea'} validate={[required, maxLength, minLength]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const MyPostReduxForm = reduxForm({ form: 'ProfileAddNewPostForm' })(myPostForm);

const NewPost = (props) => {
  return (
    <div>
      <MyPostReduxForm onSubmit={props.onSubmit} />
    </div>
  );
};
export default NewPost;
