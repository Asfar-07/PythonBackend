import bcrypt
import json
import db

Connection_db=db.DataBase()
User_Table=Connection_db.cursor()
print(Connection_db)
class  UserManager:
    def __init__(self,username,email,password):
        self.username=username
        self.email=email
        self.__password=password
    
    def UserLogin(self):
        print(f'Login uername:{self.username},email:{self.email},pass:{self.__password}')
        hash_pass=self.__password.encode("utf-8")
        User_Table.execute("select * from userdetails.ur_data where email=%s",(self.email,))
        User_data=User_Table.fetchone()  #fetch data from database in tuble structure
        if User_data:
            checkdata={                  #convert to dictionary or json
            "name":User_data[1],
            "email":User_data[2],
            "password":User_data[3]
            }
            print("email finded")
            if checkdata["email"]==self.email and bcrypt.checkpw(hash_pass,checkdata["password"].encode()):
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
        
        User_Table.execute("select * from userdetails.ur_data where email=%s",(self.email,))
        User_data=User_Table.fetchone()
        if User_data:
            print('email exited')
            return  {"status": "email exited","term":False}
        collection_data=(checkdata["name"],checkdata["email"],checkdata["password"])
        User_Table.execute("insert into userdetails.ur_data(username,email,password) values(%s,%s,%s)",collection_data)
        Connection_db.commit()
        print("usedata stored")
        return  {"status": "data stored","term":True}

    