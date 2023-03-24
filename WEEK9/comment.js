const express = require("express");
const pool = require("../config");
const router = express.Router();

// Get comment
router.get("/:blogId/comments", function (req, res, next) {});

// Create new comment
router.post("/:blogId/comments", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      "INSERT INTO comments(blog_id ,comment, comments.like ,comment_by_id) VALUES(?,?,?,?)",

      [
        req.params.blogId,
        req.body.comment,
        req.body.like,
        req.body.comment_by_id,
      ]
    );
    return res.json({
      message: "A new comment is added (ID : " + rows.insertId + ")",
    });
  } catch (err) {
    return next(err);
  }
});

// Update comment
router.put("/comments/:commentId", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      "UPDATE comments set comment = ?, comments.like = ?, comment_date = ?, comment_by_id = ?, blog_id = ? where id = ?",
      
      [
        req.body.comment,
        req.body.like,
        req.body.comment_date,
        req.body.comment_by_id,
        req.body.blog_id,
        req.params.commentId,
      ]
    );
    const [rows2, fields2] = await pool.query(
        "SELECT * FROM comments where id = ?" ,
        [req.params.commentId]
    );
    return res.json({
      message: "Comment ID " + req.params.commentId + " is updated.",
      comment: rows2
    });
  } catch (err) {
    return next(err);
  }
});

// Delete comment
router.delete("/comments/:commentId", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      "DELETE FROM comments WHERE id = ?",
      [req.params.commentId]
    );
    return res.json({
      message: "Comment ID " + req.params.commentId + " is deleted.",
    });
  } catch (err) {
    return next(err);
  }
});

// Delete comment
router.put("/comments/addlike/:commentId", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      "UPDATE comments set comments.like = comments.like +1 WHERE id = ?", [
        req.params.commentId
      ]
    );
    const [show, field2] = await pool.query(
        "select * from comments WHERE id = ?", [
            req.params.commentId
        ]
    )
    return res.json({
        blogId: show[0].blog_id,
        commentId: req.params.commentId,
        LikeNum: show[0].like
    });
  } catch (err) {
    return next(err);
  }
});

router.put("/comments/dislike/:commentId", async function(req, res, next){
    try {
        const[row, field]  = await pool.query(
            "UPDATE comments set comments.like = comments.like - 1 where id = ?",
            [req.params.commentId]
        )
        const[row2, field2] = await pool.query(
            "select * from comments where id = ?",
            [req.params.commentId]
        )
        console.log(row2)
        res.json({
             blogId: row2[0].blog_id,
             commentId: row2[0].id,
             LikeNum: row2[0].like,
        })
    } catch (error) {
        console.log(error)
    }
})

exports.router = router;
