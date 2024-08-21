import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { selectAllIngredients } from '../../services/slices/ingredientsSlice';

const MAX_INGREDIENTS = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const currentLocation = useLocation();
  const { data: ingredientData } = useSelector(selectAllIngredients);

  const calculateOrderInfo = useMemo(() => {
    if (!ingredientData.length) return null;

    const ingredientsList = order.ingredients.reduce(
      (acc: TIngredient[], ingredientId: string) => {
        const ingredient = ingredientData.find(
          (ing) => ing._id === ingredientId
        );
        if (ingredient) acc.push(ingredient);
        return acc;
      },
      []
    );

    const totalPrice = ingredientsList.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );

    const visibleIngredients = ingredientsList.slice(0, MAX_INGREDIENTS);

    const hiddenIngredientsCount =
      ingredientsList.length > MAX_INGREDIENTS
        ? ingredientsList.length - MAX_INGREDIENTS
        : 0;

    const orderDate = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo: ingredientsList,
      ingredientsToShow: visibleIngredients,
      remains: hiddenIngredientsCount,
      total: totalPrice,
      date: orderDate
    };
  }, [order, ingredientData]);

  if (!calculateOrderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={calculateOrderInfo}
      maxIngredients={MAX_INGREDIENTS}
      locationState={{ background: currentLocation }}
    />
  );
});
