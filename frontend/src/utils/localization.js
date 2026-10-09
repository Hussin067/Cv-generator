/** Interface strings. The interface language is independent from the CV language. */

const en = {
  appName: 'Sira CV',
  tagline: 'Arabic & English ATS CV builder',
  interfaceLanguage: 'Interface language',
  cvLanguage: 'CV language',
  english: 'English',
  arabic: 'العربية',
  preview: 'Preview',
  editor: 'Editor',
  downloadPdf: 'Download PDF',
  clearAll: 'Clear all data',
  privacyBadge: 'Not saved by this app',
  home: 'Home',

  // Home page
  heroTitle: 'Build a professional, ATS-friendly CV in Arabic or English',
  heroBody:
    'Fill in a simple form, watch your CV take shape in a live preview, and download a clean, searchable PDF.',
  startBuilding: 'Start building',
  featurePdfTitle: 'Searchable PDF',
  featurePdfBody: 'Download a text-based PDF with selectable text, clickable links, and clean page breaks.',
  featureAtsTitle: 'ATS-friendly template',
  featureAtsBody: 'Single column, standard headings, real text, no graphics. Empty sections are left out automatically.',
  featureBilingualTitle: 'Arabic and English',
  featureBilingualBody: 'Right-to-left Arabic layout with correct shaping, mixed English terms, and natural professional wording.',
  featurePrivacyTitle: 'Private by design',
  featurePrivacyBody: 'No accounts, no database, no browser storage. Your CV disappears when you close or refresh the page.',
  noGuarantee: 'No CV builder can guarantee an ATS score or an interview. Always review the final document.',

  // Privacy notice
  privacyTitle: 'How your information is handled',
  privacyPoints: [
    'Your CV is kept only in this browser tab’s memory. This app does not save it to a database, cookies, localStorage, or any other browser storage.',
    'Refreshing or closing the page permanently discards your CV unless you have downloaded the PDF.',
    'The PDF is created by your own browser’s print feature. Your CV is never uploaded to any server.',
  ],
  privacyShort: 'Your CV is kept only in this tab and is never saved by this app.',
  learnMore: 'Details',
  close: 'Close',
  unloadWarning: 'Leaving or refreshing this page will permanently discard your unsaved CV.',

  // Clear
  clearConfirmTitle: 'Clear all CV data?',
  clearConfirmBody:
    'This removes every field, entry, and both language versions from this page. It cannot be undone. Download your PDF first if you want to keep it.',
  clearConfirm: 'Clear everything',
  cancel: 'Cancel',
  cleared: 'All CV data has been cleared from this page.',

  // Sections
  personalInfo: 'Personal information',
  summary: 'Professional summary',
  education: 'Education',
  experience: 'Experience',
  skills: 'Skills',
  certifications: 'Certifications',
  projects: 'Projects & research',
  additional: 'Additional sections',
  optional: 'Optional',
  required: 'Required',

  // Personal fields
  fullName: 'Full name',
  jobTitle: 'Target job title',
  email: 'Email',
  phone: 'Phone',
  location: 'Location',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  portfolio: 'Portfolio / website',
  fullNameHint: 'Shown exactly as typed at the top of your CV.',

  // Summary
  summaryLabel: 'Summary',
  summaryHint: 'Two to four lines about your background, strengths, and goal.',

  // Entries
  add: 'Add',
  addEducation: 'Add education',
  addExperience: 'Add experience',
  addCategory: 'Add category',
  addCertification: 'Add certification',
  addProject: 'Add project',
  addResearch: 'Add research',
  addSection: 'Add section',
  remove: 'Remove',
  moveUp: 'Move up',
  moveDown: 'Move down',
  untitled: 'Untitled entry',
  emptySectionHint: 'Nothing added yet. This section will not appear on your CV.',

  degree: 'Degree or qualification',
  major: 'Major',
  institution: 'University or institution',
  startDate: 'Start date',
  endDate: 'End date',
  graduationDate: 'Graduation date',
  expectedGraduation: 'Expected graduation',
  gpa: 'GPA',
  coursework: 'Relevant coursework',
  courseworkHint: 'Separate with commas.',
  achievements: 'Academic achievements',
  linesHint: 'One item per line.',

  company: 'Company or organization',
  role: 'Job title',
  currentlyWorking: 'I currently work here',
  responsibilities: 'Responsibilities and achievements',
  responsibilitiesHint: 'One point per line. Start each with an action verb, e.g. “Built…”, “Maintained…”.',
  technologies: 'Technologies and tools',
  listHint: 'Separate with commas.',

  category: 'Category',
  categoryPlaceholder: 'e.g. Programming Languages',
  skillItems: 'Skills',
  skillItemsHint: 'Separate with commas. Shown as plain text, without ratings.',

  certName: 'Certification name',
  issuer: 'Issuing organization',
  issueDate: 'Issue date',
  expiryDate: 'Expiration date',
  credentialUrl: 'Credential URL',

  title: 'Title',
  type: 'Type',
  typeProject: 'Project',
  typeResearch: 'Research',
  description: 'Short description',
  descriptionHintProject: 'What you built and why, in one sentence.',
  descriptionHintResearch: 'The research objective, in one sentence.',
  work: 'Work performed',
  workHint: 'Your own contributions, one per line.',
  toolsProject: 'Tools and technologies',
  toolsResearch: 'Methodology and tools',
  outcomes: 'Results or outcomes',
  outcomesHint: 'Only real results, one per line. Leave empty if unknown.',
  projectUrl: 'GitHub, project, or publication URL',

  sectionKind: 'Section type',
  kinds: {
    volunteer: 'Volunteer experience',
    awards: 'Awards & achievements',
    publications: 'Publications',
    coursework: 'Relevant coursework',
    languages: 'Languages',
    custom: 'Custom section',
  },
  customTitle: 'Section title',
  items: 'Items',
  itemsHintInline: 'Separate with commas, e.g. Arabic (Native), English (Fluent).',

  // Language versions
  copyBannerTitle: 'This language version is empty',
  copyBannerBody: (from) => `Your CV has content in ${from}. Start from a copy and edit it, or start empty.`,
  copyFrom: (from) => `Copy from ${from}`,
  startEmpty: 'Start empty',

  // Preview
  previewEmpty: 'Your CV preview appears here as you type. Start with your full name.',
  pageBreak: 'Page break (approx.)',
  nameRequiredForPdf: 'Enter your full name to download the PDF.',
  fixErrorsForPdf: 'Fix the highlighted fields before downloading.',
  printHint: 'In the print window, choose “Save as PDF” as the destination and turn off “Headers and footers”.',

  // Errors
  invalidEmail: 'Enter a valid email address.',
  invalidUrl: 'Enter a valid web address (https://…).',
  invalidDateOrder: 'End date is before the start date.',
}

const ar = {
  appName: 'سيرة',
  tagline: 'منشئ سير ذاتية متوافقة مع أنظمة ATS بالعربية والإنجليزية',
  interfaceLanguage: 'لغة الواجهة',
  cvLanguage: 'لغة السيرة الذاتية',
  english: 'English',
  arabic: 'العربية',
  preview: 'معاينة',
  editor: 'المحرر',
  downloadPdf: 'تنزيل PDF',
  clearAll: 'مسح جميع البيانات',
  privacyBadge: 'لا يحفظها التطبيق',
  home: 'الرئيسية',

  heroTitle: 'أنشئ سيرة ذاتية احترافية متوافقة مع أنظمة ATS بالعربية أو الإنجليزية',
  heroBody:
    'املأ نموذجًا بسيطًا، وشاهد سيرتك تتشكّل في معاينة مباشرة، ثم نزّل ملف PDF نظيفًا قابلًا للبحث.',
  startBuilding: 'ابدأ الآن',
  featurePdfTitle: 'ملف PDF قابل للبحث',
  featurePdfBody: 'نزّل ملف PDF نصيًا قابلًا للتحديد، بروابط قابلة للنقر وفواصل صفحات مرتبة.',
  featureAtsTitle: 'قالب متوافق مع أنظمة ATS',
  featureAtsBody: 'عمود واحد، وعناوين قياسية، ونص حقيقي بلا رسومات. تُحذف الأقسام الفارغة تلقائيًا.',
  featureBilingualTitle: 'العربية والإنجليزية',
  featureBilingualBody: 'تخطيط عربي من اليمين إلى اليسار بتشكيل صحيح للحروف، مع دعم المصطلحات الإنجليزية وصياغة مهنية طبيعية.',
  featurePrivacyTitle: 'الخصوصية أولًا',
  featurePrivacyBody: 'لا حسابات ولا قواعد بيانات ولا تخزين في المتصفح. تختفي سيرتك عند إغلاق الصفحة أو تحديثها.',
  noGuarantee: 'لا يمكن لأي أداة ضمان نتيجة في أنظمة ATS أو الحصول على مقابلة. راجع المستند النهائي دائمًا.',

  privacyTitle: 'كيف نتعامل مع معلوماتك',
  privacyPoints: [
    'تبقى سيرتك الذاتية في ذاكرة هذه الصفحة فقط. لا يحفظها التطبيق في قاعدة بيانات أو ملفات تعريف الارتباط أو localStorage أو أي تخزين آخر في المتصفح.',
    'تحديث الصفحة أو إغلاقها يحذف سيرتك نهائيًا ما لم تكن قد نزّلت ملف PDF.',
    'يُنشأ ملف PDF عبر ميزة الطباعة في متصفحك، ولا تُرفع سيرتك إلى أي خادم.',
  ],
  privacyShort: 'تبقى سيرتك في هذه الصفحة فقط ولا يحفظها التطبيق.',
  learnMore: 'التفاصيل',
  close: 'إغلاق',
  unloadWarning: 'مغادرة الصفحة أو تحديثها سيحذف سيرتك الذاتية غير المحفوظة نهائيًا.',

  clearConfirmTitle: 'مسح جميع بيانات السيرة؟',
  clearConfirmBody:
    'سيُحذف كل حقل وعنصر ونسختا اللغتين من هذه الصفحة، ولا يمكن التراجع عن ذلك. نزّل ملف PDF أولًا إن أردت الاحتفاظ به.',
  clearConfirm: 'مسح كل شيء',
  cancel: 'إلغاء',
  cleared: 'تم مسح جميع بيانات السيرة من هذه الصفحة.',

  personalInfo: 'المعلومات الشخصية',
  summary: 'الملخص المهني',
  education: 'التعليم',
  experience: 'الخبرة العملية',
  skills: 'المهارات',
  certifications: 'الشهادات المهنية',
  projects: 'المشاريع والأبحاث',
  additional: 'أقسام إضافية',
  optional: 'اختياري',
  required: 'مطلوب',

  fullName: 'الاسم الكامل',
  jobTitle: 'المسمى الوظيفي المستهدف',
  email: 'البريد الإلكتروني',
  phone: 'رقم الهاتف',
  location: 'الموقع',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  portfolio: 'معرض الأعمال / الموقع',
  fullNameHint: 'يظهر كما كتبته تمامًا في أعلى سيرتك.',

  summaryLabel: 'الملخص',
  summaryHint: 'من سطرين إلى أربعة أسطر عن خلفيتك ونقاط قوتك وهدفك.',

  add: 'إضافة',
  addEducation: 'إضافة مؤهل',
  addExperience: 'إضافة خبرة',
  addCategory: 'إضافة فئة',
  addCertification: 'إضافة شهادة',
  addProject: 'إضافة مشروع',
  addResearch: 'إضافة بحث',
  addSection: 'إضافة قسم',
  remove: 'حذف',
  moveUp: 'نقل لأعلى',
  moveDown: 'نقل لأسفل',
  untitled: 'عنصر بلا عنوان',
  emptySectionHint: 'لم تُضف شيئًا بعد. لن يظهر هذا القسم في سيرتك.',

  degree: 'الدرجة أو المؤهل',
  major: 'التخصص',
  institution: 'الجامعة أو المؤسسة',
  startDate: 'تاريخ البداية',
  endDate: 'تاريخ النهاية',
  graduationDate: 'تاريخ التخرج',
  expectedGraduation: 'تخرج متوقع',
  gpa: 'المعدل',
  coursework: 'المقررات ذات الصلة',
  courseworkHint: 'افصل بينها بفواصل.',
  achievements: 'الإنجازات الأكاديمية',
  linesHint: 'عنصر واحد في كل سطر.',

  company: 'الشركة أو الجهة',
  role: 'المسمى الوظيفي',
  currentlyWorking: 'أعمل هنا حاليًا',
  responsibilities: 'المهام والإنجازات',
  responsibilitiesHint: 'نقطة واحدة في كل سطر، وابدأ كل نقطة بفعل، مثل: «طوّرت…»، «أدرت…».',
  technologies: 'التقنيات والأدوات',
  listHint: 'افصل بينها بفواصل.',

  category: 'الفئة',
  categoryPlaceholder: 'مثال: لغات البرمجة',
  skillItems: 'المهارات',
  skillItemsHint: 'افصل بينها بفواصل. تُعرض نصًا عاديًا بلا تقييمات.',

  certName: 'اسم الشهادة',
  issuer: 'الجهة المانحة',
  issueDate: 'تاريخ الإصدار',
  expiryDate: 'تاريخ الانتهاء',
  credentialUrl: 'رابط الشهادة',

  title: 'العنوان',
  type: 'النوع',
  typeProject: 'مشروع',
  typeResearch: 'بحث',
  description: 'وصف مختصر',
  descriptionHintProject: 'ما الذي بنيته ولماذا، في جملة واحدة.',
  descriptionHintResearch: 'هدف البحث في جملة واحدة.',
  work: 'العمل المنجز',
  workHint: 'مساهماتك الفعلية، نقطة في كل سطر.',
  toolsProject: 'الأدوات والتقنيات',
  toolsResearch: 'المنهجية والأدوات',
  outcomes: 'النتائج',
  outcomesHint: 'النتائج الحقيقية فقط، نتيجة في كل سطر. اتركه فارغًا إن لم تكن معروفة.',
  projectUrl: 'رابط GitHub أو المشروع أو النشر',

  sectionKind: 'نوع القسم',
  kinds: {
    volunteer: 'الأعمال التطوعية',
    awards: 'الجوائز والإنجازات',
    publications: 'المنشورات',
    coursework: 'المقررات ذات الصلة',
    languages: 'اللغات',
    custom: 'قسم مخصص',
  },
  customTitle: 'عنوان القسم',
  items: 'العناصر',
  itemsHintInline: 'افصل بينها بفواصل، مثال: العربية (اللغة الأم)، الإنجليزية (بطلاقة).',




  copyBannerTitle: 'هذه النسخة اللغوية فارغة',
  copyBannerBody: (from) => `سيرتك تحتوي على محتوى باللغة ${from}. ابدأ من نسخة مطابقة وعدّلها، أو ابدأ بنسخة فارغة.`,
  copyFrom: (from) => `نسخ من ${from}`,
  startEmpty: 'البدء بنسخة فارغة',

  previewEmpty: 'تظهر معاينة سيرتك هنا أثناء الكتابة. ابدأ باسمك الكامل.',
  pageBreak: 'فاصل صفحة (تقريبي)',
  nameRequiredForPdf: 'أدخل اسمك الكامل لتنزيل ملف PDF.',
  fixErrorsForPdf: 'صحّح الحقول المميزة قبل التنزيل.',
  printHint: 'في نافذة الطباعة، اختر «حفظ بتنسيق PDF» كوجهة، وألغِ تفعيل «الرؤوس والتذييلات».',

  invalidEmail: 'أدخل بريدًا إلكترونيًا صحيحًا.',
  invalidUrl: 'أدخل رابطًا صحيحًا (https://…).',
  invalidDateOrder: 'تاريخ النهاية يسبق تاريخ البداية.',
}

export const STRINGS = { en, ar }

export const languageName = (code, uiLang) => {
  const names = { en: { en: 'English', ar: 'Arabic' }, ar: { en: 'الإنجليزية', ar: 'العربية' } }
  return names[uiLang][code]
}

