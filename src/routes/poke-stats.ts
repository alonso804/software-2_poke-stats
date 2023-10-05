import { Router } from 'express';

import PokeStatsController from '../controllers/poke-stats';

const router = Router();

router.get('/get/:id', PokeStatsController.get);

export default router;
