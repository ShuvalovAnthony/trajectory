/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import FormApp from './Form'
import AuthApp from './Auth'
import SearchApp from './Search'
import Main from './Mainpage'


render(() => <Main />, document.getElementById('root') as HTMLElement);
render(() => <App />, document.getElementById('app') as HTMLElement);
render(() => <FormApp />, document.getElementById('form') as HTMLElement);
render(() => <AuthApp />, document.getElementById('auth') as HTMLElement);
render(() => <SearchApp />, document.getElementById('search') as HTMLElement);