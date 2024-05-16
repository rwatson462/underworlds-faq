
export interface Question {
  id?: number,
  question: string,
  answer: string,
  source: string,
  cards: string[] | null,
  tags: string[] | null,
  entry_type: EntryType,
}

export type EntryType = 'faq'|'errata'
