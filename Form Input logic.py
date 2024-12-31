import re
from datetime import datetime

class Personal_Details:
    print('PERSONAL DETAILS.\n \nPls fill all feilds appropriately')
    def __init__(self):
        self.name = self.get_valid_name()
        self.age = self.get_valid_age()
        self.sex = self.get_valid_gender()
        if self.sex == 'Female':
            self.lmp = self.get_valid_lmp()

    def get_valid_name(self):
        while True:
            name = input('NAME: ')
            if re.match(r'^[A-Za-z\s]{1,30}$', name):
                return name
            else:
                print("Invalid name. Only letters and spaces are allowed, and it can't be more than 30 characters.")

    def get_valid_age(self):
        while True:
            age = input('AGE: ')
            if age.isdigit():
                return age
            else:
                print("Invalid age. Only numbers are allowed.")

    def get_valid_gender(self):
        while True:
            gender = input('GENDER (Male/Female): ')
            if gender in ['Male', 'Female']:
                return gender
            else:
                print("Invalid gender. Please enter either 'Male' or 'Female'.")

    def get_valid_lmp(self):
        while True:
            lmp = input('L.M.P (DD/MM/YYYY): ')
            try:
                datetime.strptime(lmp, '%d/%m/%Y')
                return lmp
            except ValueError:
                print("Invalid date format. Please enter the date in DD/MM/YYYY format.")



# person = Personal_Details()



class Medical_Examination:
    print('MEDICAL EXAMINATION.\n \n Pls fill all feilds appropriately')
    def __init__(self):
        self.blood_pressure = self.get_valid_blood_pressure()
        self.pulse = self.get_valid_pulse()
        self.weight = self.get_valid_weight()
        self.height = self.get_valid_height()
        self.oxygen = self.get_valid_oxygen()
        self.temperature = self.get_valid_temperature()

    def get_valid_blood_pressure(self):
        while True:
            bp = input('Blood pressure (e.g., 120/80): ')
            if re.match(r'^\d+/\d+$', bp):
                return bp
            else:
                print("Invalid blood pressure. It must be in the format 'number/number'.")

    def get_valid_pulse(self):
        while True:
            pulse = input('Pulse: ')
            if pulse.isdigit():
                return pulse
            else:
                print("Invalid pulse. Only digits are allowed.")

    def get_valid_weight(self):
        while True:
            weight = input('Weight: ')
            if weight.isdigit():
                return weight
            else:
                print("Invalid weight. Only digits are allowed.")

    def get_valid_height(self):
        while True:
            height = input("Height (e.g., 5'6): ")
            if re.match(r"^\d+'\d+$", height):
                return height
            else:
                print("Invalid height. It must be in the format 'number'number' (e.g., 5'6).")

    def get_valid_oxygen(self):
        while True:
            oxygen = input('SPO2: ')
            if oxygen.isdigit() and 0 <= int(oxygen) <= 100:
                return oxygen
            else:
                print("Invalid SPO2. It must be a digit between 0 and 100.")

    def get_valid_temperature(self):
        while True:
            temperature = input('Temperature: ')
            try:
                float(temperature)
                return temperature
            except ValueError:
                print("Invalid temperature. It must be a number.")

# Medical_Examination()



class Physical_Abnormalities:
    print('ABNORMALITIES. \n In the case of none pls indicate by inputing nil.')
    def __init__(self):
        self.skin = input('Skin Abnormality: ')
        self.ear = input('Ear Abnormality: ')
        self.eye = input('Eye Abnormality: ')
        self.nose = input('Nose Abnormality: ')
        self.chest = input('Chest Abnormality: ')
        self.respiratory_system = input('Respiratory system Abnormality: ')
        self.blood_group = input('Blood Group: ')
        self.blood_glucose = input('Blood Glucose: ')


# Physical_Abnormalities()




class Confirmation:
    def __init__(self):
        self.medical_Officer_name = input('Medical officer name: ')
        self.date = self.get_valid_date()

    def get_valid_date(self):
        while True:
            date = input('Date (DD/MM/YYYY): ')
            try:
                datetime.strptime(date, '%d/%m/%Y')
                return date
            except ValueError:
                print("Invalid date format. Please enter the date in DD/MM/YYYY format.")
    
    

    def approved_disapproved(self, personal_details, medical_examination):
        bp = medical_examination.blood_pressure.split('/')
        systolic = int(bp[0])
        diastolic = int(bp[1])
        pulse = int(medical_examination.pulse)
        oxygen = int(medical_examination.oxygen)

        if (systolic < 90 or systolic > 130 or diastolic < 60 or diastolic > 80 or pulse < 50 or pulse > 100 or oxygen < 80):
            pronoun = 'He' if personal_details.sex == 'Male' else 'She'
            print(f'I hereby inform you that I, {self.medical_Officer_name}, have medically examined the above named {personal_details.name} and I am of the opinion that {pronoun} is not medically fit for the post applied for, due to medical abnormalities detected in the medical examination/investigation.')
        else:
            pronoun = 'He' if personal_details.sex == 'Male' else 'She'
            print(f'I hereby inform you that I, {self.medical_Officer_name}, have medically examined the above named {personal_details.name} and I am of the opinion that {pronoun} is medically fit for the post applied for, with no significant medical abnormalities detected in the medical examination/investigation.')





person = Personal_Details()
medical_examination = Medical_Examination()
physical_abnormalities = Physical_Abnormalities()  # Though this is not used in the current logic
confirmation = Confirmation()

# Call the function to approve or disapprove
confirmation.approved_disapproved(person, medical_examination)