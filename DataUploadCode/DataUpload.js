const { MongoClient, ServerApiVersion } = require('mongodb');

const Point = require('./Point.js');
const Task = require('./Task.js');
const Lab = require('./Lab.js');
const Student = require('./Student.js');
const fs = require("fs");
const readline = require("readline");

let pointData = [];
let taskData = [];
let labData = [];
let studentData = [];

let students = [];

let flags = 0;

function cleanData(data){
	let toReturn = [];
	let badData = data.split("\r\n");
  	
  	for(let i = 0; i < badData.length; i++){
  		toReturn[i] = badData[i].split(",");
  	}
  	return toReturn;
}

fs.readFile("Points.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  else{
  	pointData = cleanData(data);
  	flags++;
  	complete();
  } 
});


fs.readFile("Tasks.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  else{
  	taskData = cleanData(data);
  	flags++;
  	complete();
  }
});

fs.readFile("Labs.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  else{
  	labData = cleanData(data);
  	flags++;
  	complete();
  }
});

fs.readFile("Students.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  else{
  	studentData = cleanData(data);
  	flags++;
  	complete();
  }
});

function complete(){
	if(flags == 4){
		createStudents();
		writeStudents();
	}
}

function createStudents(){
	//Creates Students
	for(let i = 1; i < studentData.length; i++){
		students[students.length] = new Student(parseInt(studentData[i][0]), studentData[i][1]);
	}

	//Adds unique labs for each student
	for(let i = 0; i < students.length; i++){
		for(let j = 1; j < labData.length; j++){
			students[i].addLab(new Lab(parseInt(labData[j][0]), labData[j][1]));
		}
	}

	//Adds unique tasks for each lab
	for(let i = 0; i < students.length; i++){
		for(let k = 1; k < taskData.length; k++){
			let newTask = new Task(parseInt(taskData[k][0]), taskData[k][1]);
			students[i].labs[Math.floor(newTask.id/100)-1].addTask(newTask);
		}
		//console.log(students[i].toString());
	}

	//Adds unique points for each task
	for(let i = 0; i < students.length; i++){
		for(let k = 1; k < pointData.length; k++){
			let newPoint = new Point(parseInt(pointData[k][0]), pointData[k][1], pointData[k][2], parseInt(pointData[k][3]));
			var lab = (students[i].labs[Math.floor(newPoint.id/10000) -1]);
			let taskVal = Math.floor(newPoint.id/100)%100;
			taskVal -= 1;
			lab.tasks[taskVal].addPoint(newPoint);
		}
	}
}

function writeStudents(){
	const uri = "mongodb+srv://connorwilson:wHFsAcQVGta4voey@cs6999toolproject.hyzzujg.mongodb.net/?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
	async function run() {
  		try { 
		    const database = client.db("grader_db");
		    const connection = database.collection("students");
		    for(let i = 0; i < students.length; i++){
		    	const result = await connection.insertOne(students[i]);
		    }

		    
		    
		} finally {
		    await client.close();
		}
	}
	run().catch(console.dir);
}


