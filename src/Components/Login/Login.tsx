import * as React from 'react';
import { createField, GetStringKeys, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import style from './../common/FormsControls/FormsControls.module.css';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import { InjectedFormProps, reduxForm } from 'redux-form';

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      {createField<LoginFormValuesTypeKeys>(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

      {captchaUrl && <img alt={'Captcha URL'} src={captchaUrl} />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export const Login: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: any = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};
