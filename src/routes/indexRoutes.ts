import { Router} from 'express';
import { indexController } from '../controllers/indexController'


class IndexRoutes {
    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/',indexController.lista);
        this.router.post('/',indexController.actualizar);
        this.router.put('/',indexController.insertar);
        this.router.delete('/',indexController.eliminar);
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;