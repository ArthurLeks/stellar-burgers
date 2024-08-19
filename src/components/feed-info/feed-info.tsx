import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from 'react-redux';
import { selectFeed } from '../../services/slices/feedSlice';

const filterOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const data = useSelector(selectFeed);
  const { orders, total, totalToday } = data;

  const completedOrders = filterOrdersByStatus(orders, 'done');
  const inProgressOrders = filterOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={completedOrders}
      pendingOrders={inProgressOrders}
      feed={{ total, totalToday }}
    />
  );
};
