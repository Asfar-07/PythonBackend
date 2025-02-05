from dotenv import dotenv_values
import mysql.connector

config = dotenv_values(".env")

def DataBase():
    db=mysql.connector.connect(user=config["USER_DB"],password=config["PASSWORD_DB"],host="localhost")
    return db