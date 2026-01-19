import { type FC } from 'react';

import { DealsBoard } from './components/DealsBoard';
import { type DealsProps } from './Deals.types';

/**
 * Страница сделок
 * @returns Страница сделок
 */
export const Deals: FC<DealsProps> = () => {
  return <DealsBoard />;
};
