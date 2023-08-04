class Lab{
	constructor(id, language){
		this.id = id;
		this.language = language;
		this.tasks = [];
		this.countTasks = 0;
	}

	addTask(task){
		this.tasks[this.countTasks] = task;
		this.countTasks = this.countTasks + 1;
	}

	totalGrade(){
		let sum = 0;
		for(let i = 0; i < this.countTasks; i++){
			sum += this.tasks[i].totalGrade();
		}
	}

	toString(){
		let toReturn = this.id + ": " + this.language + "\n";
		for(let i = 0; i < this.tasks.length; i++){
			toReturn += "\t" + this.tasks[i].toString();
		}
		return toReturn;
	}
}

module.exports = Lab;
