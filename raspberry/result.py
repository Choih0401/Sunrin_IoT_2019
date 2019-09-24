from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
import sys
import serial
import threading
import time
import requests
import string
import random

#ard = serial.Serial('COM9', 9600)
#ard.flushInput()
count = 1
th = 0
dooropen = 0

class AsyncTask:    
    def send_server(self):
        global dooropen
        if(dooropen == 1):
            URL = 'http://112.161.27.61:7777/api/sanity'
            params = {'roomnum' : 1}
            res = requests.get(URL, params=params)
            print(res.url)
            threading.Timer(350, self.send_server).start()
        else:
            threading.Timer(1, self.send_server).cancel()


def main():
    at = AsyncTask()
    at.send_server()

def rand_string():
    _LENGTH = 5
    string_pool = string.ascii_uppercase + string.digits
    result = ""
    for i in range(_LENGTH):
        result += random.choice(string_pool)
    return result

class Ui_MainWindow(object):

    def __init__(self):
        super().__init__()

    def openWindow(self):
        global string2
        global dooropen
        if(dooropen == 1):
            self.ui = Ui_OtherWindow3()
        else:
            self.ui = Ui_OtherWindow()
        string2 = rand_string()
        URL = 'http://112.161.27.61:7777/api/newotp'
        params = {'no' : 1, 'value' : string2}
        res = requests.get(URL, params=params)
        print(res.url)
        global th
        self.window = QtWidgets.QMainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def openWindow2(self):
        self.window = QtWidgets.QMainWindow()
        global dooropen
        if(dooropen == 1):
            motor()
            self.ui = Ui_OtherWindow7()
            dooropen = 0
        else:
            self.ui = Ui_OtherWindow8()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()
        
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidqrqrget")
        self.btn_open = QtWidgets.QPushButton(self.centralwidget)
        self.btn_open.setGeometry(QtCore.QRect(270, 250, 300, 300))
        self.btn_open.setObjectName("btn_open")
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(30)
        self.btn_open.setFont(font)
        self.btn_open.setStyleSheet("""
            .QPushButton {
            border: 5px solid white;
            border-radius: 10px;
            background-color: #092e7f;
            color: #FFFFFF;
            }
        """)

        self.btn_open.clicked.connect(self.openWindow)

        self.btn_close = QtWidgets.QPushButton(self.centralwidget)
        self.btn_close.setGeometry(QtCore.QRect(670, 250, 300, 300))
        self.btn_close.setObjectName("btn_open")
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(30)
        self.btn_close.setFont(font)
        self.btn_close.setStyleSheet("""
            .QPushButton {
            border: 5px solid white;
            border-radius: 10px;
            background-color: #092e7f;
            color: #FFFFFF;
            }
        """)

        self.btn_close.clicked.connect(self.openWindow2)
    
        
        MainWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)


        oImage = QImage("mainpage.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        MainWindow.setPalette(palette)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

        MainWindow.show()

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.btn_open.setText(_translate("MainWindow", "OTP 생성하기"))
        self.btn_close.setText(_translate("MainWindow", "문 잠그기"))


class Ui_OtherWindow(object):

    def __init__(self):
        super().__init__()

    def openWindow(self): 
        global count 
        self.timer1.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_OtherWindow2()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def openWindow2(self):
        global dooropen
        global count  
        a = 0
        self.timer1.stop() 
        self.window = QtWidgets.QMainWindow()
        URL = 'http://112.161.27.61:7777/api/rent'
        params = {'roomnum' : 1}
        res = requests.get(URL, params=params)
        if(res.text == 'false'):
            a = 0
        elif(res.text == 'true'):
            a = 1
            dooropen = 1
            main()
        if(a == 1):
            motor()
            self.ui = Ui_OtherWindow6()
        else:
            self.ui = Ui_OtherWindow4()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def openWindow3(self):  
        self.timer1.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        oImage = QImage("mainpage.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.btn_finish = QtWidgets.QPushButton(self.centralwidget)
        self.btn_finish.setGeometry(QtCore.QRect(775, 275, 300, 100))
        self.btn_finish.setObjectName("btn_finish")
        self.btn_finish.setCheckable(False)
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(40)
        self.btn_finish.setFont(font)
        self.btn_finish.setStyleSheet("""
            .QPushButton {
            border: 5px solid white;
            border-radius: 10px;
            background-color: #092e7f;
            color: #FFFFFF;
            }
        """)

        self.btn_finish.clicked.connect(self.openWindow2)

        self.btn_exit = QtWidgets.QPushButton(self.centralwidget)
        self.btn_exit.setGeometry(QtCore.QRect(775, 405, 300, 100))
        self.btn_exit.setObjectName("btn_exit")
        self.btn_exit.setCheckable(False)
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(40)
        self.btn_exit.setFont(font)
        self.btn_exit.setStyleSheet("""
            .QPushButton {
            border: 5px solid white;
            border-radius: 10px;
            background-color: #092e7f;
            color: #FFFFFF;
            }
        """)

        self.btn_exit.clicked.connect(self.openWindow3)

        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(200, 150, 500, 500))
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(80)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer1 = QtCore.QTimer()
        self.timer1.start(30000)
        self.timer1.timeout.connect(self.openWindow)

        MainWindow.show()


    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow")) 
        self.btn_finish.setText(_translate("OtherWindow", "다음으로"))
        self.btn_exit.setText(_translate("OtherWindow", "취소하기"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow",string2) + "</b></font>")


class Ui_OtherWindow2(object):
    def openWindow(self):  
        self.timer2.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        oImage = QImage("main_back.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(185, 230, 700, 300))
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(50)
        self.label.setFont(font)
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)

        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer2 = QtCore.QTimer()
        self.timer2.start(5000)
        self.timer2.timeout.connect(self.openWindow)

    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow","시간이 초과되었습니다.") + "</b></font>")

class Ui_OtherWindow3(object):
    def openWindow(self):  
        self.timer3.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        oImage = QImage("main_back.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(185, 230, 700, 300))
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(50)
        self.label.setFont(font)
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)

        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer3 = QtCore.QTimer()
        self.timer3.start(5000)
        self.timer3.timeout.connect(self.openWindow)

    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow","이미 열려있습니다.") + "</b></font>")


class Ui_OtherWindow4(object):
    def openWindow(self):  
        self.timer4.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        oImage = QImage("main_back.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(185, 230, 700, 300))
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(40)
        self.label.setFont(font)
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)

        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer4 = QtCore.QTimer()
        self.timer4.start(5000)
        self.timer4.timeout.connect(self.openWindow)


    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow","인증처리가 되지 않았습니다.") + "</b></font>")


class Ui_OtherWindow6(object):
    def openWindow(self):  
        self.timer6.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        oImage = QImage("main_back.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(185, 230, 700, 300))
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(40)
        self.label.setFont(font)
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)

        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer6 = QtCore.QTimer()
        self.timer6.start(5000)
        self.timer6.timeout.connect(self.openWindow)


    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow","문이 열립니다.") + "</b></font>")

class Ui_OtherWindow7(object):
    def openWindow(self):  
        self.timer7.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        global th
        th = 0
        global count
        count = 1
        oImage = QImage("main_back.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(185, 230, 700, 300))
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(40)
        self.label.setFont(font)
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)

        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer7 = QtCore.QTimer()
        self.timer7.start(5000)
        self.timer7.timeout.connect(self.openWindow)

    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow","문이 잠겼습니다.") + "</b></font>")

class Ui_OtherWindow8(object):
    def openWindow(self):  
        self.timer8.stop() 
        self.window = QtWidgets.QMainWindow()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self.window)
        MainWindow.hide()
        self.window.show()

    def setupUi(self, OtherWindow):
        global th
        th = 0
        global count
        count = 1
        oImage = QImage("main_back.png")
        sImage = oImage.scaled(QSize(1280,768))
        palette = QPalette()
        palette.setBrush(10,QBrush(sImage))
        OtherWindow.setPalette(palette)
        OtherWindow.setObjectName("OtherWindow")
        OtherWindow.resize(1280, 768)
        self.centralwidget = QtWidgets.QWidget(OtherWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(185, 230, 700, 300))
        font = QtGui.QFont("KoPubWorld돋움체 Bold")
        font.setPointSize(45)
        self.label.setFont(font)
        self.label.setObjectName("label")
        OtherWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(OtherWindow)
        self.statusbar.setObjectName("statusbar")
        OtherWindow.setStatusBar(self.statusbar)

        self.retranslateUi(OtherWindow)
        QtCore.QMetaObject.connectSlotsByName(OtherWindow)

        self.timer8 = QtCore.QTimer()
        self.timer8.start(5000)
        self.timer8.timeout.connect(self.openWindow)

    def retranslateUi(self, OtherWindow):
        _translate = QtCore.QCoreApplication.translate
        OtherWindow.setWindowTitle(_translate("OtherWindow", "MainWindow"))
        self.label.setText("<font color=#ff7f50><b>" + _translate("OtherWindow","문이 잠겨있지 않습니다.") + "</b></font>")

def motor():
    a = 0
    #ard.write(b'1')

if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    sys.exit(app.exec_())
