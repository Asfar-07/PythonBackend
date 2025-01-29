import http.server
import socketserver
import json
from UserManeger import UserManager

PORT = 8000  
user_data=[]
class MyRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        request_path=self.path
        try:
            json_data=json.loads(post_data)
            usercontroller=UserManager(json_data["name"],json_data["email"],json_data["password"])
            fun_response={}
            if request_path=="/Login":
                fun_response=usercontroller.UserLogin()
            if request_path=="/Sign":
                fun_response=usercontroller.UserSign()
            self.send_response(200)
            self.send_header("Content-Type","application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = fun_response
            self.wfile.write(json.dumps(response).encode("utf-8"))
        except:
            self.send_response(400)
            self.send_header('Content-Type','application/json')
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"error": "Invalid JSON format"}')
# Create and start the server
def run_server():
    with socketserver.TCPServer(("", PORT), MyRequestHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()  

if __name__ == "__main__":
    run_server()
