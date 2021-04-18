const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Grader {
    constructor() {
        rl.question("What is the student's name? ", name => {
            this.name = name;

            rl.question("What is the assignment's name? ", assignment => {
                this.assignment = assignment;

                rl.question(`What grade did ${this.name} receive for ${this.assignment}? `, grade => {
                    this.grade = grade;
                    this.returnFinalResults();
                    rl.close();
                });
            });
        });
    }

    returnLetterGrade = function () {
        if (this.grade >= 70 && this.grade <= 79.9)
            return "C";
        else if (this.grade >= 80 && this.grade <= 89.9)
            return "B";
        else if (this.grade >= 60 && this.grade <= 69.9)
            return "D";
        else if (this.grade >= 90 && this.grade <= 100)
            return "A";
        else if (this.grade < 60 && this.grade > 0)
            return "F";
        else
            return null;
    }

    returnFinalResults = function () {
        if (this.returnLetterGrade() != null) {
            console.log(`${this.name} earned a(n) ${this.returnLetterGrade()} for assignment: ${this.assignment}`);
        } else
            console.log('Invalid grade entered for this assignment');
    }
}
module.exports = Grader;

grader = new Grader()