/**
 * Public educational notes, adapted from the lecturer's 2026 Indonesian-language
 * Multivariate Analysis slides. These are concise study notes, not a slide-by-slide
 * transcription or a claim that the original PDF is already hosted.
 */
export interface LectureSection {
  title: string;
  slideRange: string;
  paragraphs: string[];
  points: string[];
}
export interface LectureLesson {
  number: string;
  slug: string;
  title: string;
  summary: string;
  slideCount: number;
  objectives: string[];
  sections: LectureSection[];
  reviewQuestions: string[];
  reading: { label: string; url?: string }[];
  slidesPdf?: string;
}
export interface LectureCourse {
  slug: string;
  title: string;
  program: string;
  institution: string;
  language: string;
  description: string;
  lessons: LectureLesson[];
}
export const lectureCourses: LectureCourse[] = [{
  slug: 'multivariate-analysis',
  title: 'Multivariate Analysis',
  program: 'Magister Ilmu Komputer',
  institution: 'Universitas Amikom Purwokerto',
  language: 'Bahasa Indonesia',
  description: 'Materi pembelajaran analisis multivariat dengan fokus awal pada Structural Equation Modeling (SEM), PLS-SEM, dan perancangan model penelitian.',
  lessons: [
    {
      number: '01',
      slug: '01',
      title: 'Pengantar Structural Equation Modeling (SEM) dan PLS-SEM',
      summary: 'Dari fenomena AI dalam e-commerce menuju pemahaman konstruk, indikator, model pengukuran, dan model struktural.',
      slideCount: 43,
      objectives: [
        'Menjelaskan perbedaan analisis univariat, bivariat, multivariat, SEM, dan PLS-SEM.',
        'Membedakan konstruk dan indikator serta fungsi model pengukuran dan model struktural.',
        'Membaca model konseptual dan hipotesis dari sebuah artikel penelitian.',
        'Menjelaskan pertimbangan memilih PLS-SEM tanpa bergantung semata pada perangkat lunak.',
      ],
      sections: [
        {
          title: 'Berawal dari masalah penelitian',
          slideRange: 'Slide 3–7',
          paragraphs: [
            'Contoh utama berasal dari penelitian tentang AI dalam pemasaran e-commerce. Penggunaan rekomendasi produk, chatbot, atau personalisasi belum dengan sendirinya menjelaskan kepuasan maupun kinerja usaha.',
            'Peneliti harus memisahkan pertanyaan deskriptif (siapa respondennya), pertanyaan hubungan (faktor apa yang berkaitan), dan pertanyaan model (jalur hubungan apa yang diajukan).',
          ],
          points: [
            'Penggunaan teknologi bukan jaminan keberhasilan bisnis.',
            'Pertanyaan penelitian menentukan metode analisis yang dibutuhkan.',
          ],
        },
        {
          title: 'Dari analisis multivariat menuju SEM',
          slideRange: 'Slide 8–16',
          paragraphs: [
            'Analisis univariat merangkum satu variabel; analisis bivariat menelaah hubungan dua variabel; sedangkan model multivariat dapat melibatkan banyak variabel sekaligus. Tidak semua persoalan multivariat membutuhkan SEM.',
            'SEM menggabungkan evaluasi pengukuran konstruk dengan hubungan antarkonstruk. PLS-SEM merupakan pendekatan analisis, sedangkan SmartPLS adalah perangkat lunak yang membantu estimasi.',
          ],
          points: [
            'Regresi, PCA, clustering, dan SEM menjawab jenis pertanyaan yang berbeda.',
            'Model pengukuran bertanya bagaimana indikator merepresentasikan konstruk.',
            'Model struktural bertanya apakah hubungan antarkonstruk didukung data.',
          ],
        },
        {
          title: 'Konstruk, indikator, dan hipotesis',
          slideRange: 'Slide 17–30',
          paragraphs: [
            'Studi kasus mengajukan enam konstruk: Technology Readiness (TR), AI in Marketing (AIM), Customer Experience (CE), Customer Satisfaction (CS), Customer Performance (CP), dan Financial Performance (FP).',
            'Konstruk adalah konsep teoritis; indikator adalah item atau variabel teramati yang digunakan untuk merepresentasikannya. Definisi konstruk, bunyi item, dan siapa yang menjawab kuesioner harus konsisten.',
          ],
          points: [
            'H1: TR → CS; H2: CE → CS; H3: AIM → CS.',
            'H4: AIM → CP; H5: AIM → FP; H6: CS → FP.',
            'Panah pada diagram menyatakan hipotesis, bukan bukti sebab-akibat.',
          ],
        },
        {
          title: 'PLS-SEM, mediasi, dan interpretasi',
          slideRange: 'Slide 31–41',
          paragraphs: [
            'Jalur langsung AIM → FP dan jalur tidak langsung AIM → CS → FP mengilustrasikan struktur mediasi yang dapat dianalisis. Mediasi statistik saja belum memastikan mekanisme kausal.',
            'Pada hasil H3 di artikel, koefisien jalur terstandarisasi β = 0,566 dan t = 4,572 dilaporkan mendukung hubungan AIM → CS. Nilai β itu bukan pernyataan bahwa kepuasan meningkat 56,6 persen akibat AI.',
          ],
          points: [
            'Pemilihan CB-SEM atau PLS-SEM harus mempertimbangkan tujuan, teori, dan model pengukuran.',
            'Ukuran sampel kecil, data tidak normal, atau keinginan mendapatkan hasil signifikan bukan justifikasi tunggal memilih PLS-SEM.',
            'Survei observasional lintas-seksi membatasi inferensi kausal dan generalisasi.',
          ],
        },
      ],
      reviewQuestions: [
        'Mengapa penelitian yang memakai banyak variabel tidak otomatis membutuhkan SEM?',
        'Bagaimana membedakan konstruk, indikator, dan hipotesis dalam suatu model?',
        'Mengapa koefisien β = 0,566 tidak boleh dibaca sebagai kenaikan 56,6 persen yang disebabkan oleh AI?',
      ],
      reading: [
        { label: 'Hariguna et al. (2026), artikel studi kasus', url: 'https://doi.org/10.55164/ajstr.v29i1.258998' },
        { label: 'Hair et al. (2021), A Primer on Partial Least Squares Structural Equation Modeling (3rd ed.)' },
      ],
    },
    {
      number: '02',
      slug: '02',
      title: 'Konstruk, Indikator, Hipotesis, dan Model Konseptual',
      summary: 'Menurunkan model penelitian dari research gap, teori, operasionalisasi konstruk, dan argumen hipotesis.',
      slideCount: 46,
      objectives: [
        'Memperjelas masalah penelitian, pertanyaan riset, dan research gap.',
        'Membedakan konstruk laten, dimensi, indikator, dan item pertanyaan.',
        'Menjelaskan logika pengukuran reflektif dan formatif/komposit.',
        'Menyusun hipotesis berbasis literatur dan merancang model konseptual.',
      ],
      sections: [
        {
          title: 'Dari fenomena ke research gap',
          slideRange: 'Slide 3–10',
          paragraphs: [
            'Riset sebaiknya dimulai dengan persoalan yang terfokus: aspek teknologi apa, hasil apa, kelompok responden mana, dan teori apa yang relevan. Research gap harus dijelaskan melalui perbandingan literatur, bukan hanya asumsi bahwa topiknya baru.',
          ],
          points: [
            'Gap dapat bersifat teoretis, empiris, kontekstual, atau terkait pengukuran.',
            'Responden studi kasus adalah pemilik usaha e-commerce yang menggunakan AI, bukan sampel pelanggan langsung.',
            'Alur rancangan: fenomena → gap → pertanyaan penelitian → teori → konstruk → indikator → hipotesis → model.',
          ],
        },
        {
          title: 'Konstruk laten, dimensi, dan item',
          slideRange: 'Slide 11–20',
          paragraphs: [
            'Variabel teramati dapat dicatat langsung, sedangkan konstruk laten perlu didefinisikan secara teoretis dan direpresentasikan melalui indikator yang sesuai. Definisi konseptual menjelaskan arti konsep; definisi operasional menjelaskan bagaimana konsep diukur.',
            'Technology Readiness dibahas melalui optimism, innovativeness, discomfort, dan insecurity. Ketika suatu konstruk memiliki beberapa dimensi, spesifikasi pengukuran perlu ditetapkan dengan hati-hati.',
          ],
          points: [
            'Satu item kuesioner sebaiknya mengukur satu gagasan secara jelas.',
            'Penyesuaian indikator dari penelitian lain harus menjaga makna konstruk dan sumbernya.',
            'Pengkodean skala, item berarah negatif, dan data kosong perlu diperiksa sebelum analisis.',
          ],
        },
        {
          title: 'Reflektif dan formatif/komposit',
          slideRange: 'Slide 21–25',
          paragraphs: [
            'Pada spesifikasi reflektif, perubahan konstruk diasumsikan tercermin pada indikatornya. Dalam spesifikasi formatif/komposit, komponen membentuk atau mendefinisikan konsep sehingga satu komponen bisa memiliki makna yang tidak tergantikan.',
            'Penetapan arah pengukuran didasarkan pada teori dan definisi konstruk, bukan secara otomatis pada penggunaan skala Likert atau keputusan perangkat lunak.',
          ],
          points: [
            'Periksa apakah indikator seharusnya berubah bersama dan apakah penghapusan satu item mengubah makna konstruk.',
            'Audit kesesuaian unit analisis: item berlabel Customer Satisfaction perlu ditafsirkan berdasarkan siapa respondennya.',
          ],
        },
        {
          title: 'Dari literatur menjadi hipotesis',
          slideRange: 'Slide 26–36',
          paragraphs: [
            'Teori memberikan alasan untuk mengajukan hubungan antarkonstruk. Contoh landasan yang diperkenalkan adalah TAM, UTAUT, TRI, dan TOE; PLS-SEM sendiri bukan teori adopsi teknologi.',
            'Hipotesis perlu menyebut konstruk, hubungan yang diperkirakan, konteks, serta alasan dari literatur. Panah konseptual bukan hasil pengujian maupun bukti sebab-akibat.',
          ],
          points: [
            'Buat matriks literatur yang mencatat konteks, definisi konstruk, indikator, dan hasil yang relevan.',
            'Bedakan prediktor, outcome, mediator, dan moderator dalam model.',
          ],
        },
        {
          title: 'Merancang dan memeriksa model konseptual',
          slideRange: 'Slide 37–44',
          paragraphs: [
            'Model studi kasus memuat enam konstruk dan enam hipotesis. Mahasiswa kemudian diminta mempertimbangkan model latihan yang lebih sederhana, misalnya PU → ATT → BI, untuk mempelajari hubungan konstruk serta indikator.',
            'Sebelum mengimpor model ke SmartPLS, tinjau kembali definisi konsep, landasan tiap panah, kesesuaian indikator, responden, dan kecukupan rancangan sampel.',
          ],
          points: [
            'Setiap panah harus dapat dipertanggungjawabkan menggunakan teori dan literatur.',
            'Diagram, hipotesis, dan instrumen harus konsisten satu sama lain.',
          ],
        },
      ],
      reviewQuestions: [
        'Bagaimana membuktikan bahwa suatu research gap benar-benar ada?',
        'Apa pertimbangan konseptual ketika memilih pengukuran reflektif atau formatif?',
        'Apa risiko jika sebuah konstruk Customer Satisfaction dijelaskan sebagai suara pelanggan padahal respondennya pemilik usaha?',
      ],
      reading: [
        { label: 'Hariguna et al. (2026), artikel studi kasus', url: 'https://doi.org/10.55164/ajstr.v29i1.258998' },
        { label: 'MacKenzie, Podsakoff, & Podsakoff (2011), construct measurement', url: 'https://aisel.aisnet.org/misq/vol35/iss2/5/' },
        { label: 'Jarvis, MacKenzie, & Podsakoff (2003), measurement model specification', url: 'https://doi.org/10.1086/376806' },
      ],
    },
  ],
}];

export const lectureCourse = lectureCourses[0];
