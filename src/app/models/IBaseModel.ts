export interface IBaseModel {
  Abstract: string,
  Affiliations: string,
  Author_fullname: string,
  Author_initials: string,
  Categories: string,
  DOI: string,
  Glossary: string,
  PMCID: string,
  PMID: number,
  Ref_ids: number[],
  References: string[],
  Text_full: string,
  Title: string,
  book_first_page: string,
  book_issue: string,
  book_last_page: string,
  book_volume: string,
  date_day: string,
  date_epub: string,
  date_month: string,
  date_year: string,
  journal_ISSNE: string,
  journal_ISSNP: string,
  journal_longname: string,
  journal_nlm: string,
}
