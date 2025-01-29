import json
y=json.load(open("userapi.json","rt"))
password=b"12345"
data={
    "name": "carlo2",
    "email": "carlo2@gmail.com",
    "password": password.decode()
}
y.append(data)
with open('userapi.json', 'w') as file:
    json.dump(y, file, indent=4)
print(y)