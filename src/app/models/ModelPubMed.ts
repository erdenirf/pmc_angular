export default class ModelPubMed {
  PMID;
  PMCID;
  Title;
  Categories;
  date_epub;
  Abstract;
  Author_initials;
  Author_fullname;
  Affiliations;
  Text_full;
  Glossary;
  journal_nlm;
  journal_longname;
  journal_ISSNP;
  journal_ISSNE;
  DOI;
  book_volume;
  book_issue;
  book_first_page;
  book_last_page;
  date_year;
  date_month;
  date_day;
  Ref_ids;
  References;

  constructor({MedlineCitation, PubmedData, DateEntrez
  }: {
    MedlineCitation: any, PubmedData: any, DateEntrez: any
  }) {
    this.PMID = MedlineCitation.PMID;
    this.PMCID = this.getPMCID(PubmedData);
    this.Title = MedlineCitation.Article.ArticleTitle;
    this.Categories = this.getCategories(MedlineCitation);
    this.date_epub = DateEntrez;
    this.Abstract = this.getAbstract(MedlineCitation);
    this.Author_initials = this.getAuthorsInitials(MedlineCitation);
    this.Author_fullname = this.getAuthorsFullName(MedlineCitation);
    this.Affiliations = this.getAffiliations(MedlineCitation);
    this.Text_full = '';
    this.Glossary = this.getGlossary(MedlineCitation);
    this.journal_nlm = MedlineCitation.Article.Journal.ISOAbbreviation;
    this.journal_longname = MedlineCitation.Article.Journal.Title;
    this.journal_ISSNP = MedlineCitation.Article.Journal.ISSN_Print;
    this.journal_ISSNE = MedlineCitation.Article.Journal.ISSN_Electronic;
    this.DOI = this.getDOI(PubmedData);
    this.book_volume = MedlineCitation.Article.Journal.JournalIssue.Volume;
    this.book_issue = MedlineCitation.Article.Journal.JournalIssue.Issue;
    this.book_first_page = MedlineCitation.Article.Pagination;
    this.book_last_page = '';
    this.date_year = MedlineCitation.Article.Journal.JournalIssue.PubDate.Year;
    this.date_month = MedlineCitation.Article.Journal.JournalIssue.PubDate.Month;
    this.date_day = MedlineCitation.Article.Journal.JournalIssue.PubDate.Day;
    this.Ref_ids = this.getRefIds(PubmedData);
    this.References = this.getReferences(PubmedData);
  }

  getPMCID(PubmedData: any): string {
    PubmedData.ArticleIdList.forEach((articleID: any) => {
      if (articleID.IdType == 'pmc') {
        return articleID.text;
      }
    });
    return '';
  }

  getCategories(MedlineCitation: any) {
    var result: string[] = [];
    MedlineCitation.Article.PublicationTypeList.forEach((pubType: any) => {
      result.push(pubType.text);
    });
    return result.join(" ");
  }

  getAbstract(MedlineCitation:any) {
    var result: string[] = [];
    MedlineCitation.Article.AbstractText.forEach((it: any) => {
      result.push(it.text);
    });
    return result.join("\n");
  }

  getAuthorsInitials(MedlineCitation: any) {
    var result: string[] = [];
    MedlineCitation.Article.AuthorList.forEach((author: any) => {
      result.push(author.LastName + ' ' + author.Initials);
    });
    return result.join(", ");
  }

  getAuthorsFullName(MedlineCitation: any) {
    var result: string[] = [];
    MedlineCitation.Article.AuthorList.forEach((author: any) => {
      result.push(author.ForeName + ' ' + author.LastName);
    });
    return result.join(", ");
  }

  getAffiliations(MedlineCitation: any) {
    var result: string[] = [];
    MedlineCitation.Article.AuthorList.forEach((author: any) => {
      author.AffiliationInfo.forEach((item: any) => {
        if (result.indexOf(item.Affiliation) === -1) {
          result.push(item.Affiliation);
        }
      });
    });
    return result.join("; ");
  }

  getGlossary(MedlineCitation: any) {
    var result: string[] = [];
    MedlineCitation.KeywordList.forEach((keyword: any) => {
      result.push(keyword.text);
    });
    return result.join("; ");
  }

  getDOI(PubmedData: any) {
    PubmedData.ArticleIdList.forEach((articleID: any) => {
      if (articleID.IdType == 'doi') {
        return articleID.text;
      }
    });
    return '';
  }

  getRefIds(PubmedData: any) {
    var result: number[] = [];
    PubmedData.ReferenceList.forEach((ref: any) => {
      let pmid = 0;
      ref.ArticleIdList.forEach((articleID: any) => {
        if (articleID.IdType == 'pubmed') {
          pmid = articleID.text;
        }
      });
      if (pmid != 0) {
        result.push(pmid);
      }
    });
    return result;
  }

  getReferences(PubmedData: any) {
    var result: string[] = [];
    PubmedData.ReferenceList.forEach((ref: any) => {
      var pmid = 0;
      ref.ArticleIdList.forEach((articleID: any) => {
        if (articleID.IdType == 'pubmed') {
          pmid = articleID.text;
        }
      });
      if (pmid == 0) {
        result.push(ref.Citation);
      }
    });
    return result;
  }
}
