export const LANG = {
  ARB: {
    CODE: 'arb',
    TEXT: '阿拉伯语',
    TRANSLATION: 'العربية'
  },
  DE: {
    CODE: 'de',
    TEXT: '德语',
    TRANSLATION: 'Deutsch'
  },
  EN: {
    CODE: 'en',
    TEXT: '英语',
    TRANSLATION: 'English'
  },
  ES: {
    CODE: 'es',
    TEXT: '西班牙语',
    TRANSLATION: 'Español'
  },
  FR: {
    CODE: 'fr',
    TEXT: '法语',
    TRANSLATION: 'Français'
  },
  ID: {
    CODE: 'id',
    TEXT: '印度尼西亚语',
    TRANSLATION: 'Bahasa indonesia'
  },
  IT: {
    CODE: 'it',
    TEXT: '意大利语',
    TRANSLATION: 'lingua italiana'
  },
  JP: {
    CODE: 'jp',
    TEXT: '日语',
    TRANSLATION: '日本語'
  },
  KR: {
    CODE: 'kr',
    TEXT: '韩语',
    TRANSLATION: '한국어'
  },
  PT: {
    CODE: 'pt',
    TEXT: '葡萄牙语',
    TRANSLATION: 'Portugues'
  },
  RU: {
    CODE: 'ru',
    TEXT: '俄语',
    TRANSLATION: 'русский'
  },
  TH: {
    CODE: 'th',
    TEXT: '泰语',
    TRANSLATION: 'ไทย'
  },
  TR: {
    CODE: 'tr',
    TEXT: '土耳其语',
    TRANSLATION: 'Türk dili'
  },
  VN: {
    CODE: 'vn',
    TEXT: '越南语',
    TRANSLATION: 'Thổ'
  },
  ZH_CN: {
    CODE: 'zh_CN',
    TEXT: '简体中文',
    TRANSLATION: '简体中文'
  },
  ZH_TW: {
    CODE: 'zh_TW',
    TEXT: '繁体中文',
    TRANSLATION: '繁體中文'
  }
}

export function getCodeList () {
  return Object.values(LANG).map((v) => {
    return v.CODE
  })
}

export function getCodeAndTranslationList() {
  let list = {}
  Object.keys(LANG).map(v => list[LANG[v].CODE] = LANG[v].TRANSLATION)
  return list
}
