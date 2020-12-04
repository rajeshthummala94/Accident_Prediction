import pandas as pd 
import seaborn as sns 
import numpy as np 
from sklearn.preprocessing import StandardScaler 
from sklearn.ensemble import RandomForestClassifier 
from sklearn.tree import DecisionTreeClassifier 
from sklearn.svm import SVC 
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV 
from sklearn.model_selection import RandomizedSearchCV 
from sklearn.metrics import confusion_matrix,recall_score,precision_recall_curve,auc,roc_curve,roc_auc_score,classification_report,accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
import warnings
import os
warnings.filterwarnings('ignore')

class prediction(object):

    
    def loadingData(self):
       
        retriving = {
        "Carriageway_Hazards": {"None": 0, "Other object on road": 1, "Any animal in carriageway (except ridden horse)": 1,  "Pedestrian in carriageway - not injured": 1, "Previous accident": 1, "Vehicle load on road": 1, "Data missing or out of range": 0 }
        }
        self.df.replace(retriving, inplace=True)
        encoding_light = {"Light_Conditions": {"Daylight": 0, "Darkness - lights lit": 1, "Darkness - no lighting": 1, "Darkness - lighting unknown": 1, "Darkness - lights unlit": 1, "Data missing or out of range": 0}}
        self.df.replace(encoding_light, inplace=True)

        retrivingDayOfWeek = {"Day_of_Week": {"Saturday": 1, "Sunday": 1, "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0}}
        self.df.replace(retrivingDayOfWeek, inplace=True)

        retrivingConditions = {"Special_Conditions_at_Site": {"None": 0, "Roadworks": 1, "Oil or diesel": 1, "Mud": 1, "Road surface defective": 1, "Auto traffic signal - out": 1, "Road sign or marking defective or obscured": 1, "Auto signal part defective": 1, "Data missing or out of range": 0}}
        self.df.replace(retrivingConditions, inplace=True)

        retrivingRoadClass = {"1st_Road_Class": {"A": 1, "A(M)": 1, "B": 2, "C": 3, "Motorway": 4, "Unclassified": 1}}
        self.df.replace(retrivingRoadClass, inplace=True)

        retrivingJunDetails = {"Junction_Detail": 
                                    {"Not at junction or within 20 metres": 1,
                                     "T or staggered junction": 2,
                                     "Crossroads": 3, 
                                     "Roundabout": 4,
                                     "Private drive or entrance": 5,
                                     "Other junction": 6,
                                     "Slip road": 7,
                                     "More than 4 arms (not roundabout)": 8,
                                     "Mini-roundabout": 9,
                                     "Data missing or out of range": 1 }}
        self.df.replace(retrivingJunDetails, inplace=True)

        retrivingJunControl = {"Junction_Control": 
                                     {"Give way or uncontrolled": 1,
                                     "Auto traffic signal": 2,
                                     "Not at junction or within 20 metres": 3, 
                                     "Stop sign": 4,
                                     "Authorised person": 5,
                                     "Data missing or out of range": 1 
                                      }}
        self.df.replace(retrivingJunControl, inplace=True)
        retrivingRoadCond = {"Road_Surface_Conditions": 
                                {"Dry": 1,
                                 "Wet or damp": 2,
                                 "Frost or ice": 3, 
                                 "Snow": 4,
                                 "Flood over 3cm. deep": 5,
                                 "Data missing or out of range": 1}}
        self.df.replace(retrivingRoadCond, inplace=True)
        retrivingRoadType = {"Road_Type": 
                                {"Single carriageway": 1,
                                 "Dual carriageway": 2,
                                 "Roundabout": 3, 
                                 "One way street": 4,
                                 "Slip road": 5,
                                 "Unknown": 1,
                                 "Data missing or out of range": 1}}
        self.df.replace(retrivingRoadType, inplace=True)

        retrivingUR = {"Urban_or_Rural_Area": 
                                    {"Urban": 1,
                                     "Rural": 2 ,
                                     "Unallocated": 1}}
        self.df.replace(retrivingUR, inplace=True)

        retrivingWeather = {"Weather_Conditions": 
                                {"Fine no high winds": 1,
                                 "Raining no high winds": 2,
                                 "Raining + high winds": 3,
                                 "Fine + high winds": 4,
                                 "Snowing no high winds": 5,
                                 "Fog or mist": 6,
                                 "Snowing + high winds": 7,
                                 "Unknown": 1,
                                 "Other": 1,
                                 "Data missing or out of range": 1 }}
        self.df.replace(retrivingWeather, inplace=True)

        self.df['Speed_limit'].fillna((self.df['Speed_limit'].mean()), inplace=True)

        self.df['Time'].fillna(0, inplace=True)
        self.df['Time'] = self.df['Time'].apply(self.period)

        impactOfAccident = {"Accident_Severity": {"Serious": 1, "Fatal": 1, "Slight": 0}}
        self.df.replace(impactOfAccident, inplace=True)


    def period(self, row):
        rdf = []
        if(type(row) == float):
            row = str(row)
            rdf = row.split(".")
        else:
            rdf = str(row).split(":"); 
            
        hr = rdf[0]
        if int(hr) > 8 and int(hr) < 20:
            return 1;
        else:
            return 2;

    def splitEqualRatio(self):
        XXY = self.df[self.total]
        XY_Serious = XY[XY["Accident_Severity"]=="Serious"]
        XY_Slight = XY[XY["Accident_Severity"]=="Slight"]
        XY_Fatal = XY[XY["Accident_Severity"]=="Fatal"]

        X_Serious = XY_Serious[self.cols]
        Y_Serious = XY_Serious[['Accident_Severity']]
        X_Serious_train, X_Serious_test, Y_Serious_train, Y_Serious_test = train_test_split(X_Serious, Y_Serious, test_size=0.25)

        X_Slight = XY_Slight[self.cols]
        Y_Slight = XY_Slight[['Accident_Severity']]
        X_Slight_train, X_Slight_test, Y_Slight_train, Y_Slight_test = train_test_split(X_Slight, Y_Slight, test_size=0.25)

        X_Fatal = XY_Fatal[self.cols]
        Y_Fatal = XY_Fatal[['Accident_Severity']]
        X_Fatal_train, X_Fatal_test, Y_Fatal_train, Y_Fatal_test = train_test_split(X_Fatal, Y_Fatal, test_size=0.25)

        X_train = X_Serious_train.append(X_Slight_train)
        X_train = X_train.append(X_Fatal_train)

        Y_train = Y_Serious_train.append(Y_Slight_train)
        Y_train = Y_train.append(Y_Fatal_train)

        X_test = X_Serious_test.append(X_Slight_test)
        X_test = X_test.append(X_Fatal_test)

        Y_test = Y_Serious_test.append(Y_Slight_test)
        Y_test = Y_test.append(Y_Fatal_test)
        return X_train, Y_train, X_test, Y_test

    def analyzeData(self):
        sns.countplot("Accident_Severity",data=self.df)
        CSLA = len(self.df[self.df["Accident_Severity"]=="Slight"]) 
        CSRA = len(self.df[self.df["Accident_Severity"]=="Serious"]) 
        CFAA = len(self.df[self.df["Accident_Severity"]=="Fatal"]) 

        PSLA = CSLA/(CSLA+CSRA+CFAA)
        print(PSLA*100)
        PSRA = CSRA/(CSLA+CSRA+CFAA)
        print(PSRA*100)
        PFAA = CFAA/(CSLA+CSRA+CFAA)
        print(PFAA*100)

    def printAnalysis(self, actual, pred):
        print("a%f" %(accuracy_score(actual, pred)))
        print(confusion_matrix(actual, pred))
        print(format(classification_report(actual, pred)))

    def gaussianClassifier(self):
        X = self.df[self.cols]
        Y = self.df['Accident_Severity']
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.25, random_state=42)
        gnb = GaussianNB()
        Y_pred = gnb.fit(X_train, Y_train).predict(X_test)
        self.printAnalysis(Y_test, Y_pred)
        return gnb
        
    def randomForestClassifier(self):
        X = self.df[self.cols]
        Y = self.df['Accident_Severity']
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.25, random_state=42)
        rdf = RandomForestClassifier(bootstrap=True,
                class_weight="balanced_subsample", 
                criterion='gini',
                max_depth=8, max_features='auto', max_leaf_nodes=None,
                min_impurity_decrease=0.0, min_impurity_split=None,
                min_samples_leaf=4, min_samples_split=10,
                min_weight_fraction_leaf=0.0, n_estimators=300,
                oob_score=False,
                random_state=35,
                verbose=0, warm_start=False)
        Y_pred = rdf.fit(X_train, Y_train).predict(X_test)
        self.printAnalysis(Y_test, Y_pred)
        return rdf

    def logisticRegression(self):
        X = self.df[self.cols]
        Y = self.df['Accident_Severity']
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.25, random_state=42)
        lg = LogisticRegression()
        Y_pred = lg.fit(X_train, Y_train.values.ravel()).predict(X_test)
        return lg

    def defaultClassifier(self):
        return self.randomForestClassifier()

    def predictResult(self, data):
        inputData = []
        for col in self.cols:
            inputData.append(data[col])

        inputData = {'0' : inputData}
        test = pd.DataFrame.from_dict(inputData, orient='index', columns=self.cols)
        new_prediction = self.model.predict(test)
        print(new_prediction)

        if new_prediction[0] == 0:
            return "Slight"
        elif new_prediction[0] == 1:
            return "Serious"
            
        return "None"

    def __init__(self):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'data/Accident_Information.csv')
        self.df_original = pd.read_csv(filename)
        print("processing of file is completed")

        self.df=self.df_original
        self.cols = ['1st_Road_Class','Carriageway_Hazards','Day_of_Week','Junction_Control','Junction_Detail','Light_Conditions','Road_Surface_Conditions','Road_Type','Special_Conditions_at_Site','Speed_limit','Time','Urban_or_Rural_Area','Weather_Conditions']
        self.total = self.cols + ['Accident_Severity']
        self.df = self.df[self.total]
        self.loadingData()
        print("processing of data is completed")

        self.model = self.defaultClassifier()

