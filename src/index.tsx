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
import { YMaps } from '@pbe/react-yandex-maps';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = createReduxStore();

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
				<YMaps query={{
					apikey: '186cb437-4517-458a-bc6d-963f93764fa4',
					load: 'package.full'
				}}>
					<App />
				</YMaps>
            </LocalizationProvider>
        </Provider>
    </BrowserRouter>
);

