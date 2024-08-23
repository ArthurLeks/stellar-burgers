import constructorSlice, {
  addIngredient,
  initialState,
  orderBurger,
  removeIngredient
} from '../slices/constructorSlice';
import { expect, test, describe } from '@jest/globals';
import { TConstructorIngredient } from '@utils-types';

describe('тестирование редьюсера конструктора бургера', () => {
  const ingredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  describe('тестирование экшена добавления ингредиента', () => {
    test('добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient(ingredient)
      );

      const ingredientFromState = newState.constructorItems.ingredients[0];

      expect(ingredientFromState).toEqual(ingredient);
    });
  });

  describe('тестирование экшена удаления ингредиента', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient as TConstructorIngredient]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(
        initialState,
        removeIngredient('helloWorld')
      );

      const ingredientsFromState = newState.constructorItems.ingredients;
      expect(ingredientsFromState).toEqual([]);
    });
  });

  describe('тестирование асинхронного экшена orderBurger', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: orderBurger.pending.type
      };
      const newState = constructorSlice(initialState, action);
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'error' }
      };
      const newState = constructorSlice(initialState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe('error');
      expect(newState.orderModalData).toBe(null);
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 1 } }
      };
      const newState = constructorSlice(initialState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orderModalData?.number).toBe(action.payload.order.number);
    });
  });
});
