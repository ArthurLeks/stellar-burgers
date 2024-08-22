import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { selectAllIngredients } from '../../services/slices/ingredientsSlice';

export const BurgerIngredients: FC = () => {
  const { data } = useSelector(selectAllIngredients);
  const buns = data.filter((item) => item.type === 'bun');
  const mains = data.filter((item) => item.type === 'main');
  const sauces = data.filter((item) => item.type === 'sauce');

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunRef, isBunVisible] = useInView({ threshold: 0 });
  const [mainRef, isMainVisible] = useInView({ threshold: 0 });
  const [sauceRef, isSauceVisible] = useInView({ threshold: 0 });

  useEffect(() => {
    if (isBunVisible) {
      setActiveTab('bun');
    } else if (isSauceVisible) {
      setActiveTab('sauce');
    } else if (isMainVisible) {
      setActiveTab('main');
    }
  }, [isBunVisible, isMainVisible, isSauceVisible]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab as TTabMode);
    if (tab === 'bun') {
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'main') {
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sauce') {
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunRef}
      mainsRef={mainRef}
      saucesRef={sauceRef}
      onTabClick={handleTabClick}
    />
  );
};
