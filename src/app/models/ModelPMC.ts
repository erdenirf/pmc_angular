import {IModel, IModelGetter} from "./IModel";
import {IElasticSearchJson, IHits, ITotal} from "./IElasticSearchJson";

interface IJournal {
  nlm?: string,
  longname?: string,
  ISSNP?: string,
  ISSNE?: string,
}
interface IDate {
  year: number,
  month?: number,
  day?: number,
}
interface IAuthor {
  fullname?: string,
  initials?: string,
}
interface IDefinition {
  definition?: string,
}
interface IInstitute {
  institute?: string,
}
interface IBook {
  volume?: string,
  issue?: string,
  first_page?: string,
  last_page?: string,
}
interface IPubmedid {
  pubmed_id: number,
}
interface IPaper {
  paper?: string,
}
interface IModelPMC {
  journal: IJournal,
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
  book: IBook,
  Ref_ids?: IPubmedid[],
  References?: IPaper[],
}
interface IHitsPMC extends IHits{
  _index: string,
  _id: string,
  _score: number,
  _source: IModelPMC,
}
interface IPMCJson extends IElasticSearchJson, IModelGetter {
  total: ITotal,
  max_score: number,
  hits: IHitsPMC[],
  get_1D_sources(): IModel[],
}
export default class ModelPMCJson implements IPMCJson{
  hits: IHitsPMC[] = [];
  max_score: number = 0;
  total: ITotal = {
    value: 0,
    relation: "gte",
  };
  get_1D_sources(): IModel[] {
    let result: IModel[] = [];
    this.hits.forEach(element => {
      let model: IModel = {
        "Abstract": element._source.Abstract ?? "",
        "Affiliations": this.get_Affiliations(element._source),
        "Author_fullname": this.get_Author_fullname(element._source),
        "Author_initials": this.get_Author_initials(element._source),
        "Categories": element._source.Categories ?? "",
        "DOI": element._source.DOI ?? "",
        "Glossary": this.get_Glossary(element._source),
        "PMCID": element._source.PMCID,
        "PMID": element._source.PMID ?? 0,
        "Ref_ids": this.get_RefIds(element._source),
        "References": this.get_References(element._source),
        "Text_full": element._source.Text_full ?? "",
        "Title": element._source.Title ?? "",
        "book_first_page": element._source.book.first_page ?? "",
        "book_issue": element._source.book.issue ?? "",
        "book_last_page": element._source.book.last_page ?? "",
        "book_volume": element._source.book.volume ?? "",
        "date_day": element._source.date.day?.toString() ?? "",
        "date_epub": element._source.date_epub,
        "date_month": element._source.date.month?.toString() ?? "",
        "date_year": element._source.date.year.toString(),
        "journal_ISSNE": element._source.journal.ISSNE ?? "",
        "journal_ISSNP": element._source.journal.ISSNP ?? "",
        "journal_longname": element._source.journal.longname ?? "",
        "journal_nlm": element._source.journal.nlm ?? "",
      };
      result.push(model);
    });
    return result;
  }
  private get_Affiliations(model: IModelPMC): string {
    let result: string[] = [];
    model.Affiliations?.forEach(element => {
      if (element.institute != null) {
        result.push(element.institute);
      }
    });
    return result.join("; ");
  }
  private get_Author_fullname(model: IModelPMC): string {
    let result: string[] = [];
    model.Author?.forEach(element => {
      if (element.fullname != null) {
        result.push(element.fullname);
      }
    });
    return result.join(", ");
  }
  private get_Author_initials(model: IModelPMC): string {
    let result: string[] = [];
    model.Author?.forEach(element => {
      if (element.initials != null) {
        result.push(element.initials);
      }
    });
    return result.join(", ");
  }
  private get_Glossary(model: IModelPMC): string {
    let result: string[] = [];
    model.Glossary?.forEach(element => {
      if (element.definition != null) {
        result.push(element.definition);
      }
    });
    return result.join("; ");
  }
  private get_RefIds(model: IModelPMC): number[] {
    let result: number[] = [];
    model.Ref_ids?.forEach(element => {
      result.push(element.pubmed_id);
    });
    return result;
  }
  private get_References(model: IModelPMC): string[] {
    let result: string[] = [];
    model.References?.forEach(element => {
      if (element.paper != null) {
        result.push(element.paper);
      }
    });
    return result;
  }
}
