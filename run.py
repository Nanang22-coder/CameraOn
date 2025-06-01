import re
hexa = "5f7066"
file  = open("tes.html","r")
file = file.read()
print(len(file))

file2 = re.sub("_0x45bc2b","a",file)
file3 = re.sub("_0x3f2da9","b",file)

byte = bytes.fromhex(hexa)
string = byte.decode("utf-8")
print('\x57\x6f\x72\x6c\x64')