import routes from "./routes";
import { Router } from 'fast-react-router';

const router = new Router({
    routes,
    mode: 'browser'
});

export default router;
