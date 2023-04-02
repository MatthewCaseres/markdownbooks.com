const getChapterListAsync = require("gitbook-summary-to-path").getChapterListAsync;
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
(async () => {
    const res = await getChapterListAsync("test.md");
    console.log(res);

    const res2 = await getFilePathListAsync("test.md");
    console.log("Path List: " + res2);
})();

