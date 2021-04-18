class Grader
    def initialize()
        puts "What is the student's name? "
        @name = gets

        puts "What is the assignment's name? "
        @assignment = gets

        puts "What grade did they receive for this assignment?"
        @grade = gets.to_f
    end

    def returnLetterGrade()
        if @grade >= 70 and @grade <= 79.9
            return "C"
        elsif @grade >= 80 and @grade <= 89.9
            return "B"
        elsif @grade >= 60 and @grade <= 69.9
            return "D"
        elsif @grade >= 90 and @grade <= 100
            return "A"
        elsif @grade < 60 and @grade >= 0
            return "F"
        else
            return "Invalid"
        end
    end

    def returnFinalResults()
        if returnLetterGrade() != "Invalid"
            puts @name + ' earned a(n) ' + returnLetterGrade() + ' for assignment: ' + @assignment
        else
            puts 'Invalid grade entered for this assignment'
        end
    end
end

grader = Grader.new
grader.returnFinalResults()