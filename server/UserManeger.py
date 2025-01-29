import bcrypt
import json
User_data=json.load(open("userapi.json",'rt'))
class  UserManager:
    def __init__(self,username,email,password):
        self.username=username
        self.email=email
        self.__password=password
    
    def UserLogin(self):
        print(f'Login uername:{self.username},email:{self.email},pass:{self.__password}')
        hash_pass=self.__password.encode("utf-8")
        for data in User_data:
            if data["email"]==self.email and bcrypt.checkpw(hash_pass,data["password"].encode()):
                return  {"status": "sucess","term":True}
        print(b"can't find email")
        return  {"status": "can't find email","term":False}
    
    def UserSign(self):
        print(f'Sign uername:{self.username},email:{self.email},pass:{self.__password}')
        hash_pass=self.__password.encode("utf-8")
        Bcrypt_pass=bcrypt.hashpw(hash_pass,bcrypt.gensalt())
        checkdata={
            "name":self.username,
            "email":self.email,
            "password":Bcrypt_pass.decode()
            }
        print(Bcrypt_pass)
        for data in User_data:
            if data["email"]==self.email:
                print('email exited')
                return  {"status": "email exited","term":False}
        User_data.append(checkdata)
        self.dataAppend(data)
        print("usedata stored")
        return  {"status": "data stored","term":True}
    def dataAppend(self,data):
        print(data)
        file=open('userapi.json', 'w')
        # with open('userapi.json', 'w') as file:
        json.dump(User_data, file, indent=4)

    