import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusMessages: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return '#E52B1A';
    case 'done':
      return '#00CCCC';
    default:
      return '#F2F2F3';
  }
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textColor = getStatusColor(status);
  const statusMessage = statusMessages[status] || '';

  return <OrderStatusUI textStyle={textColor} text={statusMessage} />;
};
