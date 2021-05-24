import { Router} from 'express';

class AuthRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/',(req,res)=>{res.send('GET AuthRoutes')});

    }

}

const authRoutes  = new AuthRoutes();
export default authRoutes.router;