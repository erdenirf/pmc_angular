export interface IJournal {
  nlm?: string,
  longname?: string,
  ISSNP?: string,
  ISSNE?: string,
}
export interface IDate {
  year: number,
  month?: number,
  day?: number,
}
export interface IAuthor {
  fullname?: string,
  initials?: string,
}
export interface IDefinition {
  definition?: string,
}
export interface IInstitute {
  institute?: string,
}
export interface IBook {
  volume?: string,
  issue?: string,
  first_page?: string,
  last_page?: string,
}
export interface IPubmedId {
  pubmed_id: number,
}
export interface IPaper {
  paper?: string,
}
export interface IModelPMC {
  journal?: IJournal,
  PMID?: number,
  PMCID: string,
  DOI?: string,
  Title?: string,
  Author?: IAuthor[],
  date: IDate,
  date_epub: string,
  Abstract?: string,
  Text_full?: string,
  Glossary?: IDefinition[],
  Categories?: string,
  Affiliations?: IInstitute[],
  book?: IBook,
  Ref_ids?: IPubmedId[],
  References?: IPaper[],
}
