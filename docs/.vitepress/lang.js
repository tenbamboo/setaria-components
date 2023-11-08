;(() => {
  const supportedLangs = window.supportedLangs
  const cacheKey = 'preferred_lang'
  const defaultLang = 'zh-CN'
  // docs supported languages
  const langAlias = {
    en: 'en-US',
    fr: 'fr-FR',
    es: 'es-ES',
    zh: 'zh-CN',
  }
  let userPreferredLang = localStorage.getItem(cacheKey) || navigator.language
  const language =
    langAlias[userPreferredLang] ||
    (supportedLangs.includes(userPreferredLang)
      ? userPreferredLang
      : defaultLang)
  localStorage.setItem(cacheKey, language)
  userPreferredLang = language
  if (
    !location.pathname.startsWith(`/setaria-components/${userPreferredLang}`)
  ) {
    const toPath = [`/setaria-components/${userPreferredLang}`]
      .concat(location.pathname.split('/').slice(2))
      .join('/')
    location.pathname =
      toPath.endsWith('.html') || toPath.endsWith('/')
        ? toPath
        : toPath.concat('/')
  }
  if (navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'LANG',
      lang: userPreferredLang,
    })
  }
})()
