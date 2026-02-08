const stopWords = [
  'the','a','an','is','are','was','were','be','been','being',
  'what','when','where','who','why','how','which',
  'do','does','did','can','could','will','would','should',
  'i','you','we','they','he','she','it','my','your',
  'to','of','in','on','at','for','with','from','by',
  'and','or','but','not','so','if','than','that','this'
]

function cleanText(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
}

function calculateScore(userKeywords, faqQuestion = "", faqAnswer = "") {
  const faqKeywords = cleanText(faqQuestion + " " + faqAnswer)

  let score = 0
  for (const keyword of userKeywords) {
    if (faqKeywords.includes(keyword)) score++
  }

  return score
}

export function searchFAQs(query = "", faqs = []) {
  const userKeywords = cleanText(query)

  if (userKeywords.length === 0) {
    return faqs.slice(0, 3)
  }

  return faqs
    .map(faq => ({
      ...faq,
      score: calculateScore(
        userKeywords,
        faq?.question,
        faq?.answer
      )
    }))
    .sort((a,b) => b.score - a.score)
    .slice(0,3)
    .map(({score, ...faq}) => faq)
}
