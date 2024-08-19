import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => {
    const tabs = [
      { value: 'bun', label: 'Булки', active: currentTab === 'bun' },
      { value: 'main', label: 'Начинки', active: currentTab === 'main' },
      { value: 'sauce', label: 'Соусы', active: currentTab === 'sauce' }
    ];

    const categories = [
      {
        title: 'Булки',
        titleRef: titleBunRef,
        ingredients: buns,
        ref: bunsRef
      },
      {
        title: 'Начинки',
        titleRef: titleMainRef,
        ingredients: mains,
        ref: mainsRef
      },
      {
        title: 'Соусы',
        titleRef: titleSaucesRef,
        ingredients: sauces,
        ref: saucesRef
      }
    ];

    return (
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            {tabs.map(({ value, label, active }) => (
              <Tab
                key={value}
                value={value}
                active={active}
                onClick={onTabClick}
              >
                {label}
              </Tab>
            ))}
          </ul>
        </nav>
        <div className={styles.content}>
          {categories.map(({ title, titleRef, ingredients, ref }) => (
            <IngredientsCategory
              key={title}
              title={title}
              titleRef={titleRef}
              ingredients={ingredients}
              ref={ref}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default BurgerIngredientsUI;
