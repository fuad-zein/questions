storeString=[]
priceList=[]

def doublecheck(string,minValue):
    length = len(string)
    if length>minValue:
        newFormatedString = string[0:minValue]
        theRestOfthestring = string[minValue:length]
        return [newFormatedString,theRestOfthestring]
    else:
        return[string]

def fillWithDot(string,string2,isFirst):
    length = len(string)
    inttostr = str(string2)
    length2 = len(inttostr)
    totalLength = length+length2
    if isFirst:
        lengthValue = length+3
    else:
        lengthValue = length

    if(length2+lengthValue>30):
        if isFirst:
            minValue = 30-(length+5)
        else:
            minValue = 30-(length+5)
        arrayofstring = doublecheck(string2,minValue)
        string1 = ''
        if isFirst:
            string1 = '{}{}'.format(string,' : ')
        else:
            for i in range(length+5):
                string1 += '.'
        newString = '{}Rp{}'.format(string1,arrayofstring[0])
        storeString.append(newString)
        fillInSpace(string,arrayofstring[1],False)
    else:
        if isFirst:
            minValue = 30-(length2+length+5)
            string1 = '{}{}'.format(string,' : ')
            spaceString = ''
            for i in range(minValue):
                spaceString+='.'
            newString = '{}{}Rp{}'.format(string1,spaceString,string2)
            storeString.append(newString)
        else:
            minValue = length+5
            spaceString = ''
            for i in range(minValue):
                spaceString+='.'
            newString = '{}Rp{}'.format(spaceString,string2)
            storeString.append(newString)

def fillInSpace(string,string2,isFirst):
    length = len(string)
    inttostr = str(string2)
    length2 = len(inttostr)
    totalLength = length+length2
    if isFirst:
        lengthValue = length+3
    else:
        lengthValue = length

    if(length2+lengthValue>30):
        if isFirst:
            minValue = 30-(length+3)
        else:
            minValue = 30-(length+3)
        arrayofstring = doublecheck(string2,minValue)
        string1 = ''
        if isFirst:
            string1 = '{}{}'.format(string,' : ')
        else:
            for i in range(length+3):
                string1 += ' '
        newString = '{}{}'.format(string1,arrayofstring[0])
        storeString.append(newString)
        fillInSpace(string,arrayofstring[1],False)
    else:
        if isFirst:
            minValue = 30-(length2+length+3)
            string1 = '{}{}'.format(string,' : ')
            spaceString = ''
            for i in range(minValue):
                spaceString+=' '
            newString = '{}{}{}'.format(string1,spaceString,string2)
            storeString.append(newString)
        else:
            minValue = length+3
            spaceString = ''
            for i in range(minValue):
                spaceString+=' '
            newString = '{}{}'.format(spaceString,string2)
            storeString.append(newString)


def fillInSpaceTitle(string):
    length = len(string)
    if(length>30):
        minValue = 30
        arrayofstring = doublecheck(string,minValue)
        newString = '{}'.format(arrayofstring[0])
        storeString.append(newString)
        print('panjang nya == >{}'.format(len(newString)))
        fillInSpaceTitle(arrayofstring[1])
    else:
        minValue = 30-(length)
        firstValue = 0
        lastValue = 0
        if(minValue%2==0):
            firstValue = int(minValue/2)
            lastValue = int(minValue/2)
        else:
            a = str(minValue/2).split('.')[0]
            firstValue = int(a)+minValue%2
            lastValue = int(a)-minValue%2
        spaceString1 = ''
        spaceString2 = ''
        for i in range(firstValue):
            spaceString1+=' '
        for i in range(lastValue):
            spaceString2+=' '
        newString = '{}{}{}'.format(spaceString1,string,spaceString2)
        storeString.append(newString)
    
def inputValidation():
    inputHarga = input("--input 'exit' untuk selesai--\nmasukan harga barang: ")
    if inputHarga.isdigit():
        return inputHarga
    elif inputHarga == 'exit' or inputHarga == 'Exit' or inputHarga == 'EXIT':
        return inputHarga
    else:
        print("\n!!harga harus berformat nomor!!\n")
        return inputValidation()

def loopItem():
    Item = input("--input 'exit' untuk selesai--\nmasukan nama barang: ")
    if Item == 'exit' or Item == 'Exit' or Item == 'EXIT':
        total = sum(priceList)
        fillWithDot('Total',total,True)
        return
    Harga = inputValidation()
    print(Harga)
    if Harga == 'exit' or Item == 'Exit' or Item == 'EXIT':
        total = sum(priceList)
        fillWithDot('Total',total,True)
        return
    fillWithDot(Item,int(Harga),True)
    priceList.append(int(Harga))
    loopItem()

def cetakPrinter(arr):
    print('\n\n')
    for i in arr:     
        print('')
        print(i)
    print('\n\n\n')

storeName = input("\nmasukan nama toko : ")
fillInSpaceTitle(storeName)
Date = input("\nmasukan tanggal cetak : ")
fillInSpace("Tanggal",Date,True)
Name = input("\nmasukan nama kasir: ")
fillInSpace("Nama Kasir",Name,True)
headerLine = ''
for i in range(30):
    headerLine += '='
storeString.append(headerLine)
loopItem()
cetakPrinter(storeString)
