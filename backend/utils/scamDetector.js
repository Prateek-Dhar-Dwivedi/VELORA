function calculateTrustScore(job) {
  let score = 100;

  const text = `
    ${job.title || ""}
    ${job.description || ""}
    ${job.company || ""}
  `.toLowerCase();

  const suspiciousWords = [
    "registration fee",
    "processing fee",
    "pay first",
    "investment required",
    "earn money fast",
    "quick money",
    "whatsapp only",
    "telegram",
    "guaranteed income",
    "work from phone"
  ];

  suspiciousWords.forEach((word) => {
    if (text.includes(word)) {
      score -= 20;
    }
  });

  const trustedCompanies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Mastercard",
    "Wikimedia Foundation"
  ];

  if (trustedCompanies.includes(job.company)) {
    score += 10;
  }

  if (!job.company) {
    score -= 15;
  }

  if (
    job.salary &&
    (
      job.salary.includes("$500k") ||
      job.salary.includes("$1m")
    )
  ) {
    score -= 20;
  }

  // Keep score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return score;
}

module.exports = calculateTrustScore;