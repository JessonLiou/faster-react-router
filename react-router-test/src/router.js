import routes from "./routes";
import { Router } from 'faster-react-router';
import NotFound from './pages/NotFound';

const router = new Router({
    routes,
    mode: 'browser',
    fallback: {
        component: NotFound
    },
});

export default router;
