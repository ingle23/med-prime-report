from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
from flask_jwt_extended import JWTManager,decode_token,jwt_required, create_access_token,jwt_required, get_jwt_identity
import psycopg2
from flask_bcrypt import Bcrypt, check_password_hash,generate_password_hash
import json


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = '0c2c422892cdafcfeb90e11df56cc7307a591e824228f9a98cbdae4d6e3d57e8'  
jwt = JWTManager(app)
CORS(app)
bcrypt = Bcrypt(app)

def get_db_connection():
    conn = psycopg2.connect(
        database="report",
        user="admin",
        password="admin4",  
        host="localhost",
        port="5432"
    )
    print("database connected")
    return conn


@app.route('/register', methods=['POST'])
def register():
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    role = request.json.get('role', None)

    # if not username or not password or not role:
    #     return jsonify({"msg": "Missing required fields"}), 400
    
    valid_roles = ['admin', 'doctor', 'technician']
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
    # print(user[0],user[1],user[2],user[3])

    cur.close()
    conn.close()

    if not user or not check_password_hash(user[2], password):  
        return jsonify({"msg": "Invalid credentials"}), 401

    identity=json.dumps({'username': user[1], 'role': user[3]})

    access_token = create_access_token(identity= identity)
    print(f"token created for user {user[1]},{user[3]}")
    return jsonify(access_token=access_token, role= user[3])


# Protected route for different roles
@app.route('/protected', methods=['GET','POST'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
   
    print(current_user)
    return jsonify({"msg": "Access granted", "user": current_user }), 200






if __name__ == '__main__':
    app.run(debug=True, port=5000)