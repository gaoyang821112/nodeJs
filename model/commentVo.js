/**
 * Created by ZMoffice on 2016/4/21.
 */
function CommentVo(comment, page,pageSize, total) {
    this.comments = comment;
    this.pageNum=page;
    this.pageSize=pageSize;
    this.total = total;
}

module.exports = CommentVo;
