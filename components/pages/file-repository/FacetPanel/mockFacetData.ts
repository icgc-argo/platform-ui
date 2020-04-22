const primarySites = [
  { key: 'Gall Bladder', doc_count: 587 },
  { key: 'Breast', doc_count: 525 },
  { key: 'Prostate', doc_count: 510 },
  { key: 'Brain', doc_count: 478 },
  { key: 'Liver', doc_count: 415 },
  { key: 'Eye', doc_count: 623 },
  { key: 'Bone', doc_count: 834 },
  { key: 'Cardiac', doc_count: 626 },
  { key: 'Colorectal', doc_count: 144 },
  { key: 'Skin', doc_count: 882 },
  { key: 'Bile Duct', doc_count: 573 },
  { key: 'Esophagus', doc_count: 221 },
];

const experimentalStrategies = [
  { key: 'WXS', doc_count: 878 },
  { key: 'WGS', doc_count: 900 },
  { key: 'RNA Seq', doc_count: 858 },
];

const vitalStatuses = [];

const programs = [];

const genders = [];
const dataTypes = [];
const ages = [];

export default {
  program: programs,
  'primary site': primarySites,
  'age at diagnosis': ages,
  'vital status': vitalStatuses,
  gender: genders,
  'experimental strategy': experimentalStrategies,
  'data type': dataTypes,
};
