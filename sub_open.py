import pysubs2
subsJ = pysubs2.load("ja.ass", encoding="utf-8")
subsE = pysubs2.load("eng.ssa", encoding="utf-8")
#subs.shift(s=2.5)
#for line in subs:
#    line.text = "{\\be1}" + line.text
#subs.save("my_subtitles_edited.ass")

# Visualize enumerate #print(list(enumerate("iamtheverymodelofamodernmajorgeneral")))

currentJ = 0
currentE = 0
offset_tolerance = 1000
doubleUp_tolerance = 1500


def getIndexOffset(subsJ, subsE):
    for idx_j, item_j in enumerate(subsJ):
        for idx_e, item_e in enumerate(subsE):
            if abs(item_j.start - item_e.start) < offset_tolerance:
                print "Found Offset! X: {} Y: {}".format(idx_j, idx_e)
                return idx_j, idx_e

def isBlank(offset=0):
    global currentJ, currentE
    # Checks if the current fields are malformed or blank
    if (subsJ[currentJ + offset].start == 0 or subsJ[currentJ + offset].text == ''):
        #print "J BLANK SPOT - INCREMENT J"
        currentJ = currentJ + 1
        return 1
    if (subsE[currentE + offset].start == 0 or subsE[currentE + offset].text == ''):
        #print "E BLANK SPOT - INCREMENT E"
        currentE = currentE + 1
        return 1
    return
    
def isNextAPair():
    global currentJ, currentE
    # Checks if the next pair goes together. Useful for doubling up or not.
    #print subsJ[currentJ + 1].start, subsE[currentE + 1].start, offset_tolerance
    if ( abs(subsJ[currentJ + 1].start - subsE[currentE + 1].start) < offset_tolerance):
        return 1
    else:
        return 0

def shouldDouble():
    global currentJ, currentE
    # Check if you can double up the next item on the current item (via times)
    # If the difference between the next items are greater than the tolerance, then continue...
    if ( abs(subsJ[currentJ + 1].start - subsE[currentE + 1].start) > doubleUp_tolerance ):
        #print "Next SubsPair time diff > tolerance"
        # If the next J text ends around the current E text, then shouldDouble!
        if ( abs(subsJ[currentJ + 1].end - subsE[currentE].end) < doubleUp_tolerance):
            #print "Next subsJ.end matchs current subsE.end"
            # If the next set are supposed to be paired, dont shouldDouble. Else, shouldDouble!
            if isNextAPair():
                #print "j-e Next subPair IS a pair"
                return 0
            else:
                #print "j-e Next subPair is NOT a pair, shouldDouble!"
                return 1
        # If the next E text ends around the current J text, then shouldDouble!
        elif ( abs(subsE[currentE + 1].end - subsJ[currentJ].end) < doubleUp_tolerance):
            #print "Next subsE.end matchs current subsJ.end"
            if isNextAPair():
                #print "e-j Next subPair IS a pair"
                return 0
            else:
                #print "e-j Next subPair is NOT a pair, shouldDouble!"
                return 2
        else:
            #print "--------------------------Difference but not doubleAble --------------------"
            print abs(subsJ[currentJ + 1].start - subsE[currentE + 1].start)
            while isBlank(1):
                print "was blank"
            #print "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
            #if (abs(subsJ[currentJ + 1].start - subsE[currentE + 1].start) > offset_tolerance * 2):
                #print "//////////////////////////////////////////////////////////////////"
            return 0
    else:
        #print "Totall Fine"
        return 0
    print "---------------------------caught1---------------------------------------"
    return 0

def findNextPair():
    # like getIndexOffset, but for the next pair
    while abs( subsJ[currentJ + 1] - subsE[currentE + 1] > offset_tolerance):
        #increment
        
        print 'test'
    return
 
def printPair():
    global currentJ, currentE
    result = shouldDouble()
    if result == 1:
        # print current J
        # print next J & increment currentJ
        # print current E
        # increment both
        
        print subsJ[currentJ].text
        print subsJ[currentJ + 1].text
        print subsE[currentE].text
        currentJ += 2
        currentE += 1
        
    elif result == 2:
        # print current E
        # print next E & increment currentE
        # print current J
        # increment both
        
        print subsE[currentE].text
        print subsE[currentE + 1].text
        print subsJ[currentJ].text
        currentJ += 1
        currentE += 2
        
    elif result == 0:
        # print current E
        # print current J
        # increment both
        
        print subsJ[currentJ].text
        print subsE[currentE].text
        currentJ += 1
        currentE += 1
        
    return


def main():
    global currentJ, currentE
    print '\n\n'
    
    exit = ''
    currentJ, currentE = getIndexOffset(subsJ, subsE)
    while (exit != 'q'):
        isBlank()
        printPair()
        #indNextPair()
        #print 'currently j&e: {}, {}'.format(currentJ, currentE)
        exit = raw_input()



main()




'''
futue: write a function that increments subsE until it is within 3 sec of subsJ. If list runs out, increment subsJ. If it finds it, increment subsJ


def printAllPairs(subsJ, subsE):
    global offsetJ, offsetE
    
    for idx_j, item_j in enumerate(subsJ):
        if (subsJ[offsetJ + idx_j].start == 0 or subsJ[offsetJ + idx_j].text == ''):
            print "J BLANK SPOT - INCREMENT J"
            offsetJ = offsetJ + 1
        elif (subsE[offsetJ + idx_j].start == 0 or subsE[offsetJ + idx_j].text == ''):
            print "E BLANK SPOT - INCREMENT E"
            offsetE = offsetE + 1
        
        print subsJ[offsetJ + idx_j]
        print subsE[offsetE + idx_j]
        print '\n'

'''