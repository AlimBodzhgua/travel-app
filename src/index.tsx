import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from 'redux/config/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import App from './App';
import 'config/i18n/i18n';
import 'dayjs/locale/de';
import './App.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = createReduxStore();

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                <App />
            </LocalizationProvider>
        </Provider>
    </BrowserRouter>
);

