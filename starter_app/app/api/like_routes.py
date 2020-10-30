from flask import Blueprint, jsonify, request, session
from app.models import Musician, Post, Like, db
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt

like_routes = Blueprint('like', __name__)

@like_routes.route('/')
def index():
  response = Like.query.all()
  return {"Likes": [like.to_dict() for like in response]}
@like_routes.route('/<qid>', methods=['GET', 'POST', 'DELETE'])
def mylists(qid):
  if request.method == 'GET':
    likes = Like.query.filter_by(musicianId=qid).all()
    likes1 = [like.to_dict() for like in likes]

    return {"Likes": likes1}
  if request.method == 'POST':
    data = request.get_json()
    postId = data["postId"]
    musicianId = data["currentUserId"]
    like = Like(
        postId=postId,
        musicianId=musicianId
    )
    db.session.add(like)
    db.session.commit()
    return {'msg': "success"}
  if request.method == 'DELETE':
    data = request.get_json()
    postId = data["postId"]
    musicianId = data["currentUserId"]
    like = Like.query.filter_by(postId=postId).filter_by(musicianId=musicianId).first()
    db.session.delete(like)
    db.session.commit()
    return {'msg': "success"}
