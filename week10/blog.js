const express = require("express");
const path = require("path")
const pool = require("../config");
const multer = require('multer')


router = express.Router();


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })


router.get("/blogs/search", async function (req, res, next) {
  // Your code here
  try{
    const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE title LIKE ?", [
      `%${req.query.search}%`,
    ]);

    return res.json(rows);

  } catch (err) {
    console.log(err)
    return next(err);
  }
});

// POST - create new blog with single upload file
router.post('/blogs', upload.single('myImage'), async function (req, res, next) {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    const pinned = req.body.pinned;

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
      let results = await conn.query(
        "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
        [title, content, status, pinned]
      )
      const blogId = results[0].insertId;

      await conn.query(
        "INSERT INTO images(blog_id, file_path) VALUES(?, ?);",
        [blogId, file.path.substr(6)])

      await conn.commit()
      res.send("success!");
    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      conn.release();
    }
});

router.get("/blogs/create", async function (req, res, next) {
  res.render('blogs/create')
});

router.post("/blogs", async function (req, res, next) {
  // Your code here
  console.log(req.body)
  res.redirect('/')
});

router.get("/blogs/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM comments left outer join images on comments.id = images.comment_id WHERE comments.blog_id=? order by comment_date", [
    req.params.id,
  ]);
  const promise3 = pool.query("SELECT * FROM images WHERE blog_id=? and comment_id is null", [
    req.params.id,
  ]);

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const blogs = results[0];
      const comments = results[1];
      const images = results[2];
      res.render("blogs/detail", {
        blog: blogs[0][0],
        comments: comments[0],
        images: images[0],
        error: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/blogs/:id', upload.single('myImage'), async (req, res, next) => {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const file = req.file;

    if (file) {
      await conn.query(
        "UPDATE images SET file_path=? WHERE id=?",
        [file.path, req.params.id])
    }

    await conn.query('UPDATE blogs SET title=?,content=?, pinned=?, blogs.like=?, create_by_id=? WHERE id=?', [req.body.title, req.body.content, req.body.pinned, req.body.like, null, req.params.id])
    conn.commit()
    res.json({ message: "Update Blog id " + req.params.id + " Complete" })
  } catch (error) {
    await conn.rollback();
    return next(error)
  } finally {
    console.log('finally')
    conn.release();
  }
});

router.delete('/blogs/:id', async (req, res, next) => {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    // check blog has comment?
    let comments = await conn.query('SELECT * FROM comments WHERE blog_id=?', [req.params.id])

    if (comments[0].length > 0) {
      res.status(409).json({ message: "Can't Delete because this blog has comment!!!" })
    } else {
      await conn.query('DELETE FROM blogs WHERE id=?;', [req.params.id]) // delete blog
      await conn.query('DELETE FROM images WHERE blog_id=?;', [req.params.id]) // delete image
      await conn.commit()
      res.json({ message: 'Delete Blog id ' + req.params.id + ' complete' })
    }
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});

exports.router = router;
