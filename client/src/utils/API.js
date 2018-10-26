import axios from "axios";

export default {

  /*
    add method for scrape
  */

  // Gets all FakeArticles, see server-side (fakeArticlesController) for implementing paging and search input, send in req.query.
  getFakeArticles: () => (
    axios.get("/api/fake-articles")
  ),
  // Get fakeArticle by id
  getFakeArticle: id => (
    axios.get(`/api/fake-articles/${id}`)
  ),
  
  // update Score of fakeArticle's associated RealArticle(s) - upvote/downvote
  updateScore: (id, data) => (
    axios.put(`/api/fake-articles/update-score/${id}`, data)
  )
};
