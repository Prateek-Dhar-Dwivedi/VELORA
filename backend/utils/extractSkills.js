const skillList = [
  "react",
  "node",
  "mongodb",
  "express",
  "javascript",
  "python",
  "java",
  "c++",
  "html",
  "css",
  "sql",
  "machine learning",
  "deep learning",
  "tensorflow",
  "keras",
  "git",
  "github",
  "docker",
  "aws"
];

function extractSkills(text) {
  const foundSkills = [];

  skillList.forEach((skill) => {
    if (
      text.toLowerCase().includes(
        skill.toLowerCase()
      )
    ) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
}

module.exports = extractSkills;