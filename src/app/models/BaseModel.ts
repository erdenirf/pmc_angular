import {IBaseModel} from "./IBaseModel";

export default class BaseModel implements IBaseModel {
  Abstract: string;
  Affiliations: string;
  Author_fullname: string;
  Author_initials: string;
  Categories: string;
  DOI: string;
  Glossary: string;
  PMCID: string;
  PMID: number;
  Ref_ids: number[];
  References: string[];
  Text_full: string;
  Title: string;
  book_first_page: string;
  book_issue: string;
  book_last_page: string;
  book_volume: string;
  date_day: string;
  date_epub: string;
  date_month: string;
  date_year: string;
  journal_ISSNE: string;
  journal_ISSNP: string;
  journal_longname: string;
  journal_nlm: string;

  constructor(Abstract: string = '',
              Affiliations: string = '',
              Author_fullname: string = '',
              Author_initials: string = '',
              Categories: string = '',
              DOI: string = '',
              Glossary: string = '',
              PMCID: string = '',
              PMID: number = 0,
              Ref_ids: number[] = [],
              References: string[] = [],
              Text_full: string = '',
              Title: string = '',
              book_first_page: string = '',
              book_issue: string = '',
              book_last_page: string = '',
              book_volume: string = '',
              date_day: string = '',
              date_epub: string = '',
              date_month: string = '',
              date_year: string = '',
              journal_ISSNE: string = '',
              journal_ISSNP: string = '',
              journal_longname: string = '',
              journal_nlm: string = '')
  {
    this.Abstract = Abstract;
    this.Affiliations = Affiliations;
    this.Author_fullname = Author_fullname;
    this.Author_initials = Author_initials;
    this.Categories = Categories;
    this.DOI = DOI;
    this.Glossary = Glossary;
    this.PMCID = PMCID;
    this.PMID = PMID;
    this.Ref_ids = Ref_ids;
    this.References = References;
    this.Text_full = Text_full;
    this.Title = Title;
    this.book_first_page = book_first_page;
    this.book_issue = book_issue;
    this.book_last_page = book_last_page;
    this.book_volume = book_volume;
    this.date_day = date_day;
    this.date_epub = date_epub;
    this.date_month = date_month;
    this.date_year = date_year;
    this.journal_ISSNE = journal_ISSNE;
    this.journal_ISSNP = journal_ISSNP;
    this.journal_longname = journal_longname;
    this.journal_nlm = journal_nlm;
  }
}
export interface BaseModelGetter {
  convert(): BaseModel;
}
