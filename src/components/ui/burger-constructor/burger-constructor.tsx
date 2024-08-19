import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const renderBun = (type: 'top' | 'bottom') => {
    if (constructorItems.bun) {
      const bunName = `${constructorItems.bun.name} (${type === 'top' ? 'верх' : 'низ'})`;
      return (
        <div
          className={`${styles.element} ${
            type === 'top' ? 'mb-4 mr-4' : 'mt-4 mr-4'
          }`}
        >
          <ConstructorElement
            type={type}
            isLocked
            text={bunName}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      );
    } else {
      return (
        <div
          className={`${styles.noBuns} ${
            type === 'top' ? styles.noBunsTop : styles.noBunsBottom
          } ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      );
    }
  };

  const renderIngredients = () => {
    if (constructorItems.ingredients.length > 0) {
      return constructorItems.ingredients.map(
        (item: TConstructorIngredient, index: number) => (
          <BurgerConstructorElement
            ingredient={item}
            index={index}
            totalItems={constructorItems.ingredients.length}
            key={item.id}
          />
        )
      );
    } else {
      return (
        <div
          className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите начинку
        </div>
      );
    }
  };

  return (
    <section className={styles.burger_constructor}>
      {renderBun('top')}
      <ul className={styles.elements}>{renderIngredients()}</ul>
      {renderBun('bottom')}
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          children='Оформить заказ'
          onClick={onOrderClick}
        />
      </div>

      {orderRequest && (
        <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
          <Preloader />
        </Modal>
      )}

      {orderModalData && (
        <Modal
          onClose={closeOrderModal}
          title={orderRequest ? 'Оформляем заказ...' : ''}
        >
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
