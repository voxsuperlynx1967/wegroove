from flask import Blueprint, jsonify, request, session
from app.models import Musician, db
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt

user_routes = Blueprint('users', __name__)

def set_password(password):
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password


def verify_password(password, hashed_password):
    # Return value could be made more sophisticated
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return True
    else:
        return False


@user_routes.route('/')
def index():
  response = Musician.query.all()
  return {"musicians": [musician.to_dict() for musician in response]}


@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # try:
    email = data['email']
    password = data['password']

    if not email or not password:
        return jsonify(message='Email and password required'), 400


    musician = Musician.query.filter_by(email=email).first()
    if not musician:
        return jsonify(message='email not found'), 400

    verified = verify_password(password, musician.hashed_password)

    if not verified:
        return jsonify(message='Password verify failed'), 403
    else:
        auth_token = create_access_token(
            identity={"email": musician.email})
    session["musician"] = musician.to_dict()
    musician1 = musician.to_dict()
    return jsonify(auth_token=auth_token, musician=musician1), 200

    # except Exception:
    #     return jsonify(message='Login failed'), 408


@user_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # try:
    firstName = data['firstName']
    lastName = data['lastName']
    email = data['email']
    hashed_password = set_password(data['password'])
    location = data['location']

    if not firstName or not email or not hashed_password or not location:
        return jsonify(message="First name, email, location, and password required"), 400

    latlong = location.split(",")
    print(latlong)
    lat = round(float(latlong[0]),0)
    lng = round(float(latlong[1]),0)
    if lat not in range(-90,90):
        return jsonify(message="Please select a valid address from the dropdown")
    if lng not in range(-180,180):
        return jsonify(message="Please enter a valid address from the dropdown")

    # if not musicianname:
    #     return jsonify(message="musicianname required"), 400
    # elif not email:
    #     return jsonify(message='Email required'), 400
    # elif not hashed_password:
    #     return jsonify(message="Password required"), 400


    musician = Musician(
        email=email,
        firstName=firstName,
        lastName=lastName,
        location=location,
        hashed_password=hashed_password,
    )
    db.session.add(musician)
    db.session.commit()
    session["musician"] = musician.to_dict()

    musician1 = musician.to_dict()
    auth_token = create_access_token(identity={"email": musician.email})
    return jsonify(auth_token=auth_token, musician=musician1), 200


    # except Exception:
    #     return jsonify(message="try failed"), 409

@user_routes.route("/logout", methods=["DELETE"])
def logout():
    # logout_musician()
    # return 'Goodbye!'
    if "musician" in session:
        session.pop("musician", None)
        return {'msg': 'Goodbye!'}
    return "You are already logged out"

@user_routes.route("/session")
def load_musician():
  if 'musician' in session:
    musician = session['musician']
    return {"musician": session['musician']}, 200
  else:
    return {"msg": "musician not loaded"}, 400

@user_routes.route('/<qid>')
def getspecific(qid):

    musician = Musician.query.filter_by(id=qid).first()
    musiciansdict = musician.to_dict()
    # user = User.query.filter_by(id=question.userId).first()
    # usersdict = user.to_dict()
    # questionsdict["username"] = usersdict["username"]
    return jsonify(musicianprof=musiciansdict), 200
