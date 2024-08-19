import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from 'react-redux';
import { selectConstructorItems } from '../../services/slices/feedSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorData = useSelector(selectConstructorItems);

  const calculateIngredientCounts = useMemo(() => {
    const { bun, ingredients: selectedIngredients } = constructorData;
    const counts: { [key: string]: number } = {};

    selectedIngredients.forEach((ingredient: TIngredient) => {
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });

    if (bun) {
      counts[bun._id] = 2;
    }

    return counts;
  }, [constructorData]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={calculateIngredientCounts}
      ref={ref}
    />
  );
});
