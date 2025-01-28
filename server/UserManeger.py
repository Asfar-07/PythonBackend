import bcrypt
User_data=[{
    "name":"carlo",
    "email":"carlo@gmail.com",
    "password":"$2b$12$/KM73Xc9sL4HaJ10KNhJ7eLgmCIuwh/qwqlgYyF0PG64qMdndk44G"
},
{
    "name":"marco",
    "email":"marco@gmail.com",
    "password":"$2b$12$v41q6yukV9C5ct5Jwr2Pb.PPGxkUsUpdXNWpII0livFbi9HNmH51u"
},
{
    "name":"john wick",
    "email":"john@gmail.com",
    "password":"$2b$12$v41q6yukV9C5ct5Jwr2Pb.PPGxkUsUpdXNWpII0livFbi9HNmH51u"
}]
class  UserManager:
    def __init__(self,username,email,password):
        self.username=username
        self.email=email
        self.__password=password
    
    def UserLogin(self):
        print(f'Login uername:{self.username},email:{self.email},pass:{self.__password}')
        hash_pass=self.__password.encode("utf-8")
        for data in User_data:
            if data["email"]==self.email and bcrypt.checkpw(hash_pass,data["password"]):
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
            "password":Bcrypt_pass
            }
        print(Bcrypt_pass)
        for data in User_data:
            if data["email"]==self.email:
                print('email exited')
                return  {"status": "email exited","term":False}
        User_data.append(checkdata)
        print("usedata stored")
        return  {"status": "data stored","term":True}

    