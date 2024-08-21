import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  orderBurger,
  selectConstructorItems,
  selectUserOrder,
  closeOrderModal as closeModal
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const { orderRequest, orderModalData } = useSelector(selectUserOrder);
  const dispatch = useDispatch();

  const handleOrderClick = () => {
    if (!getCookie('accessToken')) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredientIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(closeModal());
  };

  const totalPrice = useMemo(() => {
    const bunPrice = (constructorItems.bun?.price || 0) * 2;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
