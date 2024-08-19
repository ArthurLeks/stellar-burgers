import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error } = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email,
        password: password
      })
    )
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
