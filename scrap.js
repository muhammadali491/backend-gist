const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeExcelQuestions() {
  try {
    let allQuestions = [];

    for (let page = 1; page <= 10; page++) {
      // adjust pages
      const url = `https://testpointpk.com/subcategory-mcqs/ms-excel?page=${page}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      // Inspect site HTML to get exact selectors
      $(".question-title").each((i, el) => {
        const question = $(el).text().trim();
        allQuestions.push(question);
      });
    }

    console.log("Total Questions:", allQuestions.length);

    // Filter for Insert & Page Layout
    const insertQs = allQuestions.filter((q) =>
      q.toLowerCase().includes("insert")
    );
    const pageLayoutQs = allQuestions.filter(
      (q) =>
        q.toLowerCase().includes("columns") ||
        q.toLowerCase().includes("margin") ||
        q.toLowerCase().includes("orientation") ||
        q.toLowerCase().includes("header") ||
        q.toLowerCase().includes("footer")
    );

    console.log("Insert-related:", insertQs.length);
    console.log("Page Layout-related:", pageLayoutQs.length);
  } catch (err) {
    console.error(err);
  }
}

scrapeExcelQuestions();
