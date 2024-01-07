export type Question = {
  id?: number,
  question: string,
  answer: string,
  source: string,
  cards: string[] | null,
  tags: string[] | null,
}
