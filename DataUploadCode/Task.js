class Task{
	constructor(id, style){
		this.id = id;
		this.style = style;
		this.points = [];
		this.countPoints = 0;
	}

	addPoint(point){
		this.points[this.countPoints] = point;
		this.countPoints = this.countPoints + 1;
	}

	totalGrade(){
		let sum = 0;
		for(let i = 0; i < this.countPoints; i++){
			if(this.points[i].completed){
				sum += this.points[i].totalVal;
			}
		}
	}

	toString(){
		let toReturn = this.id + ": " + this.style + "\n";
		for(let i = 0; i < this.points.length; i++){
			toReturn += "\t" + this.points[i].toString();
		}
		return toReturn;
	}
}

module.exports = Task;
