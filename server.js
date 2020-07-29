var path = require("path")
var express = require("express");
var fs = require("fs")
var db = require("./db/db.json")


var app = express()
var PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"))



app.get("/notes", function(req,res) {
res.sendFile(path.join(__dirname, "/public/notes.html"),
);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


});

app.get("/api/notes", function(req,res){

    let note = fs.readFileSync("./db/db.json","utf8");

    let noteParse = JSON.parse(note)

    return res.json(noteParse);


});






//app.delete('notes/:id', function(req,res) {
//res.sendFile(path.join(__dirname, "notes.html"));
//});


app.delete("/api/notes/:id" , function(req, res){

    console.log("i hear you")

    let paramsID = parseInt(req.params.id);

    let createdNotes = fs.readFileSync("./db/db.json","utf8")

    let parsedCreatedNotes = JSON.parse(createdNotes)

    let itemRemover = parsedCreatedNotes.filter(item => item.id != paramsID)

    itemRemover.forEach(element => element.id = itemRemover.indexOf(element));

    let noteString = JSON.stringify(itemRemover);

    res.json(parsedCreatedNotes)

    
    fs.writeFileSync("./db/db.json", noteString);

    //console.log(req.params.id)
   

   

   
});

app.post("/api/notes",function(req,res) {
    
    

    console.log(req.body)

    let createdNotes = fs.readFileSync("./db/db.json","utf8")

    let parsedCreatedNotes = JSON.parse(createdNotes)

    req.body.id = parsedCreatedNotes.length + 1;
    parsedCreatedNotes.push(req.body)
    
    //newNote.id = parsedCreatedNotes.length + 1;

    fs.writeFileSync("./db/db.json", JSON.stringify(parsedCreatedNotes))

    return res.json(parsedCreatedNotes)

});

app.get("*" , function(req, res){
   res.redirect("/");
});


app.listen(PORT, function(){
    console.log("server listening on port " + PORT);
});




