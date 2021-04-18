import sys

name = raw_input("What is your name?")

f = open("myfile.txt", "w")
# f.write("here is my text"+name)
# f.close()

# f.open("myfile.txt", "r")
print(f.read())
f.close()