const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const bodyParser = require('body-parser')
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
const uri = "mongodb+srv://connorwilson:wHFsAcQVGta4voey@cs6999toolproject.hyzzujg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let toAppear = ""; 

let currentStudent = -1;
let currentLab = -1;
let currentTask = -1;


app.post("/", function(req, res){
	if(req.body.pointID != ''){
		let parsePoints = req.body.pointID.split(',');
		currentStudent = parseInt(req.body.studentID) - 1234567;
		currentLab = parseInt(req.body.labID);
		currentTask = parseInt(req.body.taskID);

	
		for(let i = 0; i < parsePoints.length; i++){
			let student = toAppear[parseInt(req.body.studentID) - 1234567];
			let lab = student.labs[parseInt(req.body.labID)];
			let task = lab.tasks[parseInt(req.body.taskID)];
			task.points[parseInt(parsePoints[i])].completed = true;
		}
		updateStudent(toAppear[parseInt(req.body.studentID) - 1234567], parseInt(req.body.studentID));
	}
	
  
	res.redirect("/");

});

async function updateStudent(student, internalID){
	try {  
	    const database = client.db("grader_db");
	    const studentDatabase = database.collection("students");
	    
	    const query = { id: internalID };
	    const uploadNewResult = studentDatabase.updateOne(query,
		{
		  $set: {
		    labs: student.labs
		  }
		});

	  } finally{

	  }
}


app.get('/', (req, res) => {
	res.render('index', {
		students: toAppear,
		currentStudent: currentStudent,
		currentLab: currentLab,
		currentTask: currentTask
	});
});




async function test(){
	const uri = "mongodb+srv://connorwilson:wHFsAcQVGta4voey@cs6999toolproject.hyzzujg.mongodb.net/?retryWrites=true&w=majority";
  	const client = new MongoClient(uri);
	const database = client.db("grader_db");
    const studentDatabase = database.collection("students");
    const report = await studentDatabase.find({}).toArray();
    toAppear = report;
    console.log("Data loaded");
}

app.listen(4000, function() {
	test();
    console.log("server is running");
});

