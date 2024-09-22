export const NthLabel = {
  All: 'All',
  Th16: '第16屆(2024)',
  Th15: '第15屆(2023)',
  Th14: '第14屆(2022)',
  Th13: '第13屆(2021)',
  Th12: '第12屆(2020)',
  Th11: '第11屆(2019',
  Th10: '第10屆(2018)',
  Th9: '第9屆(2017-2018)',
  Th8: '第8屆(2016-2017)',
  Th7: '第7屆(2014)',
  History: '第7屆(2014)前',
} as const;

export const NthKey = {
  All: '',
  Th16: '16th',
  Th15: '15th',
  Th14: '14th',
  Th13: '13th',
  Th12: '12th',
  Th11: '11th',
  Th10: '10th',
  Th9: '9th',
  Th8: '8th',
  Th7: '7th',
  History: 'history',
} as const;

export interface IronmanListInfo {
  nth: string;
  year: number | string;
  category: string;
  topic: string;
  topicUrl: string;
  author: string;
}
