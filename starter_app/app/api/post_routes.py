from flask import Blueprint, jsonify, request, session
from app.models import Post, Comment, Like, Musician
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt


post_routes = Blueprint('post', __name__)

@post_routes.route('/')
def index():
  response = Post.query.all()
  return {"Posts": [post.to_dict() for post in response]}

@post_routes.route('/following', methods=["PUT"])
def following():
  data = request.get_json()
  following = data['following']
  if not following:
      return {"Posts": []}
  postlist = []
  for item in following:
      musicianId = int(item["musicianId"])
      posts = Post.query.filter_by(musicianId=musicianId).all()
      for post in posts:
          postlist.append(post.to_dict())
  return {"Posts": postlist}
