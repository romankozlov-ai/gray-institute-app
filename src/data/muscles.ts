export type MuscleGroup = {
  id: string;
  nameEn: string;
  nameUk: string;
  tests: MuscleTest[];
};

export type MuscleTest = {
  id: string;
  nameEn: string;
  nameUk: string;
  descriptionEn: string;
  descriptionUk: string;
  photoUrl?: string;
  videoUrl?: string;
  scale: 0 | 1 | 2 | 3 | 4 | 5;
};

export const muscleGroups: MuscleGroup[] = [
  {
    id: 'neck',
    nameEn: 'Neck Muscles',
    nameUk: 'Мязи шиї',
    tests: [
      {
        id: 'neck-flexion',
        nameEn: 'Neck Flexion',
        nameUk: 'Згинання шиї',
        descriptionEn: 'Test neck flexion strength',
        descriptionUk: 'Тест сили згинання шиї',
        scale: 0
      },
      {
        id: 'neck-extension',
        nameEn: 'Neck Extension',
        nameUk: 'Розгинання шиї',
        descriptionEn: 'Test neck extension strength',
        descriptionUk: 'Тест сили розгинання шиї',
        scale: 0
      }
    ]
  },
  {
    id: 'shoulder',
    nameEn: 'Shoulder Muscles',
    nameUk: 'Мязи плеча',
    tests: [
      {
        id: 'shoulder-flexion',
        nameEn: 'Shoulder Flexion',
        nameUk: 'Згинання плеча',
        descriptionEn: 'Test shoulder flexion (anterior deltoid)',
        descriptionUk: 'Тест згинання плеча (передній дельтоподібний)',
        scale: 0
      },
      {
        id: 'shoulder-abduction',
        nameEn: 'Shoulder Abduction',
        nameUk: 'Відведення плеча',
        descriptionEn: 'Test shoulder abduction (middle deltoid)',
        descriptionUk: 'Тест відведення плеча (середній дельтоподібний)',
        scale: 0
      },
      {
        id: 'shoulder-extension',
        nameEn: 'Shoulder Extension',
        nameUk: 'Розгинання плеча',
        descriptionEn: 'Test shoulder extension (posterior deltoid)',
        descriptionUk: 'Тест розгинання плеча (задній дельтоподібний)',
        scale: 0
      }
    ]
  },
  {
    id: 'elbow',
    nameEn: 'Elbow Muscles',
    nameUk: 'Мязи ліктя',
    tests: [
      {
        id: 'elbow-flexion',
        nameEn: 'Elbow Flexion',
        nameUk: 'Згинання ліктя',
        descriptionEn: 'Test elbow flexion (biceps)',
        descriptionUk: 'Тест згинання ліктя (біцепс)',
        scale: 0
      },
      {
        id: 'elbow-extension',
        nameEn: 'Elbow Extension',
        nameUk: 'Розгинання ліктя',
        descriptionEn: 'Test elbow extension (triceps)',
        descriptionUk: 'Тест розгинання ліктя (трицепс)',
        scale: 0
      }
    ]
  },
  {
    id: 'wrist',
    nameEn: 'Wrist & Hand Muscles',
    nameUk: "Мязи зап'ястя та кисті",
    tests: [
      {
        id: 'wrist-flexion',
        nameEn: 'Wrist Flexion',
        nameUk: "Згинання зап'ястя",
        descriptionEn: 'Test wrist flexion',
        descriptionUk: "Тест згинання зап'ястя",
        scale: 0
      },
      {
        id: 'wrist-extension',
        nameEn: 'Wrist Extension',
        nameUk: "Розгинання зап'ястя",
        descriptionEn: 'Test wrist extension',
        descriptionUk: "Тест розгинання зап'ястя",
        scale: 0
      },
      {
        id: 'grip',
        nameEn: 'Grip Strength',
        nameUk: 'Сила хвата',
        descriptionEn: 'Test grip strength',
        descriptionUk: 'Тест сили хвата',
        scale: 0
      }
    ]
  },
  {
    id: 'hip',
    nameEn: 'Hip Muscles',
    nameUk: 'Мязи стегна',
    tests: [
      {
        id: 'hip-flexion',
        nameEn: 'Hip Flexion',
        nameUk: 'Згинання стегна',
        descriptionEn: 'Test hip flexion (iliopsoas)',
        descriptionUk: 'Тест згинання стегна (підвздошно-поперековий)',
        scale: 0
      },
      {
        id: 'hip-extension',
        nameEn: 'Hip Extension',
        nameUk: 'Розгинання стегна',
        descriptionEn: 'Test hip extension (gluteus maximus)',
        descriptionUk: 'Тест розгинання стегна (великий сідничний)',
        scale: 0
      },
      {
        id: 'hip-abduction',
        nameEn: 'Hip Abduction',
        nameUk: 'Відведення стегна',
        descriptionEn: 'Test hip abduction (gluteus medius)',
        descriptionUk: 'Тест відведення стегна (середній сідничний)',
        scale: 0
      }
    ]
  },
  {
    id: 'knee',
    nameEn: 'Knee Muscles',
    nameUk: 'Мязи коліна',
    tests: [
      {
        id: 'knee-flexion',
        nameEn: 'Knee Flexion',
        nameUk: 'Згинання коліна',
        descriptionEn: 'Test knee flexion (hamstrings)',
        descriptionUk: 'Тест згинання коліна (підколінні)',
        scale: 0
      },
      {
        id: 'knee-extension',
        nameEn: 'Knee Extension',
        nameUk: 'Розгинання коліна',
        descriptionEn: 'Test knee extension (quadriceps)',
        descriptionUk: 'Тест розгинання коліна (чотириголовий)',
        scale: 0
      }
    ]
  },
  {
    id: 'ankle',
    nameEn: 'Ankle & Foot Muscles',
    nameUk: 'Мязи гомілки та стопи',
    tests: [
      {
        id: 'ankle-dorsiflexion',
        nameEn: 'Ankle Dorsiflexion',
        nameUk: 'Дорзифлексія гомілки',
        descriptionEn: 'Test ankle dorsiflexion (tibialis anterior)',
        descriptionUk: 'Тест дорзифлексії гомілки (передній великогомілковий)',
        scale: 0
      },
      {
        id: 'ankle-plantarflexion',
        nameEn: 'Ankle Plantarflexion',
        nameUk: 'Плантарфлексія гомілки',
        descriptionEn: 'Test ankle plantarflexion (gastrocnemius, soleus)',
        descriptionUk: 'Тест плантарфлексії гомілки (ікроніжний, камбаловидний)',
        scale: 0
      }
    ]
  },
  {
    id: 'trunk',
    nameEn: 'Trunk Muscles',
    nameUk: 'Мязи тулуба',
    tests: [
      {
        id: 'trunk-flexion',
        nameEn: 'Trunk Flexion',
        nameUk: 'Згинання тулуба',
        descriptionEn: 'Test trunk flexion (abdominals)',
        descriptionUk: 'Тест згинання тулуба (черевні мязи)',
        scale: 0
      },
      {
        id: 'trunk-extension',
        nameEn: 'Trunk Extension',
        nameUk: 'Розгинання тулуба',
        descriptionEn: 'Test trunk extension (erector spinae)',
        descriptionUk: 'Тест розгинання тулуба (випрямлячі хребта)',
        scale: 0
      }
    ]
  }
];
