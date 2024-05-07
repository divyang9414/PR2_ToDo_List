const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.static('public'));

app.set("view engine", "ejs");

let ind = 1;

let taskInfo = [
    {
        id: 1,
        taskName: "Start by adding A ne Task"
    }
]

app.post("/insertData", (req, res) => {
    let editId = req.body.id;
    let { taskName } = req.body;
    if (editId) {
        let edtData = taskInfo.filter((val) => {
            if(val.id == editId){
                val.taskName = taskName;
            }
            return val;
        })
        taskInfo = edtData;
        return res.redirect("/");
    }

    let myObj = {
        id: ++ind,
        taskName: taskName
    };
    taskInfo.push(myObj);
    return res.redirect("/");
})


app.get("/", (req, res) => {
    return res.render("index", {
        givenTask: taskInfo
    })
})

app.get("/editTask", (req, res) => {
    let taskId = req.query.id;
    let filteredData = taskInfo.filter((val) => {
        return val.id == taskId;
    })

    return res.render("edit", {
        givenTask: filteredData[0]
    });
})

app.get("/completeTask", (req, res) => {
    let taskId = req.query.id;
    let myData = taskInfo.filter((val) => {
        return val.id != taskId;
    })

    taskInfo = myData;
    return res.redirect("/")
})

app.listen(port, (error) => {
    if (error) {
        console.log("server not started!");
        return false;
    }
    console.log("server http://localhost:" + port);
})