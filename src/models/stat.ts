import { getModelForClass, prop, type ReturnModelType } from '@typegoose/typegoose';
import type { Document } from 'mongoose';

export class Stats {
  @prop()
  id: number;

  @prop()
  name: string;

  @prop()
  type1: string;

  @prop()
  type2: string;

  @prop()
  total: number;

  @prop()
  hp: number;

  @prop()
  attack: number;

  @prop()
  defense: number;

  @prop()
  spAtk: number;

  @prop()
  spDef: number;

  @prop()
  speed: number;

  @prop()
  generation: number;

  @prop()
  legendary: boolean;

  static async findById(
    this: ReturnModelType<typeof Stats>,
    id: number,
  ): Promise<StatsDocument | null> {
    return this.findOne({ id }).lean();
  }
}

export type StatsDocument = Stats & Document;

const StatsModel = getModelForClass(Stats, {
  schemaOptions: { collection: 'stats' },
});
export default StatsModel;
