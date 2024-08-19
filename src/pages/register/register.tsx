import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectUser } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error } = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: email,
        password: password,
        name: userName
      })
    )
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
