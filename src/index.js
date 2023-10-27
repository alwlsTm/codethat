import { RecoilEnv, RecoilRoot } from 'recoil';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Main />
  </RecoilRoot>
);
