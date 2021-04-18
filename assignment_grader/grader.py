class Grader:
    def __init__(self):
        self.name = raw_input("What is the student's name? ")
        self.assignment = raw_input("What is the assignment's name? ")
        self.grade = float(
            raw_input("What grade did they receive for this assignment? "))

    def returnLetterGrade(self):
        if self.grade >= 70.0 and self.grade <= 79.9:
            return "C"
        elif self.grade >= 80.0 and self.grade <= 89.9:
            return "B"
        elif self.grade >= 60.0 and self.grade <= 69.9:
            return "D"
        elif self.grade >= 90.0 and self.grade <= 100.0:
            return "A"
        elif self.grade < 60.0 and self.grade >= 0:
            return "F"
        else:
            return "Invalid"

    def returnFinalResults(self):
        if self.returnLetterGrade() != "Invalid":
            print(self.name + ' earned a(n) ' + self.returnLetterGrade() +
                  ' for assignment: ' + self.assignment)
        else:
            print('Invalid grade entered for this assignment')


grader = Grader().returnFinalResults()
