import { type FC } from 'react';

import { Hero } from './components/Hero';
import { Header } from './components/Header';

import s from './Landing.module.css';

export const Landing: FC = () => {
  return (
    <div className={s.landing}>
      <main className={s.main}>
        <Header />
        <Hero />
      </main>
    </div>
  );
};
