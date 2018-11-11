import axios from "axios";

export default {

  /*
    add method for scrape
  */

  // gets all FakeArticles, see server-side (fakeArticlesController) for implementing paging and search input, send in req.query.
  getFakeArticles: () => (
    axios.get("/api/fake-articles")
  ),
  // Get fakeArticle by id
  getFakeArticleById: id => (
    axios.get(`/api/fake-articles/${id}`)
  ),
  // updates Score of fakeArticle's associated RealArticle, sub-document id needs to be supplied - upvote/downvote
  updateScore: (id, data) => (
    axios.put(`/api/fake-articles/update-score/${id}`, data)
  ),
  getRealArticles: () => (
    axios.get("/api/real-articles")
  ),
  getRealArticleById: id => (
    axios.get(`/api/real-articles/${id}`)
  ),
  //user specific routes
  getAllUserSavedArticles: userId => (
    axios.get(`api/users/saved-articles/${userId}`)
  ),
  updateUserSavedArticles: (id, data, articleType) => {
    if (articleType === "fake") {
      return axios.post(`/api/users/saved-fake-articles/${id}`, data);
    } else if (articleType === "real") {
      return axios.post(`/api/users/saved-real-articles/${id}`, data);
    }
  },
  removeUserSavedArticles: (id, data, articleType) => {
    if (articleType === "fake") {
      return axios.delete(`/api/users/saved-fake-articles/${id}`, data);
    } else if (articleType === "real") {
      return axios.delete(`/api/users/saved-real-articles/${id}`, data);
    }
  },
  addToVotedOn: (id, data) => (
    axios.post(`/api/users/votedOn/${id}`, data)
  ),
  removeFromVotedOn: (id, data) => (
    axios.delete(`/api/users/votedOn/${id}`, data)
  )
};
