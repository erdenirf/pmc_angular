import {IMedlineCitation, IModelPubmed, IPubmedData} from "./IModelPubmed";
import BaseModel, {BaseModelGetter} from "./BaseModel";

export class ModelPubmed implements IModelPubmed, BaseModelGetter {

  MedlineCitation: IMedlineCitation = {
    PMID: 0,
    DateRevised: {
      Year: "",
      Month: "",
      Day: "",
    },
    Article: {
      Journal: {
        ISOAbbreviation: "",
        Title: "",
        JournalIssue: {
          PubDate: { }
        }
      },
      ArticleTitle: "",
      PublicationTypeList: []
    },
    MedlineJournalInfo: {
      MedlineTA: "",
      NlmUniqueID: ""
    },
  };
  PubmedData: IPubmedData = {
    ArticleIdList: [],
    History: []
  };
  DateEntrez: string = '0000-00-00';
  convert(): BaseModel {
    return new BaseModel(
      this.get_Abstract(),
      this.get_Affiliations(),
      this.get_Author_fullname(),
      this.get_Author_initials(),
      this.get_Categories(),
      this.get_DOI(),
      this.get_Glossary(),
      this.get_PMCID(),
      this.MedlineCitation.PMID,
      this.get_RefIds(),
      this.get_References(),
      "",
      this.MedlineCitation.Article.ArticleTitle,
      this.MedlineCitation.Article.Pagination ?? "",
      this.MedlineCitation.Article.Journal.JournalIssue.Issue ?? "",
      "",
      this.MedlineCitation.Article.Journal.JournalIssue.Volume ?? "",
      this.MedlineCitation.Article.Journal.JournalIssue.PubDate.Day ?? "",
      this.DateEntrez,
      this.MedlineCitation.Article.Journal.JournalIssue.PubDate.Month ?? "",
      this.MedlineCitation.Article.Journal.JournalIssue.PubDate.Year ?? "",
      this.MedlineCitation.Article.Journal.ISSN_Electronic ?? "",
      this.MedlineCitation.Article.Journal.ISSN_Print ?? "",
      this.MedlineCitation.Article.Journal.Title,
      this.MedlineCitation.Article.Journal.ISOAbbreviation,
    );
  }
  private get_Abstract(): string {
    let result: string[] = [];
    this.MedlineCitation.Article.AbstractText?.forEach(it => {
      result.push(it.text);
    });
    return result.join("\n");
  }
  private get_Affiliations(): string {
    let result: string[] = [];
    this.MedlineCitation.Article.AuthorList?.forEach(author => {
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
  private get_Author_fullname(): string {
    let result: string[] = [];
    this.MedlineCitation.Article.AuthorList?.forEach(author => {
      result.push(author.ForeName + ' ' + author.LastName);
    });
    return result.join(", ");
  }
  private get_Author_initials(): string {
    let result: string[] = [];
    this.MedlineCitation.Article.AuthorList?.forEach(author => {
      result.push(author.LastName + ' ' + author.Initials);
    });
    return result.join(", ");
  }
  private get_Categories(): string {
    let result: string[] = [];
    this.MedlineCitation.Article.PublicationTypeList.forEach(pubType => {
      result.push(pubType.text);
    });
    return result.join(" ");
  }
  private get_DOI(): string {
    for (let articleID of this.PubmedData.ArticleIdList) {
      if (articleID.IdType === 'doi') {
        return articleID.text;
      }
    }
    return '';
  }
  private get_Glossary(): string {
    let result: string[] = [];
    this.MedlineCitation.KeywordList?.forEach(keyword => {
      if (keyword.text != null) {
        result.push(keyword.text);
      }
    });
    return result.join("; ");
  }
  private get_PMCID(): string {
    for (let articleID of this.PubmedData.ArticleIdList) {
      if (articleID.IdType === 'pmc') {
        return articleID.text;
      }
    }
    return '';
  }
  private get_RefIds(): number[] {
    let result: number[] = [];
    this.PubmedData.ReferenceList?.forEach(ref => {
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
  private get_References(): string[] {
    let result: string[] = [];
    this.PubmedData.ReferenceList?.forEach(ref => {
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
