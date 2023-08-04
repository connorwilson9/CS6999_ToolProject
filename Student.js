class Student{
	constructor(id, name){
		this.id = id;
		this.name = name;
		this.labs = [];
		this.countLabs = 0;
	}

	addLab(lab){
		this.labs[this.countLabs] = lab;
		this.countLabs = this.countLabs + 1;
	}

	totalGrade(){
		let sum = 0;
		for(let i = 0; i < this.countLabs; i++){
			sum += this.labs[i].totalGrade();
		}
	}


	toString(){
		let toReturn = this.id + ": " + this.name + "\n";
		for(let i = 0; i < this.labs.length; i++){
			toReturn += "\t" + this.labs[i].toString();
		}
		return toReturn;
	}
}

module.exports = Student;
