const exp = require('express')
const config = require(`./config.json`);
const port = config.port | 8001;
var proxy = require('express-http-proxy');
const fs = require("fs")
const axios = require('axios')
var apiProxy = exp().use(proxy(config.links.api))
const web = exp();
var redirect = require('./redirect.json');
web.use('/', exp.static('www')).use('/', exp.static('www/pages'))
web.use('/api', apiProxy);
web.use('/r/:id', async (req, res) => {
  redirect = JSON.parse(fs.readFileSync('redirect.json').toString());
  if (redirect[req.params.id]) {
    res.redirect(redirect[req.params.id])
  } else {
    res.redirect("/404");
  }
})
// GITHUB
let cacheTutorials = {

}
let cachePosts = {

}
web.use('/tutorials/:id', async (req, res) => {
  // res.send(req.params.id)
  try {
    let info = {};
    if (cacheTutorials[req.params.id]) {
      if ((new Date().getTime() - cacheTutorials[req.params.id].time) < 1800000) {
        info = cacheTutorials[req.params.id].data;
        console.log(`| Load cache tutorials`)
      } else {
        let git = await axios({ url: `https://api.github.com/repos/${config.repo.docs}/contents/files/${req.params.id}.md?ref=main` })
        info = git.data;
        cacheTutorials[req.params.id] = {
          time: new Date().getTime(),
          data: git.data
        }
        console.log(`| Update cache tutorials`)
      }
    }else {
      let git = await axios({ url: `https://api.github.com/repos/${config.repo.docs}/contents/files/${req.params.id}.md?ref=main` })
      info = git.data;
      cacheTutorials[req.params.id] = {
        time: new Date().getTime(),
        data: git.data
      }
      console.log(`| Create cache tutorials`)
    }
    if (info.message === null && info.message === "Not Found") {
      res.status(404)
      res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/404/index.html`);
      return;
    }
    res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/tutorials/content.html`);

  } catch (e) {
    if (e.response !== null) {
      if (e.response.status === 404) {
        res.status(404)
        res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/404/index.html`);
      } else {

        res.status(500)
        res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/500/index.html`);
        console.log(e);
      }
    } else {
      res.status(500)
      res.sendFile(`${__dirname}\\www\\pages\\500\\index.html`);
      console.log(e);
    }
  }
})
web.use('/posts/:id', async (req, res) => {
  // res.send(req.params.id)
  try {
    let info = {};
    if (cachePosts[req.params.id]) {
      if ((new Date().getTime() - cachePosts[req.params.id].time) < 1800000) {
        info = cachePosts[req.params.id].data;
        console.log(`| Load cache posts`)
      } else {
        let git = await axios({ url: `https://api.github.com/repos/${config.repo.post}/contents/files/${req.params.id}.md?ref=main` })
        info = git.data;
        cachePosts[req.params.id] = {
          time: new Date().getTime(),
          data: git.data
        }
        console.log(`| Update cache posts`)
      }
    }else {
      let git = await axios({ url: `https://api.github.com/repos/${config.repo.post}/contents/files/${req.params.id}.md?ref=main` })
      info = git.data;
      cachePosts[req.params.id] = {
        time: new Date().getTime(),
        data: git.data
      }
      console.log(`| Create cache posts`)
    }
    if (info.message === null && info.message === "Not Found") {
      res.status(404)
      res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/404/index.html`);
      return;
    }
    res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/posts/content.html`);

  } catch (e) {
    if (e.response !== null) {
      if (e.response.status === 404) {
        res.status(404)
        res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/404/index.html`);
      } else {

        res.status(500)
        res.sendFile(`${__dirname.replace(`\\`, `/`)}/www/pages/500/index.html`);
        console.log(e);
      }
    } else {
      res.status(500)
      res.sendFile(`${__dirname}\\www\\pages\\500\\index.html`);
      console.log(e);
    }
  }
})

web.listen(port, () => {
    console.log("| Site up!")
})