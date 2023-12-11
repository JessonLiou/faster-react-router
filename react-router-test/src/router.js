import routes from "./routes";
import { Router } from 'faster-react-router';

const router = new Router({
    routes,
    mode: 'browser'
});

export default router;
