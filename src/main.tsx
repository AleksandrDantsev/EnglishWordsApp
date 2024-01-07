import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={"/english-app"}>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
)
