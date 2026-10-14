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
  researchSummary:
    'My current doctoral research focuses on machine learning for plant bioelectric potential signals, with supporting interests in biological time-series analysis, multisensor sensing, and applied artificial intelligence.',
  researchAreas: [
    'Plant bioelectric potentials and plant electrophysiology',
    'Machine learning for biological time-series data',
    'Multisensor environmental sensing',
    'Applied artificial intelligence',
  ],
  education: [
    {
      degree: 'PhD Student',
      institution: 'Kanazawa University, Japan',
      period: 'Present',
      detail:
        'Graduate School of Natural Science and Technology; Division of Electrical, Information and Communication Engineering. MEXT Scholarship awardee.',
    },
    {
      degree: 'Master of Computer Science',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: '2025',
      detail:
        'Thesis: Optimization of Feature Extraction Algorithm and Visual-Based Recommendation in Image-Based Website Theme Recommendation System with Transfer Learning.',
    },
    {
      degree: 'Bachelor of Mathematics Education',
      institution: 'Universitas Negeri Semarang, Indonesia',
      period: '2016',
      detail:
        'Undergraduate thesis on the effectiveness of probing prompting learning assisted by question cards in students’ problem-solving ability.',
    },
  ],
  experience: [
    {
      role: 'Lecturer, Department of Informatics, Faculty of Computer Science',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: 'Current',
      detail:
        'Teaching and supporting academic activities in informatics; contributing to research and scholarly publication; and participating in academic development within the faculty.',
    },
    {
      role: 'Staff, Educational Development and Quality Assurance Center',
      institution: 'Universitas Amikom Purwokerto, Indonesia',
      period: '2017–present',
      detail:
        'Supports accreditation, curriculum development, institutional performance monitoring, and internal quality-assurance activities.',
    },
  ],
  awards: [
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
