import type { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import { logger } from 'src/logger';
import StatsModel from 'src/models/stat';
import { z } from 'zod';

const getSchema = z.object({
  id: z.string().regex(/^[0-9]+$/),
});

class PokeStatsController {
  static async get(req: Request, res: Response): Promise<void> {
    const start = performance.now();

    const data = getSchema.safeParse(req.params);

    if (!data.success) {
      res.status(400).send(data.error);
      return;
    }

    const { id } = data.data;

    const stats = await StatsModel.findById(id);

    if (!stats) {
      const end = performance.now();
      logger.warn({ microservice: 'poke-stats', message: 'Not found', time: end - start });

      res.status(404).send({ message: 'Stat not found' });
      return;
    }

    const end = performance.now();
    logger.info({ microservice: 'poke-stats', message: 'Read from mongodb', time: end - start });

    res.status(200).send({ stats });
  }
}

export default PokeStatsController;
