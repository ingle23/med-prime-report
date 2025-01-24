from flask import Flask,request,jsonify
from flask_cors import CORS
# from flask_jwt_extended import JWTManager,decode_token,jwt_required, create_access_token,jwt_required, get_jwt_identity
from Blacklist import Blacklist 
import jwt
import psycopg2
from flask_bcrypt import Bcrypt, check_password_hash,generate_password_hash
import json


app = Flask(__name__)
# app.config['JWT_SECRET_KEY'] = 'Y-UUH2tPWWSfuiF4'  
SECRET_KEY = 'Y-UUH2tPWWSfuiF4' 
# jwt = JWTManager(app)
CORS(app)
# Blacklist = set()

def get_db_connection():
    conn = psycopg2.connect(
        database="report",
        user="admin",
        password="admin4",  
        host="localhost",
        port="5432"
    )
    return conn


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

    # identity=json.dumps({'username': user[1], 'role': user[3]})
    # access_token = create_access_token(identity= identity)

    payload = {'username': user[1], 'role': user[3]}
    access_token =jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return jsonify(access_token=access_token, role= user[3])



@app.route('/protected', methods=['GET','POST'])
def protected():
    token = None
    if 'Authorization' in request.headers:
        auth = request.headers["Authorization"].split(" ")
        token = auth[1]
    if token in Blacklist:
        return jsonify({'message': 'Token is Blacklisted'}), 403
         
    if not token:
        return jsonify({'message': 'Token is missing!'}), 401

    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        role = decoded_payload['role']
        return jsonify({'message': f'Hello {decoded_payload['username']}, you are authorized!', 'role': role}), 200

    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token!'}), 401


@app.route('/logout', methods=['POST'])
def logout():
    auth = request.headers["Authorization"].split(" ")
    token = auth[1]
    Blacklist.add(token) 
    print(Blacklist)
    return jsonify({'message':'Logout Soccessfully'})



@app.route('/admin')
def adminPage():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    user = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(users= user)


if __name__ == '__main__':
    app.run(debug=True, port=5000)