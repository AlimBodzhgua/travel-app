import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import 'dayjs/locale/de';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                <DndProvider backend={HTML5Backend}>
                    <App />
                </DndProvider>
            </LocalizationProvider>
        </Provider>
    </BrowserRouter>
);

