# ! This is the python file to automate the jobs:
# Firstly
# a) Adding this Image to DB.json folder
# Than
# b) Adding img to index.html
# c) Adding this img to Src.js for accessing the dom
import json
import os

# this class is for accessing and managing the DB.json file
class DB:
    # default path to json file
    DB_FILE_PATH = r".\database\DB.json"

    class Keys:
        imagesPath = "imagesPath"
        images = "images"
        videosPath = "videosPath"
        videos = "videos"
        indexFilePath = "indexFilePath"
        srcJSFilePath = "srcJSFilePath"

    class Data:
        def __init__(self, dbData) -> None:
            self.images = dbData[DB.Keys.images]
            self.imagesPath = dbData[DB.Keys.imagesPath]
            self.imagesSrcFull = self.getImagesWithfullSrc()
            self.imageNamesOnly = self.getOnlyImageName()
            self.videos = dbData[DB.Keys.videos]
            self.videosPath = dbData[DB.Keys.videosPath]
            self.videosSrcFull = self.getVideosWithfullSrc()
            self.indexFilePath = dbData[DB.Keys.indexFilePath]
            self.srcJSFilePath = dbData[DB.Keys.srcJSFilePath]
            self.data = dbData

        def getOnlyImageName(self) -> list[str]:
            imageNamesOnly = []

            for image in self.images:
                image = image[:image.rfind('.')]
                imageNamesOnly.append(image)
            
            return imageNamesOnly

        def getImagesWithfullSrc(self) -> list[str]:
            imagesName = self.images
            imagePath = self.imagesPath
            imagesFullSrc = []

            for i in range(len(imagesName)):
                imgSrc = f"{imagePath}{imagesName[i]}"
                imagesFullSrc.append(imgSrc)

            return imagesFullSrc

        def getVideosWithfullSrc(self) -> list[str]:
            videosName = self.videos
            videosPath = self.videosPath
            videosFullSrc = []

            for i in range(len(videosName)):
                videoSrc = f"{videosPath}{videosName[i]}"
                videosFullSrc.append(videoSrc)

            return videosFullSrc

        def __str__(self) -> str:
            return str(self.data)

    def __init__(self, dbFilePath=DB_FILE_PATH) -> None:
        self.setDefaultData(dbFilePath)

    def setDefaultData(self, dbFilePath):
        defaultJSON = {
            "indexFilePath": "./index.html",
            "srcJSFilePath": "./js/Src.js",
            "imagesPath": "./src/images/step/",
            "images": [],
            "videosPath": "./src/videos/step/",
            "videos": [],
        }
        # first add default data to json
        self.updateData(defaultJSON)
        self.loadData(dbFilePath)

        # then send dyanmic images and videos
        self.DATA.update({
            "images": os.listdir(self.data.imagesPath),
            "videos": os.listdir(self.data.videosPath),
        })
        # save it
        self.updateData(self.DATA)
        self.loadData(dbFilePath)

    def loadData(self, dbFilePath: str):
        with open(dbFilePath, "r") as jsonDBFile:
            self.DATA = json.load(jsonDBFile)
            self.data = DB.Data(self.DATA)
            jsonDBFile.close()

    def updateData(self, newDataObject):
        with open(DB.DB_FILE_PATH, "w") as jsonDBFile:
            json.dump(newDataObject, jsonDBFile, indent=4, separators=(",", ": "))
            jsonDBFile.close()

    def __del__(self):
        pass

class Files: 

    def __init__(self) -> None:
        self.images = os.listdir(db.data.imagesPath)
        self.videos = os.listdir(db.data.videosPath)
        with open(db.data.indexFilePath, 'r') as file:
            self.indexHTMLData = file.readlines()
            file.close()
            
        with open(db.data.srcJSFilePath, 'r') as file:
            self.srcJSData = file.readlines()
            file.close()

        # self.fileToJsonObject()

    def updateIndexFile(self, newFileDataInLines: list[str]):
        with open(db.data.indexFilePath, 'w') as indexFile:
            indexFile.writelines(newFileDataInLines)
            indexFile.close()

    def updateSrcJSFile(self, newFileDataInLines: list[str]):
        with open(db.data.srcJSFilePath, 'w') as srcJSFile:
            srcJSFile.writelines(newFileDataInLines)
            srcJSFile.close()

    def fileToJsonObject(self):
        db.DATA.update({
            "images": self.images,
            "videos": self.videos,
        })
        db.updateData(db.DATA)

class Generate:
    INDEX_TAB_SPACE = "              "
    SRC_TAB_SAPCE = "    "

    def __init__(self) -> None:
        self.addHTMLImgTagsToIndex()
        self.addSrcToSrcJS()

    def addHTMLImgTagsToIndex(self):
        classToFind = "step-images"
        start, end = self.findStepMediaStartEnd(files.indexHTMLData, classToFind)

        newImgTags = [
            f"{self.INDEX_TAB_SPACE}<!-- * Step Images will be added here -->\n"
        ]
        # generate image
        for i in range(len(db.data.imagesSrcFull)):
            imgSrc = db.data.imagesSrcFull[i]
            imgName = db.data.imageNamesOnly[i]
            imgTag = f'{self.INDEX_TAB_SPACE}<img id="{imgName}" src="{imgSrc}" class="main-window-imgs"/>\n'
            newImgTags.append(imgTag)

        # add it to index
        oldIndexContent = files.indexHTMLData
        newIndexContent = oldIndexContent[:start+1] + newImgTags + oldIndexContent[end:]

        # save new content to file
        files.updateIndexFile(newIndexContent)

    def addSrcToSrcJS(self):
        classToFind = "Src = {"
        start, end = self.findStepMediaStartEnd(files.srcJSData, classToFind, endTag='}')
        newSrcJS = [
            f"{self.SRC_TAB_SAPCE}// * New src content added here\n"
        ]
        # generate image
        for imageName in db.data.imageNamesOnly:
            newDomElement = f'{self.SRC_TAB_SAPCE}{imageName}: new Dom("#{imageName}"),\n'
            newSrcJS.append(newDomElement)

        # add it to srcJS
        oldSrcJSContent = files.srcJSData
        newSrcJSContent = oldSrcJSContent[:start+1] + newSrcJS + oldSrcJSContent[end:]

        # save thie new content to file
        files.updateSrcJSFile(newSrcJSContent)

    def findStepMediaStartEnd(self,fileDataLines, toFind: str, endTag = '</div>') -> tuple[int]:
        startIdx = -1
        endIdx = -1
        for i in range(len(fileDataLines)):
            if fileDataLines[i].__contains__(toFind):
                startIdx = i
                # now find after this i'th index
                for j in range(i+1, len(fileDataLines)):
                    if fileDataLines[j].__contains__(endTag):
                        endIdx = j
                        return (startIdx, endIdx)



db = DB()
files = Files()

generate = Generate()