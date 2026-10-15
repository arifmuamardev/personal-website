export const profile = {
  name: "Arif Mu'amar Wahid",
  displayName: "Arif Mu’amar Wahid",
  alternateName: 'Arif Muamar',
  title: 'PhD Student and Lecturer',
  phd: {
    role: 'PhD Student',
    institution: 'Kanazawa University',
    location: 'Kanazawa, Japan',
    school: 'Graduate School of Natural Science and Technology',
    division: 'Division of Electrical, Information and Communication Engineering',
    started: 'October 2025',
    status: 'In progress',
  },
  lecturer: {
    role: 'Lecturer',
    institution: 'Universitas Amikom Purwokerto',
    location: 'Purwokerto, Indonesia',
    department: 'Department of Informatics',
    faculty: 'Faculty of Computer Science',
  },
  emails: {
    primary: 'arif@amikompurwokerto.ac.id',
    kanazawa: 'arifmuamar@stu.kanazawa-u.ac.jp',
    personal: 'arif.muamar@gmail.com',
  },
  profiles: {
    scholar: 'https://scholar.google.com/citations?user=A6fWmZ8AAAAJ&hl=en',
    orcid: 'https://orcid.org/0009-0006-3450-4524',
    researchGate: 'https://www.researchgate.net/profile/Arif-Wahid-2',
    github: 'https://github.com/arifmuamardev',
  },
  scholarSnapshot: {
    asOf: '2026-10-15',
    source: 'Google Scholar profile figures copied by the profile owner on 15 October 2026; not automatically refreshed',
    citations: { all: 248, since2021: 247 },
    hIndex: { all: 10, since2021: 10 },
    i10Index: { all: 10, since2021: 10 },
  },
  researchFocus:
    'Plant bioelectric potentials (BEP), from signal acquisition and preprocessing to time-series machine learning and reproducible evaluation.',
  researchSummary:
    'I study plant bioelectric potentials (BEP), signal processing, and machine learning for biological time series, with an emphasis on reliable evaluation. My broader work includes data mining, educational analytics, and applied intelligent systems.',
  researchAreas: [
    'Plant bioelectric potentials and plant electrophysiology',
    'Machine learning for biological time-series data',
    'Signal processing, acquisition, and validation',
    'Transfer learning and domain adaptation',
    'Edge/IoT and multisensor environmental sensing',
    'Data mining, applied artificial intelligence, and educational analytics',
  ],
  education: [
    {
      degree: 'Doctoral studies (PhD in progress)',
      institution: 'Kanazawa University, Japan',
      period: 'Oct 2025–present',
      detail:
        'Graduate School of Natural Science and Technology; Division of Electrical, Information and Communication Engineering.',
      researchLabel: 'Research focus',
      research: 'Plant bioelectric potentials (BEP), signal processing, and time-series machine learning.',
    },
    {
      degree: 'Master of Computer Science',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: '2023–2025',
      detail: 'Completed master’s degree in computer science.',
      researchLabel: 'Thesis',
      research: 'Optimization of Feature Extraction Algorithm and Visual-Based Recommendation in Image-Based Website Theme Recommendation System with Transfer Learning.',
    },
    {
      degree: 'Bachelor of Mathematics Education',
      institution: 'Universitas Negeri Semarang, Indonesia',
      period: '2011–2016',
      detail: 'Completed undergraduate degree in mathematics education.',
      researchLabel: 'Undergraduate research',
      research: 'Effectiveness of probing-prompting learning with question cards for mathematical problem-solving ability.',
    },
  ],
  experience: [
    {
      role: 'Lecturer, Department of Informatics, Faculty of Computer Science',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: '2025–present',
      detail:
        'Teaching and student research support in informatics, including Data Science, Multivariate Analysis, Persuasive Technology, machine learning, and predictive analytics. On doctoral study in Japan under MEXT.',
    },
    {
      role: 'Staff, Educational Development and Quality Assurance Center',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: '2017–present',
      detail:
        'Study-program and institutional accreditation, academic program development, KPI monitoring, curriculum development, internal quality assurance and audit.',
    },
    {
      role: 'Teaching and Research Assistant',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: '2023–2024',
      detail:
        'Assisted Data Science, Multivariate Analysis, and Persuasive Technology teaching and student projects in analytics and machine learning.',
    },
  ],
  awards: [
    '2nd Place — Data Mining Competition, Indoneris National IT Competition (2024)',
    'MEXT Scholarship (2025)',
    'Amikom Purwokerto Foundation Scholarship (2023)',
    'Best Employee Award, Universitas Amikom Purwokerto (2020)',
    'Academic Development Program Scholarship (2013)',
  ],
} as const;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.alternateName,
  jobTitle: profile.title,
  affiliation: [
    {
      '@type': 'EducationalOrganization',
      name: profile.phd.institution,
      address: profile.phd.location,
    },
  ],
  worksFor: {
    '@type': 'EducationalOrganization',
    name: profile.lecturer.institution,
    address: profile.lecturer.location,
  },
  url: 'https://arifmuamar.com',
  sameAs: Object.values(profile.profiles),
  knowsAbout: profile.researchAreas,
};
