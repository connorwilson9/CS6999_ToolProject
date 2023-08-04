class Point{
	constructor(id, title, desc, totalVal){
		this.id = id;
		this.title = title;
		this.desc = desc;
		this.totalVal = totalVal;
		this.completed = false;
		this.gradedBy = null;
	}

	updateCompleted = () => this.completed = !(this.completed);
	updateGradedBy = (name) => this.gradedBy = name;

	toString(){
		return this.id + ": " + this.title + "\n";
	}
}
module.exports = Point;


