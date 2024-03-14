import {IModel, IModelGetter} from './IModel';
import {IElasticSearchJson, IHits, ITotal} from "./IElasticSearchJson";

interface IDateRevised {
  Year: string,
  Month: string,
  Day: string
}
interface IPubDate {
  Year?: string,
  Month?: string,
  Day?: string,
}
interface IJournalIssue {
  Volume?: string,
  Issue?: string,
  PubDate: IPubDate,
}
interface IJournal {
  ISOAbbreviation: string,
  Title: string,
  JournalIssue: IJournalIssue,
  ISSN_Print?: string,
  ISSN_Electronic?: string,
}
interface IAffiliation {
  Affiliation?: string,
}
interface IAuthor {
  LastName?: string,
  ForeName?: string,
  Initials?: string,
  AffiliationInfo?: IAffiliation[],
}
interface IELocationID {
  EIdType?: string,
  text?: string,
}
interface IPublicationType {
  UI: string,
  text: string,
}
interface IAbstractText {
  Label?: string,
  NlmCategory?: string,
  text: string,
}
interface IArticle {
  Journal: IJournal,
  ArticleTitle: string,
  Pagination?: string,
  ELocationID?: IELocationID[],
  AbstractText?: IAbstractText[],
  CopyrightInformation?: string,
  AuthorList?: IAuthor[],
  PublicationTypeList: IPublicationType[]
}
interface IMedlineJournalInfo {
  MedlineTA: string,
  NlmUniqueID: string,
  Country?: string,
  ISSNLinking?: string,
}
interface IMeshHeading {
  UI?: string,
  text?: string,
}
interface IKeyword {
  text?: string,
}
interface ICommentsCorrections {
  RefType?: string,
  RefSource?: string,
  PMID: string,
}
interface INameOfSubstance {
  UI: string,
  text: string,
}
interface IChemical {
  RegistryNumber: string,
  NameOfSubstance: INameOfSubstance,
}
interface IMedlineCitation {
  PMID: number,
  DateRevised: IDateRevised,
  Article: IArticle,
  MedlineJournalInfo: IMedlineJournalInfo,
  MeshHeadingList?: IMeshHeading[],
  KeywordList?: IKeyword[],
  CommentsCorrectionsList?: ICommentsCorrections[],
  ChemicalList?: IChemical[],
}
interface IPubMedPubDate {
  Year: string,
  Month: string,
  Day: string,
  Hour: string,
  Minute: string,
  PubStatus?: string,
}
interface IArticleId {
  IdType: string,
  text: string,
}
interface IArticleId {
  IdType: string,
  text: string,
}
interface IReference {
  Citation: string,
  ArticleIdList: IArticleId[],
}
interface IPubmedData {
  History: IPubMedPubDate[],
  ArticleIdList: IArticleId[],
  ReferenceList?: IReference[],
}
interface IModelPubMed {
  MedlineCitation: IMedlineCitation,
  PubmedData: IPubmedData,
  DateEntrez: string,
}
interface IHitsPubmed extends IHits{
  _index: string,
  _id: string,
  _score: number,
  _source: IModelPubMed,
}
interface IPubmedJson extends IElasticSearchJson, IModelGetter {
  total: ITotal,
  max_score: number,
  hits: IHitsPubmed[],
  get_1D_sources(): IModel[],
}
export default class ModelPubmedJson implements IPubmedJson{
  hits: IHitsPubmed[] = [];
  max_score: number = 0;
  total: ITotal = {
    value: 0,
    relation: "gte",
  };
  public get_1D_sources(): IModel[] {
    let result: IModel[] = [];
    this.hits.forEach(element => {
      let model: IModel = {
        "Abstract": this.get_Abstract(element._source),
        "Affiliations": this.get_Affiliations(element._source),
        "Author_fullname": this.get_Author_fullname(element._source),
        "Author_initials": this.get_Author_initials(element._source),
        "Categories": this.get_Categories(element._source),
        "DOI": this.get_DOI(element._source),
        "Glossary": this.get_Glossary(element._source),
        "PMCID": this.get_PMCID(element._source),
        "PMID": element._source.MedlineCitation.PMID,
        "Ref_ids": this.get_RefIds(element._source),
        "References": this.get_References(element._source),
        "Text_full": "",
        "Title": element._source.MedlineCitation.Article.ArticleTitle,
        "book_first_page": element._source.MedlineCitation.Article.Pagination ?? "",
        "book_issue": element._source.MedlineCitation.Article.Journal.JournalIssue.Issue ?? "",
        "book_last_page": "",
        "book_volume": element._source.MedlineCitation.Article.Journal.JournalIssue.Volume ?? "",
        "date_day": element._source.MedlineCitation.Article.Journal.JournalIssue.PubDate.Day ?? "",
        "date_epub": element._source.DateEntrez,
        "date_month": element._source.MedlineCitation.Article.Journal.JournalIssue.PubDate.Month ?? "",
        "date_year": element._source.MedlineCitation.Article.Journal.JournalIssue.PubDate.Year ?? "",
        "journal_ISSNE": element._source.MedlineCitation.Article.Journal.ISSN_Electronic ?? "",
        "journal_ISSNP": element._source.MedlineCitation.Article.Journal.ISSN_Print ?? "",
        "journal_longname": element._source.MedlineCitation.Article.Journal.Title,
        "journal_nlm": element._source.MedlineCitation.Article.Journal.ISOAbbreviation,
      };
      result.push(model);
    });
    return result;
  }
  private get_Abstract(model: IModelPubMed): string {
    let result: string[] = [];
    model.MedlineCitation.Article.AbstractText?.forEach(it => {
      result.push(it.text);
    });
    return result.join("\n");
  }
  private get_Affiliations(model: IModelPubMed): string {
    let result: string[] = [];
    model.MedlineCitation.Article.AuthorList?.forEach(author => {
      author.AffiliationInfo?.forEach(item => {
        if (item.Affiliation != null) {
          if (-1 === result.indexOf(item.Affiliation )) {
            result.push(item.Affiliation);
          }
        }
      });
    });
    return result.join("; ");
  }
  private get_Author_fullname(model: IModelPubMed): string {
    let result: string[] = [];
    model.MedlineCitation.Article.AuthorList?.forEach(author => {
      result.push(author.ForeName + ' ' + author.LastName);
    });
    return result.join(", ");
  }
  private get_Author_initials(model: IModelPubMed): string {
    let result: string[] = [];
    model.MedlineCitation.Article.AuthorList?.forEach(author => {
      result.push(author.LastName + ' ' + author.Initials);
    });
    return result.join(", ");
  }
  private get_Categories(model: IModelPubMed): string {
    let result: string[] = [];
    model.MedlineCitation.Article.PublicationTypeList.forEach(pubType => {
      result.push(pubType.text);
    });
    return result.join(" ");
  }
  private get_DOI(model: IModelPubMed): string {
    for (let articleID of model.PubmedData.ArticleIdList) {
      if (articleID.IdType === 'doi') {
        return articleID.text;
      }
    }
    return '';
  }
  private get_Glossary(model: IModelPubMed): string {
    let result: string[] = [];
    model.MedlineCitation.KeywordList?.forEach(keyword => {
      if (keyword.text != null) {
        result.push(keyword.text);
      }
    });
    return result.join("; ");
  }
  private get_PMCID(model: IModelPubMed): string {
    for (let articleID of model.PubmedData.ArticleIdList) {
      if (articleID.IdType === 'pmc') {
        return articleID.text;
      }
    }
    return '';
  }
  private get_RefIds(model: IModelPubMed): number[] {
    let result: number[] = [];
    model.PubmedData.ReferenceList?.forEach(ref => {
      let pmid: number = 0;
      ref.ArticleIdList.forEach(articleID => {
        if (articleID.IdType === 'pubmed') {
          pmid = +articleID.text;
        }
      });
      if (pmid !== 0) {
        result.push(pmid);
      }
    });
    return result;
  }
  private get_References(model: IModelPubMed): string[] {
    let result: string[] = [];
    model.PubmedData.ReferenceList?.forEach(ref => {
      let pmid: number = 0;
      ref.ArticleIdList.forEach(articleID => {
        if (articleID.IdType === 'pubmed') {
          pmid = +articleID.text;
        }
      });
      if (pmid === 0) {
        result.push(ref.Citation);
      }
    });
    return result;
  }
}
