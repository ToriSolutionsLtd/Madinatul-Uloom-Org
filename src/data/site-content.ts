export type Locale = 'en' | 'bn' | 'ar';

export type SiteContent = {
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      location: string;
      ctaPrimary: string;
      ctaSecondary: string;
      prospectusLabel: string;
    };
    highlights: {
      title: string;
      items: { title: string; description: string }[];
    };
    divisions: {
      title: string;
      subtitle: string;
      items: { id: string; title: string; description: string }[];
    };
    policies: {
      title: string;
      visiting: { title: string; items: string[] };
      holidays: { title: string; items: string[]; note: string };
    };
    campus: {
      title: string;
      subtitle: string;
      cta: string;
    };
    contactCta: {
      title: string;
      description: string;
      button: string;
    };
    donation: {
      title: string;
      description: string;
      button: string;
      headline: string;
      headlineAccent: string;
      supporting: string;
      badges: string[];
      tipTitle: string;
      note: string;
      bank: {
        title: string;
        accountNameLabel: string;
        accountName: string;
        coLabel: string;
        co: string;
        bankNameLabel: string;
        bankName: string;
        accountNumberLabel: string;
        accountNumber: string;
        branchLabel: string;
        branch: string;
        routingNumberLabel: string;
        routingNumber: string;
        accountTypeLabel: string;
        accountType: string;
      };
      bkash: {
        title: string;
        numberLabel: string;
        number: string;
        typeLabel: string;
        type: string;
      };
    };
  };
  about: {
    title: string;
    missionTitle: string;
    mission: string;
    objectivesTitle: string;
    objectives: string[];
    chairmanTitle: string;
    chairmanMessage: string;
    historyTitle: string;
    history: string;
    visionTitle: string;
    vision: string;
  };
  programs: {
    title: string;
    subtitle: string;
    divisionsTitle: string;
    divisions: {
      id: string;
      title: string;
      summary: string;
      meta: { label: string; value: string }[];
      features: string[];
      image: string;
      imageAlt: string;
    }[];
    syllabusTitle: string;
    syllabusSubtitle: string;
    syllabusImages: { src: string; alt: string; caption: string }[];
    academicTitle: string;
    academicItems: string[];
  };
  campus: {
    title: string;
    subtitle: string;
    facilitiesTitle: string;
    facilities: string[];
    galleryTitle: string;
    gallerySubtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    addressLabel: string;
    addressLines: string[];
    phonesLabel: string;
    phones: { label: string; value: string }[];
    emailLabel: string;
    email: string;
    hoursLabel: string;
    hours: string[];
    mapLabel: string;
    mapQuery: string;
  };
};

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    home: {
      hero: {
        badge: 'Madinatul Uloom • Lalmonirhat',
        title: 'Qur’an & Sunnah Based Education for a Faithful Generation',
        subtitle:
          'A community-centered Islamic institution nurturing faith, character, and knowledge for boys and girls.',
        location: 'Madrasa Road, Khatapara, Lalmonirhat, Bangladesh',
        ctaPrimary: 'Donate Now',
        ctaSecondary: 'Explore Programs',
        prospectusLabel: 'Download Prospectus (PDF)',
      },
      highlights: {
        title: 'Quick Highlights',
        items: [
          { title: 'Residential', description: 'Safe boarding with structured routine.' },
          { title: 'Non-residential', description: 'Day scholar options available.' },
          { title: 'Day-care', description: 'Supportive care for young learners.' },
          { title: 'Boys & Girls', description: 'Separate branches and learning spaces.' },
        ],
      },
      divisions: {
        title: 'Academic Divisions',
        subtitle: 'Foundational to advanced learning pathways.',
        items: [
          {
            id: 'nurani',
            title: 'Nurani Academy (Maktab-Nazera)',
            description: 'Strong foundation in Qaida, Nazera, and daily Islamic practice.',
          },
          {
            id: 'madrasa',
            title: 'Madrasa (Arabic/Nazera)',
            description: 'Balanced Arabic, Quran, and general education curriculum.',
          },
          {
            id: 'hifz',
            title: 'Hifz Division',
            description: 'Full-time Quran memorization with Tajweed and discipline.',
          },
          {
            id: 'qirat',
            title: 'Qirat Division (Madani Nizam)',
            description: 'Advanced Qirat studies aligned with national curriculum.',
          },
        ],
      },
      policies: {
        title: 'Key Policies',
        visiting: {
          title: 'Visiting Hours',
          items: [
            'Daily: Asr to Maghrib',
            'Friday: 9:30 AM to Maghrib',
            'Phone contact only within visiting hours',
          ],
        },
        holidays: {
          title: 'Holiday Snapshot',
          items: [
            'Government holidays: classes closed',
            'Mid-term break: 7 days (approx.)',
            'Annual exam break: 7 days (approx.)',
            'Eid holidays: 10 days each',
          ],
          note: 'Schedules can change based on need and circumstances.',
        },
      },
      campus: {
        title: 'Campus & Facilities',
        subtitle:
          'Green, secure, and student-friendly spaces with academic and residential support.',
        cta: 'View Campus',
      },
      contactCta: {
        title: 'Admissions & Contact',
        description: 'Call or visit us for admission guidance and campus visits.',
        button: 'Contact Us',
      },
      donation: {
        title: 'Support the Mission',
        description: 'Your donation helps sustain education, student care, and campus development.',
        button: 'Donate Now',
        headline: 'Support Your Madrasah.',
        headlineAccent: 'Build Your Akhirah.',
        supporting:
          'Your generous contributions help us maintain the madrasah, provide educational programs, and support those in need within our community.',
        badges: ['Verified bank accounts', 'Receipts available'],
        tipTitle: 'Donation tips',
        note: 'Include your name in the transfer note so we can issue a receipt quickly.',
        bank: {
          title: 'Bank account',
          accountNameLabel: 'Account name',
          accountName: 'Madinatul Uloom Lalmonirhat',
          coLabel: 'C/O',
          co: 'Zillur Rahman',
          bankNameLabel: 'Bank',
          bankName: 'Sonali Bank LLC',
          accountNumberLabel: 'Account number',
          accountNumber: '34196296',
          branchLabel: 'Branch',
          branch: 'Lalmonirhat Branch',
          routingNumberLabel: 'Routing number',
          routingNumber: '52100',
          accountTypeLabel: 'Account type',
          accountType: 'Checking',
        },
        bkash: {
          title: 'bKash',
          numberLabel: 'Number',
          number: '+8801774641393',
          typeLabel: 'Payment type',
          type: 'Personal',
        },
      },
    },
    about: {
      title: 'About Madinatul Uloom',
      missionTitle: 'Mission',
      mission:
        'To build a Quran- and Sunnah-based life and society, revive the honor of Islam through knowledge and practice, and nurture spiritual, moral, intellectual, and social excellence for Allah’s pleasure.',
      objectivesTitle: 'Objectives',
      objectives: [
        'Provide authentic Islamic education with strong character building.',
        'Combine Islamic learning with essential modern knowledge.',
        'Cultivate discipline, adab, and community responsibility.',
        'Prepare students for service to faith and society.',
      ],
      chairmanTitle: "Mutawalli's Message",
      chairmanMessage:
        'Honorable guardians!\n\nYou may choose the “Madinatul Uloom Foundation” to build a bright future for your child and to raise them upon firm, true Islamic ideals.\n\nWe have a well-organized process for nurturing your child. In this institution, our school’s ideals and care will guide them to grow gradually, in shaa Allah.\n\nWith your prayers, we believe that all our plans can be successfully implemented by the mercy of Almighty Allah and through the advice and prayers of respected guardians and well-wishers, in shaa Allah. If a student becomes a true human being and is able to bring honor to society and the nation, then our collective effort will be successful. May Allah accept all our work and grant us steadfastness with Islam. Ameen!\n\nIn need of your dua\nValiant freedom fighter Alhaj Dilwar Rahman\nFounder Mutawalli,\nMadinatul Uloom Foundation.',
      historyTitle: 'History',
      history:
        'Madinatul Uloom was founded to serve the people of Lalmonirhat with quality Islamic education. It has grown into a multi-division institution with residential and non-residential programs.',
      visionTitle: 'Vision',
      vision:
        'To be a model Islamic institution that produces knowledgeable, disciplined, and service-minded graduates.',
    },
    programs: {
      title: 'Programs & Divisions',
      subtitle: 'Structured learning from foundational to advanced levels.',
      divisionsTitle: 'Division Details',
      divisions: [
        {
          id: 'nurani',
          title: 'Nurani Academy (Maktab-Nazera)',
          summary: 'A foundational program covering Qaida, Nazera, daily duas, and Islamic basics.',
          meta: [
            { label: 'Age', value: 'Minimum 8 years' },
            { label: 'Duration', value: '1 year' },
            { label: 'Admission', value: 'Open year-round' },
            { label: 'Eligibility', value: 'At least Class 2 pass' },
          ],
          features: [
            'Qaida & Nazera completion within one year',
            'Tajweed-based recitation practice',
            'Daily duas and practical fiqh',
            'Basic Arabic and Bengali literacy',
          ],
          image: '/images/academics/division-nurani.jpg',
          imageAlt: 'Students studying the Quran together',
        },
        {
          id: 'madrasa',
          title: 'Madrasa (Arabic/Nazera)',
          summary:
            'Balanced Arabic, Quran, and general subjects with a strong Islamic environment.',
          meta: [
            { label: 'Focus', value: 'Arabic, Quran, and general studies' },
            { label: 'Track', value: 'Nazera & academic foundations' },
            { label: 'Environment', value: 'Residential & disciplined' },
          ],
          features: [
            'Arabic, Bangla, English, and Math support',
            'Adab, akhlaq, and Islamic etiquette training',
            'Health and wellbeing support for students',
            'CCTV security and smart education management',
          ],
          image: '/images/cards/madrasa-bg.jpg',
          imageAlt: 'Madrasa program visual',
        },
        {
          id: 'hifz',
          title: 'Hifz Division',
          summary: 'Full-time Quran memorization with structured guidance and strong discipline.',
          meta: [
            { label: 'Age', value: 'Minimum 13 years' },
            { label: 'Duration', value: '3 years' },
            { label: 'Admission', value: 'Open year-round' },
            { label: 'Eligibility', value: 'Class 3 pass & complete Nazera' },
          ],
          features: [
            'Tajweed-focused memorization',
            'Daily revision and sabak tracking',
            'Duas, adab, and prayer discipline',
            'General studies up to Class 3 level',
          ],
          image: '/images/academics/division-hifz.jpg',
          imageAlt: 'Student reading the Quran',
        },
        {
          id: 'qirat',
          title: 'Qirat Division (Madani Nizam)',
          summary:
            'Advanced Qirat studies aligned with the national curriculum and Islamic sciences.',
          meta: [
            { label: 'Duration', value: '7 years' },
            { label: 'Academic Year', value: 'Shawwal to Ramadan' },
            { label: 'Eligibility', value: 'Complete Quran, fluent Nazera, basic Bengali' },
          ],
          features: [
            'Qirat specialization with depth and practice',
            'Arabic language and Islamic studies integration',
            'Board exam preparation and certification',
          ],
          image: '/images/academics/division-qirat.jpg',
          imageAlt: 'Open Quran with prayer beads',
        },
      ],
      syllabusTitle: 'Grade-wise Syllabus',
      syllabusSubtitle: 'Pre-primary to primary and Qirat year plan.',
      syllabusImages: [
        {
          src: '/images/academics/syllabus-primary-1.png',
          alt: 'Primary syllabus table (part 1)',
          caption: 'Pre-nursery to Class 4 (overview)',
        },
        {
          src: '/images/academics/syllabus-primary-2.png',
          alt: 'Primary syllabus table (part 2)',
          caption: 'Class 5 to Class 8 (overview)',
        },
        {
          src: '/images/academics/syllabus-qirat.png',
          alt: 'Qirat division year plan',
          caption: 'Qirat (Madani Nizam) year-wise plan',
        },
      ],
      academicTitle: 'Academic Year & Calendar',
      academicItems: [
        'Academic year follows the Islamic calendar: Shawwal to Ramadan.',
        'Admission remains open throughout the year based on capacity.',
        'Monthly assessments with short breaks after exams.',
        'Schedule can adjust based on academic and community needs.',
      ],
    },
    campus: {
      title: 'Campus & Facilities',
      subtitle:
        'A safe, green campus with residential and academic infrastructure for holistic learning.',
      facilitiesTitle: 'Facilities & Support',
      facilities: [
        'Residential hostel with structured daily routine',
        'Classrooms designed for focused learning',
        'CCTV surveillance and security staff',
        'Smart education management system',
        'Health and wellbeing support',
        'Prayer halls and quiet study areas',
      ],
      galleryTitle: 'Campus Gallery',
      gallerySubtitle: 'Current campus and proposed buildings.',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Reach out for admissions, campus visits, and information.',
      addressLabel: 'Address',
      addressLines: ['Madrasa Road, Khatapara', 'Lalmonirhat, Bangladesh'],
      phonesLabel: 'Phone',
      phones: [
        { label: 'Madrasa Office', value: '01717 184 187' },
        { label: 'Boys & Girls Branch (Khatapara)', value: '01814 560 964' },
        { label: 'Atabil Branch', value: '01814 560 968' },
        { label: 'Accounts', value: '01814 560 965' },
      ],
      emailLabel: 'Email',
      email: 'madinatululoomlal.bd@gmail.com',
      hoursLabel: 'Visiting Hours',
      hours: [
        'Daily: Asr to Maghrib',
        'Friday: 9:30 AM to Maghrib',
        'Phone contact within visiting hours',
      ],
      mapLabel: 'Map',
      mapQuery: 'Madinatul Uloom Lalmonirhat',
    },
  },
  bn: {
    home: {
      hero: {
        badge: 'মদিনাতুল উলুম • লালমনিরহাট',
        title: 'কুরআন ও সুন্নাহভিত্তিক শিক্ষায় আলোকিত প্রজন্ম',
        subtitle:
          'একটি ইসলামিক শিক্ষা প্রতিষ্ঠান—ঈমান, চরিত্র ও জ্ঞানের সমন্বয়ে ছেলে ও মেয়েদের গড়ে তোলে।',
        location: 'মাদরাসা রোড, খাতাপাড়া, লালমনিরহাট, বাংলাদেশ',
        ctaPrimary: 'এখনই দান করুন',
        ctaSecondary: 'প্রোগ্রাম দেখুন',
        prospectusLabel: 'প্রসপেক্টাস ডাউনলোড করুন (PDF)',
      },
      highlights: {
        title: 'সংক্ষিপ্ত তথ্য',
        items: [
          { title: 'আবাসিক', description: 'নিরাপদ আবাসিক ব্যবস্থা ও নিয়মিত রুটিন।' },
          { title: 'অনাবাসিক', description: 'ডে-স্কলার সুবিধা রয়েছে।' },
          { title: 'ডে-কেয়ার', description: 'ছোটদের জন্য বিশেষ তত্ত্বাবধান।' },
          { title: 'ছেলে ও মেয়ে', description: 'আলাদা শাখা ও শেখার পরিবেশ।' },
        ],
      },
      divisions: {
        title: 'বিভাগসমূহ',
        subtitle: 'প্রাথমিক থেকে উচ্চতর পর্যায়ে শিক্ষার পথ।',
        items: [
          {
            id: 'nurani',
            title: 'নূরানী একাডেমী (মক্তব-নাজেরা)',
            description: 'কায়দা-নাজেরা, দোয়া ও দ্বীনি বুনিয়াদ।',
          },
          {
            id: 'madrasa',
            title: 'মাদরাসা (আরবি/নাজেরা)',
            description: 'আরবি, কুরআন ও সাধারণ শিক্ষার সমন্বয়।',
          },
          {
            id: 'hifz',
            title: 'হিফজ বিভাগ',
            description: 'তাজওয়ীদসহ কুরআন হিফজের বিশেষ পাঠ।',
          },
          {
            id: 'qirat',
            title: 'কিরাত বিভাগ (মাদানী নেসাব)',
            description: 'উচ্চতর কিরাত শিক্ষা ও একাডেমিক সমন্বয়।',
          },
        ],
      },
      policies: {
        title: 'গুরুত্বপূর্ণ নীতিমালা',
        visiting: {
          title: 'সাক্ষাৎ সময়',
          items: [
            'প্রতিদিন আসর থেকে মাগরিব পর্যন্ত',
            'শুক্রবার সকাল ৯:৩০ টা থেকে মাগরিব পর্যন্ত',
            'মোবাইল যোগাযোগ নির্ধারিত সময়ে',
          ],
        },
        holidays: {
          title: 'ছুটির সংক্ষিপ্ত তালিকা',
          items: [
            'সরকার ঘোষিত (বিশেষ) ছুটিতে ক্লাস বন্ধ',
            'প্রথম সাময়িক পরীক্ষার ছুটি প্রায় ৭ দিন',
            'বার্ষিক পরীক্ষার ছুটি প্রায় ৭ দিন',
            'ঈদুল ফিতর ও ঈদুল আযহার ছুটি ১০ দিন করে',
          ],
          note: 'সময় ও প্রয়োজন অনুযায়ী পরিবর্তন হতে পারে।',
        },
      },
      campus: {
        title: 'ক্যাম্পাস ও সুবিধাসমূহ',
        subtitle: 'নিরাপদ ও পরিচ্ছন্ন পরিবেশে শিক্ষা ও আবাসিক সুবিধা।',
        cta: 'ক্যাম্পাস দেখুন',
      },
      contactCta: {
        title: 'ভর্তি ও যোগাযোগ',
        description: 'ভর্তি সংক্রান্ত তথ্য ও ক্যাম্পাস ভিজিটের জন্য যোগাযোগ করুন।',
        button: 'যোগাযোগ করুন',
      },
      donation: {
        title: 'সহযোগিতায় এগিয়ে আসুন',
        description: 'আপনার দান শিক্ষার্থীদের শিক্ষা, পরিচর্যা ও ক্যাম্পাস উন্নয়নে সহায়তা করে।',
        button: 'এখনই দান করুন',
        headline: 'আপনার মাদরাসাকে সহায়তা করুন।',
        headlineAccent: 'আখিরাত গড়ে তুলুন।',
        supporting:
          'আপনার উদার অনুদান মাদরাসা রক্ষণাবেক্ষণ, শিক্ষা কার্যক্রম পরিচালনা এবং সমাজের অসহায়দের সহায়তায় ব্যবহৃত হয়।',
        badges: ['যাচাইকৃত ব্যাংক অ্যাকাউন্ট', 'রসিদ প্রদান করা হয়'],
        tipTitle: 'দান নির্দেশনা',
        note: 'রসিদ দ্রুত পেতে ট্রান্সফার নোটে আপনার নাম লিখুন।',
        bank: {
          title: 'ব্যাংক অ্যাকাউন্ট',
          accountNameLabel: 'অ্যাকাউন্ট নাম',
          accountName: 'মদিনাতুল উলুম লালমনিরহাট',
          coLabel: 'সি/ও',
          co: 'জিল্লুর রহমান',
          bankNameLabel: 'ব্যাংক',
          bankName: 'সোনালী ব্যাংক এলএলসি',
          accountNumberLabel: 'অ্যাকাউন্ট নম্বর',
          accountNumber: '৩৪১৯৬২৯৬',
          branchLabel: 'শাখা',
          branch: 'লালমনিরহাট শাখা',
          routingNumberLabel: 'রাউটিং নম্বর',
          routingNumber: '৫২১০০',
          accountTypeLabel: 'অ্যাকাউন্ট টাইপ',
          accountType: 'চেকিং',
        },
        bkash: {
          title: 'বিকাশ',
          numberLabel: 'নম্বর',
          number: '+৮৮০১৭৭৭৪৬৪১৩৯৩',
          typeLabel: 'পেমেন্ট টাইপ',
          type: 'পার্সোনাল',
        },
      },
    },
    about: {
      title: 'আমাদের সম্পর্কে',
      missionTitle: 'আমাদের লক্ষ্য',
      mission:
        'কুরআন ও সুন্নাহভিত্তিক জীবন ও সমাজ গঠন, বিশুদ্ধ ইসলামের প্রচার, এবং দৈহিক-মানসিক-আধ্যাত্মিক উন্নয়নের মাধ্যমে আল্লাহর সন্তুষ্টি অর্জন।',
      objectivesTitle: 'উদ্দেশ্যসমূহ',
      objectives: [
        'সহীহ ইসলামি শিক্ষা ও চরিত্র গঠন',
        'ইসলামি ও আধুনিক জ্ঞানের সমন্বয়',
        'শৃঙ্খলা, আদব ও দায়িত্ববোধ সৃষ্টি',
        'দ্বীন ও সমাজসেবায় প্রস্তুত করা',
      ],
      chairmanTitle: 'মুতাওয়াল্লী সাহেবের বাণী',
      chairmanMessage:
        'সম্মানিত অভিভাবক!\n\nআপনার সন্তানের উজ্জ্বল ভবিষ্যৎ নির্মাণ ও তাকে হক্ক মজবুত আদর্শে গড়ে তুলতে ইসলামিক দ্বীনি হিসেবে গড়ে তোলার জন্য আপনি “মদিনাতুল উলুম ফাউন্ডেশন”-কে নির্বাচন করতে পারেন।\n\nআপনার সন্তানের গড়ে তোলার জন্য ইসলামিয়ার আমাদের একটা সুব্যবস্থাপূর্ণ প্রক্রিয়া রয়েছে। এই প্রতিষ্ঠানে আমাদের স্কুলের আদর্শিক শিক্ষা ও ভালোবাসা নিয়ে ধীরে ধীরে এগিয়ে যাবে ইনশাআল্লাহ।\n\nআপনি দোয়া সাথে বিশ্বাস করি যে, আমাদের সকল পরিকল্পনা মহান আল্লাহর রহমতে এবং সম্মানিত অভিভাবক ও শুভাকাঙ্ক্ষীদের পরামর্শ ও দোয়ার মাধ্যমে সফলভাবে বাস্তবায়ন করা সম্ভব হবে ইনশাআল্লাহ। শিক্ষার্থী যদি সত্যিকারের মানুষ হয়ে সমাজ ও দেশের সুনাম কুড়াতে সক্ষম হয়, তবে আমাদের সম্মিলিত প্রচেষ্টা সার্থক হবে। আল্লাহ তাআলা আমাদের সকল কাজ কবুল করে ইসলামের সাথে একনিষ্ঠ থাকার তাওফিক দান করুন। আমীন!\n\nদোয়ার মুহতাজ\nবীর মুক্তিযোদ্ধা আলহাজ্ব দিলওয়ার রহমান\nপ্রতিষ্ঠাতা মুতাওয়াল্লী,\nমদিনাতুল উলুম ফাউন্ডেশন।',
      historyTitle: 'ইতিহাস',
      history:
        'লালমনিরহাট অঞ্চলের মানুষের জন্য ইসলামী শিক্ষার আলো ছড়িয়ে দিতে মদিনাতুল উলুম প্রতিষ্ঠিত হয়। সময়ের সাথে আবাসিক ও অনাবাসিক বিভাগসহ বিভিন্ন শাখা বিস্তৃত হয়েছে।',
      visionTitle: 'দৃষ্টি',
      vision: 'সৎ, জ্ঞানী ও সেবাপ্রবণ প্রজন্ম গড়ে তোলা—একটি আদর্শ প্রতিষ্ঠান হিসেবে।',
    },
    programs: {
      title: 'প্রোগ্রাম ও বিভাগ',
      subtitle: 'প্রাথমিক থেকে উচ্চতর পর্যায়ে ধারাবাহিক শিক্ষা।',
      divisionsTitle: 'বিভাগের বিস্তারিত',
      divisions: [
        {
          id: 'nurani',
          title: 'নূরানী একাডেমী (মক্তব-নাজেরা)',
          summary: 'কায়দা-নাজেরা, দোয়া, আদব ও মৌলিক ইসলামী শিক্ষা।',
          meta: [
            { label: 'বয়স-সীমা', value: 'ন্যূনতম ৮ বছর' },
            { label: 'শিক্ষাকাল', value: '১ বছর' },
            { label: 'ভর্তির সময়', value: 'বছরের যে কোনো সময়' },
            { label: 'ভর্তি যোগ্যতা', value: 'ন্যূনতম ২য় শ্রেণি উত্তীর্ণ' },
          ],
          features: [
            'এক বছরে কায়দা ও নাজেরা সম্পন্ন',
            'তাজওয়ীদ ভিত্তিক তেলাওয়াত অনুশীলন',
            'দোয়া-দুরুদ ও প্রাথমিক ফিকহ',
            'আরবি ও বাংলা পড়া-লেখার ভিত্তি',
          ],
          image: '/images/academics/division-nurani.jpg',
          imageAlt: 'একসঙ্গে কুরআন অধ্যয়নরত শিক্ষার্থীরা',
        },
        {
          id: 'madrasa',
          title: 'মাদরাসা (আরবি/নাজেরা)',
          summary: 'আরবি, কুরআন ও সাধারণ শিক্ষার সুষম সমন্বয়।',
          meta: [
            { label: 'ফোকাস', value: 'আরবি, কুরআন ও সাধারণ শিক্ষা' },
            { label: 'পরিবেশ', value: 'আবাসিক ও শৃঙ্খলাপূর্ণ' },
            { label: 'ব্যবস্থাপনা', value: 'স্মার্ট এডুকেশন ম্যানেজমেন্ট' },
          ],
          features: [
            'আরবি, বাংলা, ইংরেজি, গণিত সহায়তা',
            'আদব-আখলাক ও ইসলামী মানসিকতা',
            'স্বাস্থ্য ও কল্যাণ সহায়তা',
            'সিসি ক্যামেরা ও নিরাপত্তা ব্যবস্থা',
          ],
          image: '/images/cards/madrasa-bg.jpg',
          imageAlt: 'মাদরাসা বিভাগের ভিজ্যুয়াল',
        },
        {
          id: 'hifz',
          title: 'হিফজ বিভাগ',
          summary: 'তাজওয়ীদসহ কুরআন হিফজের পূর্ণকালীন ব্যবস্থা।',
          meta: [
            { label: 'বয়স-সীমা', value: 'ন্যূনতম ১৩ বছর' },
            { label: 'শিক্ষাকাল', value: '৩ বছর' },
            { label: 'ভর্তির সময়', value: 'বছরের যে কোনো সময়' },
            { label: 'ভর্তি যোগ্যতা', value: 'ন্যূনতম ৩য় শ্রেণি উত্তীর্ণ ও পূর্ণ নাজেরা' },
          ],
          features: [
            'তাজওয়ীদসহ নিয়মিত হিফজ',
            'দৈনিক পুনরাবৃত্তি ও মূল্যায়ন',
            'দোয়া, আদব ও নামাজের অনুশীলন',
            '৩য় শ্রেণি পর্যন্ত সাধারণ জ্ঞান',
          ],
          image: '/images/academics/division-hifz.jpg',
          imageAlt: 'কুরআন পাঠরত শিক্ষার্থী',
        },
        {
          id: 'qirat',
          title: 'কিরাত বিভাগ (মাদানী নেসাব)',
          summary: 'উচ্চতর কিরাত শিক্ষা ও একাডেমিক সমন্বয়।',
          meta: [
            { label: 'শিক্ষাকাল', value: '৭ বছর' },
            { label: 'শিক্ষাবর্ষ', value: 'শাওয়াল থেকে রমযান' },
            { label: 'ভর্তি যোগ্যতা', value: 'পূর্ণ কুরআন, সহীহ নাজেরা ও বাংলা পড়া-লেখা' },
          ],
          features: [
            'বিশেষায়িত কিরাত প্রশিক্ষণ',
            'আরবি ভাষা ও ইসলামী জ্ঞানের সংযোগ',
            'বোর্ড পরীক্ষা ও সনদ প্রস্তুতি',
          ],
          image: '/images/academics/division-qirat.jpg',
          imageAlt: 'তসবীহসহ খোলা কুরআন',
        },
      ],
      syllabusTitle: 'শ্রেণিভিত্তিক সিলেবাস',
      syllabusSubtitle: 'প্রি-নার্সারি থেকে প্রাইমারি এবং কিরাত পরিকল্পনা।',
      syllabusImages: [
        {
          src: '/images/academics/syllabus-primary-1.png',
          alt: 'প্রাথমিক সিলেবাস (১ম অংশ)',
          caption: 'প্রি-নার্সারি থেকে ৩য় শ্রেণি (সংক্ষিপ্ত)',
        },
        {
          src: '/images/academics/syllabus-primary-2.png',
          alt: 'প্রাথমিক সিলেবাস (২য় অংশ)',
          caption: '৪র্থ থেকে ৮ম শ্রেণি (সংক্ষিপ্ত)',
        },
        {
          src: '/images/academics/syllabus-qirat.png',
          alt: 'কিরাত বিভাগ সিলেবাস',
          caption: 'কিরাত বিভাগ (মাদানী নেসাব) বর্ষভিত্তিক পরিকল্পনা',
        },
      ],
      academicTitle: 'শিক্ষাবর্ষ ও ক্যালেন্ডার',
      academicItems: [
        'শিক্ষাবর্ষ ইসলামি ক্যালেন্ডার অনুযায়ী: শাওয়াল থেকে রমযান।',
        'ভর্তি সারা বছর খোলা থাকে (আসন অনুযায়ী)।',
        'মাসিক পরীক্ষার পর স্বল্প ছুটি থাকে।',
        'প্রয়োজন অনুযায়ী সময়সূচি পরিবর্তন হতে পারে।',
      ],
    },
    campus: {
      title: 'ক্যাম্পাস ও সুবিধাসমূহ',
      subtitle: 'নিরাপদ, সবুজ ও শিক্ষাবান্ধব পরিবেশে শিক্ষা কার্যক্রম।',
      facilitiesTitle: 'সুবিধা ও সহায়তা',
      facilities: [
        'আবাসিক হোস্টেল ও নিয়মিত রুটিন',
        'শান্ত ও সুশৃঙ্খল শ্রেণিকক্ষ',
        'সিসি ক্যামেরা ও নিরাপত্তা কর্মী',
        'স্মার্ট ম্যানেজমেন্ট সিস্টেম',
        'স্বাস্থ্য ও কল্যাণ সহায়তা',
        'নামাজ ও অধ্যয়নের জন্য উপযুক্ত পরিবেশ',
      ],
      galleryTitle: 'ক্যাম্পাস গ্যালারি',
      gallerySubtitle: 'বর্তমান ও প্রস্তাবিত ভবনসমূহ।',
    },
    contact: {
      title: 'যোগাযোগ',
      subtitle: 'ভর্তি ও তথ্যের জন্য যোগাযোগ করুন।',
      addressLabel: 'ঠিকানা',
      addressLines: ['মাদরাসা রোড, খাতাপাড়া', 'লালমনিরহাট, বাংলাদেশ'],
      phonesLabel: 'ফোন',
      phones: [
        { label: 'মাদরাসা অফিস', value: '০১৭১৭ ১৮৪ ১৮৭' },
        { label: 'বালক ও বালিকা শাখা (খাতাপাড়া)', value: '০১৮১৪ ৫৬০ ৯৬৪' },
        { label: 'আটবিল শাখা', value: '০১৮১৪ ৫৬০ ৯৬৮' },
        { label: 'হিসাব বিভাগ', value: '০১৮১৪ ৫৬০ ৯৬৫' },
      ],
      emailLabel: 'ইমেইল',
      email: 'madinatululoomlal.bd@gmail.com',
      hoursLabel: 'সাক্ষাৎ সময়',
      hours: [
        'প্রতিদিন আসর থেকে মাগরিব পর্যন্ত',
        'শুক্রবার সকাল ৯:৩০ টা থেকে মাগরিব পর্যন্ত',
        'মোবাইল যোগাযোগ নির্ধারিত সময়ে',
      ],
      mapLabel: 'ম্যাপ',
      mapQuery: 'Madinatul Uloom Lalmonirhat',
    },
  },
  ar: {
    home: {
      hero: {
        badge: 'مدينة العلوم • لالمونيرهات',
        title: 'تعليم قائم على القرآن والسنة لصناعة جيل صالح',
        subtitle: 'مؤسسة تعليمية إسلامية مجتمعية تُنمّي الإيمان والأخلاق والمعرفة للبنين والبنات.',
        location: 'طريق المدرسة، خطبة بارا، لالمونيرهات، بنغلاديش',
        ctaPrimary: 'تبرع الآن',
        ctaSecondary: 'استكشف البرامج',
        prospectusLabel: 'تحميل الكتيّب (PDF)',
      },
      highlights: {
        title: 'معلومات سريعة',
        items: [
          { title: 'داخلي', description: 'سكن آمن ونظام يومي منضبط.' },
          { title: 'خارجي', description: 'إتاحة نظام الدوام اليومي.' },
          { title: 'دار رعاية', description: 'عناية خاصة بالصغار.' },
          { title: 'بنون وبنات', description: 'فصول وأقسام منفصلة.' },
        ],
      },
      divisions: {
        title: 'الأقسام التعليمية',
        subtitle: 'مسارات تعليمية من الأساسيات إلى المراحل المتقدمة.',
        items: [
          {
            id: 'nurani',
            title: 'أكاديمية نوراني (مكتب-ناظرة)',
            description: 'أساس قوي في القاعدة والناظرة والأدعية اليومية.',
          },
          {
            id: 'madrasa',
            title: 'المدرسة (العربية/الناظرة)',
            description: 'توازن بين العربية والقرآن والتعليم العام.',
          },
          {
            id: 'hifz',
            title: 'قسم الحفظ',
            description: 'حفظ القرآن كاملاً مع التجويد والانضباط.',
          },
          {
            id: 'qirat',
            title: 'قسم القراءات (المنهج المدني)',
            description: 'دراسة متقدمة للقراءات مع المنهج الوطني.',
          },
        ],
      },
      policies: {
        title: 'سياسات رئيسية',
        visiting: {
          title: 'أوقات الزيارة',
          items: [
            'يوميًا: من العصر إلى المغرب',
            'الجمعة: 9:30 ص إلى المغرب',
            'الاتصال ضمن الوقت المحدد',
          ],
        },
        holidays: {
          title: 'ملخص العطل',
          items: [
            'العطل الحكومية: توقف الدراسة',
            'إجازة منتصف الفصل: 7 أيام تقريبًا',
            'إجازة الامتحان السنوي: 7 أيام تقريبًا',
            'إجازتا العيد: 10 أيام لكل عيد',
          ],
          note: 'قد تتغير المواعيد حسب الحاجة.',
        },
      },
      campus: {
        title: 'الحرم والمرافق',
        subtitle: 'بيئة آمنة وخضراء مع دعم تعليمي وسكني.',
        cta: 'عرض الحرم',
      },
      contactCta: {
        title: 'القبول والتواصل',
        description: 'اتصل بنا للحصول على معلومات القبول وزيارة الحرم.',
        button: 'اتصل بنا',
      },
      donation: {
        title: 'ادعم الرسالة',
        description: 'تبرعك يساعد في التعليم ورعاية الطلاب وتطوير الحرم.',
        button: 'تبرع الآن',
        headline: 'ادعم معهدك الإسلامي.',
        headlineAccent: 'ابنِ آخرتك.',
        supporting:
          'تساعد تبرعاتكم السخية في صيانة المعهد الإسلامي، ودعم البرامج التعليمية، ومساندة المحتاجين في مجتمعنا.',
        badges: ['حسابات بنكية موثوقة', 'إيصالات متاحة'],
        tipTitle: 'نصائح التبرع',
        note: 'اكتب اسمك في ملاحظة التحويل لإصدار الإيصال بسرعة.',
        bank: {
          title: 'الحساب البنكي',
          accountNameLabel: 'اسم الحساب',
          accountName: 'مدينة العلوم لالمونيرهات',
          coLabel: 'عناية',
          co: 'ظليل الرحمن',
          bankNameLabel: 'البنك',
          bankName: 'سونالي بنك ذ.م.م',
          accountNumberLabel: 'رقم الحساب',
          accountNumber: '34196296',
          branchLabel: 'الفرع',
          branch: 'فرع لالمونيرهات',
          routingNumberLabel: 'رقم التوجيه',
          routingNumber: '52100',
          accountTypeLabel: 'نوع الحساب',
          accountType: 'جاري',
        },
        bkash: {
          title: 'بيكاش',
          numberLabel: 'الرقم',
          number: '+8801774641393',
          typeLabel: 'نوع الدفع',
          type: 'شخصي',
        },
      },
    },
    about: {
      title: 'عن مدينة العلوم',
      missionTitle: 'رسالتنا',
      mission:
        'بناء حياة ومجتمع قائمين على القرآن والسنة، وإحياء شرف الإسلام بالعلم والعمل، وتنمية الكفاءة الروحية والأخلاقية والفكرية والاجتماعية طلبًا لرضا الله.',
      objectivesTitle: 'أهدافنا',
      objectives: [
        'تقديم تعليم إسلامي أصيل مع بناء الخُلُق.',
        'الجمع بين العلوم الشرعية والمعارف الأساسية الحديثة.',
        'ترسيخ الانضباط والآداب والمسؤولية المجتمعية.',
        'إعداد الطلاب لخدمة الدين والمجتمع.',
      ],
      chairmanTitle: 'كلمة المتولي',
      chairmanMessage:
        'أيها أولياء الأمور المحترمون!\n\nيمكنكم اختيار “مؤسسة مدينة العلوم” لبناء مستقبل مشرق لأبنائكم وتربيتهم على المبادئ الإسلامية الراسخة والحق.\n\nلدينا منظومة تربوية منظّمة لإعداد أبنائكم. في هذه المؤسسة سيتقدّمون تدريجياً، إن شاء الله، بروح المدرسة وقيمها ومحبتها.\n\nنؤمن مع دعائكم أن جميع خططنا يمكن أن تُنفَّذ بنجاح برحمة الله تعالى وبمشورة ودعاء أولياء الأمور والناصحين، إن شاء الله. فإذا صار الطالب إنساناً صالحاً قادراً على رفع سمعة المجتمع والوطن، فقد تكللت جهودنا المشتركة بالنجاح. نسأل الله أن يتقبل أعمالنا كلها وأن يرزقنا الثبات على الإسلام. آمين!\n\nمحتاج إلى دعائكم\nالبطل المجاهد الحاج دلور رحمن\nالمؤسس المتولي،\nمؤسسة مدينة العلوم.',
      historyTitle: 'نبذة تاريخية',
      history:
        'تأسست مدينة العلوم لخدمة أهل لالمونيرهات بالتعليم الإسلامي، وتوسعت لتضم أقسامًا داخلية وخارجية متعددة.',
      visionTitle: 'رؤيتنا',
      vision: 'أن نكون مؤسسة إسلامية نموذجية تُخرّج طلابًا صالحين وخدّامين للمجتمع.',
    },
    programs: {
      title: 'البرامج والأقسام',
      subtitle: 'تعليم منظّم من الأساسيات إلى المراحل المتقدمة.',
      divisionsTitle: 'تفاصيل الأقسام',
      divisions: [
        {
          id: 'nurani',
          title: 'أكاديمية نوراني (مكتب-ناظرة)',
          summary: 'برنامج تأسيسي في القاعدة والناظرة والأدعية والفقه الأساسي.',
          meta: [
            { label: 'العمر', value: '٨ سنوات فما فوق' },
            { label: 'المدة', value: 'سنة واحدة' },
            { label: 'القبول', value: 'متاح طوال العام' },
            { label: 'المؤهل', value: 'اجتياز الصف الثاني على الأقل' },
          ],
          features: [
            'إتمام القاعدة والناظرة خلال سنة',
            'تلاوة بالتجويد والتصحيح',
            'أدعية يومية وفقه عملي',
            'أساسيات العربية والبنغالية',
          ],
          image: '/images/academics/division-nurani.jpg',
          imageAlt: 'طلاب يدرسون القرآن معًا',
        },
        {
          id: 'madrasa',
          title: 'المدرسة (العربية/الناظرة)',
          summary: 'منهج متوازن في العربية والقرآن والمواد العامة.',
          meta: [
            { label: 'التركيز', value: 'العربية والقرآن والتعليم العام' },
            { label: 'البيئة', value: 'داخلية ومنضبطة' },
            { label: 'الإدارة', value: 'نظام تعليمي ذكي' },
          ],
          features: [
            'دعم العربية والبنغالية والإنجليزية والرياضيات',
            'تربية على الأدب والأخلاق الإسلامية',
            'رعاية صحية ودعم للطلاب',
            'كاميرات مراقبة وأمن',
          ],
          image: '/images/cards/madrasa-bg.jpg',
          imageAlt: 'صورة برنامج المدرسة',
        },
        {
          id: 'hifz',
          title: 'قسم الحفظ',
          summary: 'حفظ كامل للقرآن مع متابعة وتجويد.',
          meta: [
            { label: 'العمر', value: '١٣ سنة فما فوق' },
            { label: 'المدة', value: '٣ سنوات' },
            { label: 'القبول', value: 'متاح طوال العام' },
            { label: 'المؤهل', value: 'اجتياز الصف الثالث وإتقان الناظرة' },
          ],
          features: [
            'حفظ بالتجويد والمراجعة اليومية',
            'تقارير أسبوعية وشهرية',
            'آداب وأذكار وانضباط صلاة',
            'دعم معلومات عامة حتى الصف الثالث',
          ],
          image: '/images/academics/division-hifz.jpg',
          imageAlt: 'طالب يقرأ القرآن',
        },
        {
          id: 'qirat',
          title: 'قسم القراءات (المنهج المدني)',
          summary: 'دراسة متقدمة للقراءات مع العلوم الإسلامية.',
          meta: [
            { label: 'المدة', value: '٧ سنوات' },
            { label: 'السنة الدراسية', value: 'من شوال إلى رمضان' },
            { label: 'المؤهل', value: 'إتمام القرآن وإتقان الناظرة والكتابة البنغالية' },
          ],
          features: [
            'تخصص متقدم في القراءات',
            'دمج العربية والعلوم الإسلامية',
            'تهيئة لامتحانات المجلس والشهادات',
          ],
          image: '/images/academics/division-qirat.jpg',
          imageAlt: 'مصحف مفتوح مع سبحة',
        },
      ],
      syllabusTitle: 'المنهج حسب الصفوف',
      syllabusSubtitle: 'من الروضة إلى الابتدائي وخطة القراءات.',
      syllabusImages: [
        {
          src: '/images/academics/syllabus-primary-1.png',
          alt: 'منهج المرحلة الابتدائية (الجزء الأول)',
          caption: 'من التمهيدي إلى الصف الثالث (ملخص)',
        },
        {
          src: '/images/academics/syllabus-primary-2.png',
          alt: 'منهج المرحلة الابتدائية (الجزء الثاني)',
          caption: 'من الصف الرابع إلى الثامن (ملخص)',
        },
        {
          src: '/images/academics/syllabus-qirat.png',
          alt: 'خطة قسم القراءات',
          caption: 'خطة قسم القراءات (المنهج المدني) حسب السنوات',
        },
      ],
      academicTitle: 'السنة الدراسية والتقويم',
      academicItems: [
        'السنة الدراسية وفق التقويم الهجري: من شوال إلى رمضان.',
        'القبول متاح طوال العام حسب الطاقة الاستيعابية.',
        'اختبارات شهرية تتبعها إجازات قصيرة.',
        'قد تتغير الجداول وفق الحاجة.',
      ],
    },
    campus: {
      title: 'الحرم والمرافق',
      subtitle: 'بيئة آمنة وخضراء مع مرافق تعليمية وسكنية.',
      facilitiesTitle: 'المرافق والدعم',
      facilities: [
        'سكن داخلي بنظام يومي منضبط',
        'فصول دراسية مهيأة للتركيز',
        'مراقبة بالكاميرات وأمن',
        'نظام إدارة تعليمي ذكي',
        'رعاية صحية ودعم للطلاب',
        'مساحات للصلاة والمطالعة',
      ],
      galleryTitle: 'معرض الحرم',
      gallerySubtitle: 'المباني الحالية والمقترحة.',
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'للقبول والاستفسار، يرجى التواصل.',
      addressLabel: 'العنوان',
      addressLines: ['طريق المدرسة، خطبة بارا', 'لالمونيرهات، بنغلاديش'],
      phonesLabel: 'الهاتف',
      phones: [
        { label: 'مكتب المدرسة', value: '01717 184 187' },
        { label: 'فرع البنين والبنات (خطبة بارا)', value: '01814 560 964' },
        { label: 'فرع أتبل', value: '01814 560 968' },
        { label: 'الحسابات', value: '01814 560 965' },
      ],
      emailLabel: 'البريد الإلكتروني',
      email: 'madinatululoomlal.bd@gmail.com',
      hoursLabel: 'أوقات الزيارة',
      hours: ['يوميًا من العصر إلى المغرب', 'الجمعة 9:30 ص إلى المغرب', 'الاتصال ضمن الوقت المحدد'],
      mapLabel: 'الخريطة',
      mapQuery: 'Madinatul Uloom Lalmonirhat',
    },
  },
};

export function getSiteContent(locale: string): SiteContent {
  if (locale === 'bn' || locale === 'ar' || locale === 'en') {
    return siteContent[locale];
  }
  return siteContent.en;
}
