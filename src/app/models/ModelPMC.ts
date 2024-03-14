import {IAuthor, IBook, IDate, IDefinition, IInstitute, IJournal, IModelPMC, IPaper, IPubmedId} from "./IModelPMC";
import BaseModel, {BaseModelGetter} from "./BaseModel";

export class ModelPMC implements IModelPMC, BaseModelGetter {
  journal?: IJournal | undefined = undefined;
  PMID?: number | undefined = undefined;
  PMCID: string = '';
  DOI?: string | undefined = undefined;
  Title?: string | undefined = undefined;
  Author?: IAuthor[] | undefined = undefined;
  date: IDate = {
    year: 0,
    month: undefined,
    day: undefined,
  };
  date_epub: string = '0000-00-00';
  Abstract?: string | undefined = undefined;
  Text_full?: string | undefined = undefined;
  Glossary?: IDefinition[] | undefined = undefined;
  Categories?: string | undefined = undefined;
  Affiliations?: IInstitute[] | undefined = undefined;
  book?: IBook | undefined = undefined;
  Ref_ids?: IPubmedId[] | undefined = undefined;
  References?: IPaper[] | undefined = undefined;

  public convert(): BaseModel {
    return new BaseModel(
      this.Abstract ?? "",
      this.get_Affiliations(),
      this.get_Author_fullname(),
      this.get_Author_initials(),
      this.Categories ?? "",
      this.DOI ?? "",
      this.get_Glossary(),
      this.PMCID,
      this.PMID ?? 0,
      this.get_RefIds(),
      this.get_References(),
      this.Text_full ?? "",
      this.Title ?? "",
      this.book?.first_page ?? "",
      this.book?.issue ?? "",
      this.book?.last_page ?? "",
      this.book?.volume ?? "",
      this.date.day?.toString() ?? "",
      this.date_epub,
      this.date.month?.toString() ?? "",
      this.date.year.toString(),
      this.journal?.ISSNE ?? "",
      this.journal?.ISSNP ?? "",
      this.journal?.longname ?? "",
      this.journal?.nlm ?? "",
    );
  }
  private get_Affiliations(): string {
    let result: string[] = [];
    this.Affiliations?.forEach(element => {
      if (element.institute != null) {
        result.push(element.institute);
      }
    });
    return result.join("; ");
  }
  private get_Author_fullname(): string {
    let result: string[] = [];
    this.Author?.forEach(element => {
      if (element.fullname != null) {
        result.push(element.fullname);
      }
    });
    return result.join(", ");
  }
  private get_Author_initials(): string {
    let result: string[] = [];
    this.Author?.forEach(element => {
      if (element.initials != null) {
        result.push(element.initials);
      }
    });
    return result.join(", ");
  }
  private get_Glossary(): string {
    let result: string[] = [];
    this.Glossary?.forEach(element => {
      if (element.definition != null) {
        result.push(element.definition);
      }
    });
    return result.join("; ");
  }
  private get_RefIds(): number[] {
    let result: number[] = [];
    this.Ref_ids?.forEach(element => {
      result.push(element.pubmed_id);
    });
    return result;
  }
  private get_References(): string[] {
    let result: string[] = [];
    this.References?.forEach(element => {
      if (element.paper != null) {
        result.push(element.paper);
      }
    });
    return result;
  }
}
