export interface IDateRevised {
  Year: string,
  Month: string,
  Day: string
}
export interface IPubDate {
  Year?: string,
  Month?: string,
  Day?: string,
}
export interface IJournalIssue {
  Volume?: string,
  Issue?: string,
  PubDate: IPubDate,
}
export interface IJournal {
  ISOAbbreviation: string,
  Title: string,
  JournalIssue: IJournalIssue,
  ISSN_Print?: string,
  ISSN_Electronic?: string,
}
export interface IAffiliation {
  Affiliation?: string,
}
export interface IAuthor {
  LastName?: string,
  ForeName?: string,
  Initials?: string,
  AffiliationInfo?: IAffiliation[],
}
export interface IELocationID {
  EIdType?: string,
  text?: string,
}
export interface IPublicationType {
  UI: string,
  text: string,
}
export interface IAbstractText {
  Label?: string,
  NlmCategory?: string,
  text: string,
}
export interface IArticle {
  Journal: IJournal,
  ArticleTitle: string,
  Pagination?: string,
  ELocationID?: IELocationID[],
  AbstractText?: IAbstractText[],
  CopyrightInformation?: string,
  AuthorList?: IAuthor[],
  PublicationTypeList: IPublicationType[]
}
export interface IMedlineJournalInfo {
  MedlineTA: string,
  NlmUniqueID: string,
  Country?: string,
  ISSNLinking?: string,
}
export interface IMeshHeading {
  UI?: string,
  text?: string,
}
export interface IKeyword {
  text?: string,
}
export interface ICommentsCorrections {
  RefType?: string,
  RefSource?: string,
  PMID: string,
}
export interface INameOfSubstance {
  UI: string,
  text: string,
}
export interface IChemical {
  RegistryNumber: string,
  NameOfSubstance: INameOfSubstance,
}
export interface IMedlineCitation {
  PMID: number,
  DateRevised: IDateRevised,
  Article: IArticle,
  MedlineJournalInfo: IMedlineJournalInfo,
  MeshHeadingList?: IMeshHeading[],
  KeywordList?: IKeyword[],
  CommentsCorrectionsList?: ICommentsCorrections[],
  ChemicalList?: IChemical[],
}
export interface IPubMedPubDate {
  Year: string,
  Month: string,
  Day: string,
  Hour: string,
  Minute: string,
  PubStatus?: string,
}
export interface IArticleId {
  IdType: string,
  text: string,
}
export interface IArticleId {
  IdType: string,
  text: string,
}
export interface IReference {
  Citation: string,
  ArticleIdList: IArticleId[],
}
export interface IPubmedData {
  History: IPubMedPubDate[],
  ArticleIdList: IArticleId[],
  ReferenceList?: IReference[],
}
export interface IModelPubMed {
  MedlineCitation: IMedlineCitation,
  PubmedData: IPubmedData,
  DateEntrez: string,
}
