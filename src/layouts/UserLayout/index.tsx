import * as React from 'react';
import styles from './index.module.scss';
import { Provider } from 'mobx-react';
import services from '@/services';

function UserLayout(props: any) {
  return (
    <Provider {...services}>
      <header className={styles.header}>
        <div className={styles.logo}>logo</div>
      </header>
      <div className={styles.body}>{props.children}</div>
    </Provider>
  );
}

export default UserLayout;
