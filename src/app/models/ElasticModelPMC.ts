import {IElasticSearchJson, IHits, ITotal} from "./IElasticSearchJson";
import {IModelPMC} from "./IModelPMC";

interface IHitsPMC extends IHits{
  _index: string,
  _id: string,
  _score: number,
  _source: IModelPMC,
}
interface IElasticPMC extends IElasticSearchJson {
  total: ITotal,
  max_score: number,
  hits: IHitsPMC[],
}
export default class ElasticModelPMC implements IElasticPMC{
  hits: IHitsPMC[] = [];
  max_score: number = 0;
  total: ITotal = {
    value: 0,
    relation: "gte",
  };
}
