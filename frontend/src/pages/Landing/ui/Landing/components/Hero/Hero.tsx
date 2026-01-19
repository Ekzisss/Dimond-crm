import { type FC } from 'react';

import { LogoIcon } from '@/shared/ui/icons';

import s from './Hero.module.css';

export const Hero: FC = () => {
  return (
    <section className={s.hero}>
      <div className={s.bgContainer}>
        <div className={s.bgTextTop}>DIAMOND</div>
        <div className={s.bgTextBottom}>CRM</div>
      </div>

      <div className={s.smiley}>☺</div>

      <div className={s.content}>
        <div className={s.leftColumn}>
          <h1 className={s.headline}>
            <span className={s.headline_first}>We believe</span>
            <br />
            there's no bad
            <br />
            business, there's
            <br />
            bad CRM
          </h1>
        </div>

        <div className={s.centerColumn}>
          <LogoIcon className={s.logo} />
        </div>

        <div className={s.rightColumn}>
          <div className={s.rightContentInner}>
            <h2 className={s.subheadline}>
              For
              <br />
              every
              <br />
              <span className={s.subheadline_last}>business</span>
            </h2>
            <p className={s.description}>
              Our CRM platform helps businesses streamline customer
              relationships, track sales pipelines, and boost productivity. From
              lead management to customer support, we provide the tools you need
              to grow your business efficiently and effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
