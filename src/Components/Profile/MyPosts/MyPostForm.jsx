import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);
const myPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          placeholder={'Post message'}
          validate={[required, maxLength10]}
        />
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
