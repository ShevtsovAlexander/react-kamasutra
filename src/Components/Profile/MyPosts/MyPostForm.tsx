import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, GetStringKeys, Input } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

type PropsType = {
  onSubmit: (value: any) => void;
};

export type AddPostFormValuesType = {
  newPostText: string;
};
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const myPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>{createField<AddPostFormValuesTypeKeys>('Post message', 'newPostText', [required, maxLength10], Input)}</div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const MyPostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({ form: 'ProfileAddNewPostForm' })(myPostForm);

const NewPost: React.FC<PropsType> = (props) => {
  return (
    <div>
      <MyPostReduxForm onSubmit={props.onSubmit} />
    </div>
  );
};
export default NewPost;
