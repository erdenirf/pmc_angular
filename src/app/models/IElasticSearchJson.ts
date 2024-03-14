export interface ITotal {
  value: number,
  relation: string,
}
export interface IHits {
  _index: string,
  _id: string,
  _score: number,
  _source: any,
}
export interface IElasticSearchJson {
  total: ITotal,
  max_score: number,
  hits: IHits[],
}
