var express = require('express');
var router = express.Router();

var comment_service = require('../service/comment_service.js');

/* GET home page. */
router.get('/comment/:articleId/:pageNum', function(req, res, next) {
  comment_service.findCommentByArticleIdPagesForPage(req, res);
});
/* GET home page. */
router.get('/comment/:articleId', function(req, res, next) {
  comment_service.findCommentByArticleIdPagesForPage(req, res);
});

module.exports = router;
