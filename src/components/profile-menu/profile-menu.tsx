import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/', {});
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
