import os
def html(name):
    return '''
     <img
        class="main-window-imgs"
        src="./src/images/EE20/{0}"
    />
    '''.format(name)

def src(name :str):
    return name[0:name.find('.')] + ":this.allImgsDom[index++],\n"


def dom(name):
    name1 = name[0: name.find(".")]
    return f'{name1} : new Dom("{name1}"),\n'


sneha_folder_path = "E:\\office project\\vlabs-EE\\EE20\\src\\images\\EE20\\new\\"

# utkarsh_folder_path = "S:\\Users\\Utkarsh\\Documents\\Office Main\\All Projects Repo\\vlabs-EE\\EE4\\src\\images\\exp4\\part2\\"

names = os.listdir(sneha_folder_path)

# namesStr = ''
# for name in names:
#     namesStr = namesStr + f'{name}\n'

# open("temp3.txt","w").write(namesStr)

# BASE_COUNT = 13
# count = 168

srcs = ''
doms = ''
htms = ''
for i in range(len(names)):
    htms = htms + html(names[i])
    doms = doms + dom(names[i])
    srcs = srcs + src(names[i])

        


# open("temp.txt","w").write()
allItems = f'{htms}\n\n{srcs}\n\n{doms}'
open("temp2.txt","w").write(allItems)

print("Done 👍")
# print(os.__path__)
#            