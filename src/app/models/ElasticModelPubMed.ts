import {IElasticSearchJson, IHits, ITotal} from "./IElasticSearchJson";
import {IModelPubmed} from "./IModelPubmed";

interface IHitsPubmed extends IHits{
  _index: string,
  _id: string,
  _score: number,
  _source: IModelPubmed,
}
interface IElasticPubmed extends IElasticSearchJson {
  total: ITotal,
  max_score: number,
  hits: IHitsPubmed[],
}
export default class ElasticModelPubmed implements IElasticPubmed{
  hits: IHitsPubmed[] = [];
  max_score: number = 0;
  total: ITotal = {
    value: 0,
    relation: "gte",
  };
}
