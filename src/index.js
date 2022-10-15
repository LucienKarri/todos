import { createRoot } from 'react-dom/client';

import './style.css';
import TodoApp from './components/todoApp';

const container = document.getElementById('root');
const root = createRoot(container);
const test = () => {};
test();
root.render(<TodoApp />);
