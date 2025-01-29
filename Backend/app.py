from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager,decode_token,jwt_required, create_access_token,jwt_required, get_jwt_identity,get_jwt

import jwt
import psycopg2
from flask_bcrypt import Bcrypt, check_password_hash,generate_password_hash
import json
from flask_pymongo import PyMongo
from bson import ObjectId


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'Y-UUH2tPWWSfuiF4'  
SECRET_KEY = 'Y-UUH2tPWWSfuiF4' 
jwt = JWTManager(app)
CORS(app)
Blacklist = set()

app.config["MONGO_URI"] = "mongodb://localhost:27017/Medprime_Report_db"
mongo = PyMongo(app)

def get_db_connection():
    conn = psycopg2.connect(
        database="report",
        user="admin",
        password="admin4",  
        host="localhost",
        port="5432"
    )
    return conn

# Searialized Data For ObjectId
def serialize_document(doc):
    """Recursively converts all ObjectId fields to strings."""
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)  
        elif isinstance(value, dict): 
            serialize_document(value)
        elif isinstance(value, list):  
            for item in value:
                if isinstance(item, dict):
                    serialize_document(item)
    return doc


@app.route('/register', methods=['POST'])
def register():
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    role = request.json.get('role', None)

    if not username or not password or not role:
        return jsonify({"msg": "Missing required fields"}), 400
    
    valid_roles = ['Admin', 'Doctor', 'Technician']
    if role not in valid_roles:
        return jsonify({"msg": "Invalid role"}), 400

   
    hashed_password = generate_password_hash(password).decode('utf-8')
   
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO users (username, password,role) VALUES (%s, %s,%s)",
            (username, hashed_password,role)
        )
        conn.commit()
        
        return jsonify({"msg": "User registered successfully"}), 201
    except psycopg2.IntegrityError:
        conn.rollback()
        return jsonify({"msg": "Username already exists"}), 409
    finally:
        cur.close()
        conn.close()


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user or not check_password_hash(user[2], password):  
        return jsonify({"msg": "Invalid credentials"}), 401

    identity=json.dumps({'username': user[1], 'role': user[3]})
    access_token = create_access_token(identity= identity)

   
    return jsonify(access_token=access_token, role= user[3])



@app.route('/protected', methods=['GET','POST'])
@jwt_required()
def protected():

    auth = request.headers["Authorization"].split(" ")
    token = auth[1]
    if token in Blacklist:
        return jsonify({"msg": "Token has been blacklisted. Please log in again."}), 403
    decoded_token = get_jwt_identity()
    try:
        decoded_payload = json.loads(decoded_token)
        role = decoded_payload['role']
        return jsonify({'message': f'Hello {decoded_payload['username']}, you are authorized!', 'role': role}), 200
    except :
        return jsonify({'message': 'Invalid token!'}), 401


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        auth = request.headers["Authorization"].split(" ")
        token = auth[1]
        Blacklist.add(token) 
        return jsonify({'message':'Logout Soccessfully'})
    except Exception as e:
        return jsonify(e)



@app.route('/admin')
def adminPage():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    user = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(users= user)

@app.route('/addpatient', methods = ['POST'])
def Add_data():
    # generated_id = ''
    data = request.json
    
    result = mongo.db.PatientInfo.insert_one(data)
    # generated_id = str(result.inserted_id)
    # print(generated_id)                   
    return jsonify({"message" : "Document add Successfully "}),201

@app.route('/addreport', methods = ['POST'])
def Add_report():
    data = request.json
    get_data= mongo.db.Report_Data.insert_one(data)
    # get_id = data.reportId
    # mongo.db.PatientInfo.update_one(
    #     {"_id": ObjectId(generated_id)},
    #     {"$push" : {"reportId" : get_id}}
    # )
    # print("done")

    return jsonify({"message" : "Document add Successfully "}),201



@app.route('/getpatientdata', methods = ['POST',"GET"])
def Get_data():    
    # result = mongo.db.PatientInfo.find() 
    result = list(mongo.db.PatientInfo.aggregate([
        {
            "$lookup": {
            "from": "Report_Data",
            "localField": "reportId",
            "foreignField": "reportId",
            "as": "reports"
            }
        }
    ]))
    # result_list = []
    # result_list = [serialize_document(item) for item in result]
    for item in result:
        serialize_document(item)
        for report in item.get("Report_Data", []):
            report["_id"] = str(report["_id"])

    return jsonify({"result" : result}),201


@app.route('/getreportdata', methods = ['POST',"GET"])
def Get_report_data():    
    result = mongo.db.PatientInfo.find()
    result_list = []
    result_list = [serialize_document(item) for item in result]            
    return jsonify({"result" : result_list}),201




if __name__ == '__main__':
    app.run(debug=True, port=5000)