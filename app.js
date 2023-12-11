//jshint esversion:6
const _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const post_item=[];

const homeStartingContent = "The home page serves as the central hub where visitors can explore a curated collection of blog posts. Each post, dynamically rendered from your Node.js backend, includes a title, a brief content preview, and a 'Read More' link for extended reading.A well-designed layout showcases the latest and most relevant content, making it easy for users to discover interesting topics. Navigation links in the header provide seamless access to other sections of the site.";
const aboutContent = "The about page provides an insight into the background, mission, and values of your blog. It offers a narrative that introduces visitors to the creators or contributors behind the content, establishing a personal connection with the audience.";
const contactContent = "The contact page offers a means for visitors to get in touch with the blog administrators or authors. It may include a contact form, email addresses, or social media links, fostering communication and engagement with the audience.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
res.render("home.ejs",{Text:homeStartingContent , posts:post_item});
});

app.get("/posts/:topic", function(req, res) {
  const requested_title = _.lowerCase(`${req.params.topic}`);
  post_item.forEach(function(post) {
    const stored_title = _.lowerCase(`${post.title}`);
    console.log("Comparing:", stored_title, requested_title);
    if (stored_title === requested_title) {
  res.render("post",{
    title:post.title,
    content:post.content
  });
    }
  });
});
app.get("/about",function(req,res){
  res.render("about.ejs",{Text:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact.ejs",{Text:contactContent});
});   

 
app.get("/compose",function(req,res){
  res.render("compose.ejs");
});

app.post("/compose",function(req,res){
  var post={
    title:req.body.Blog,
    content:req.body.multi
  };
  post_item.push(post);
res.redirect("/");
});





app.listen(process.env.PORT ||3000, function() {
  console.log("Server started on port 3000");
});
