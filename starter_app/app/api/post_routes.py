from flask import Blueprint, jsonify, request, session
from app.models import Post, Comment, Like, Musician, db
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt
from sqlalchemy.orm import joinedload, selectinload


post_routes = Blueprint('post', __name__)

@post_routes.route('/', methods=["GET", "POST"])
def index():
  if request.method == "GET":
    response = Post.query.all()
    return {"Posts": [post.to_dict() for post in response]}
  if request.method == "POST":
    data = request.get_json()
    musicianId = data['musicianId']
    postType = data['postType']
    mediaLink = data['mediaLink']
    caption = data['caption']
    if not mediaLink:
        post = Post(
            musicianId=musicianId,
            postType=postType,
            caption=caption
        )
    else:
        post = Post(
            musicianId=musicianId,
            postType=postType,
            mediaLink=mediaLink,
            caption=caption
        )
    db.session.add(post)
    db.session.commit()
    return {"Post": post.to_dict()}


@post_routes.route('/following', methods=["PUT"])
def following():
  data = request.get_json()
  following = data['following']
  if not following:
      return {"Posts": []}
  postlist = []
  for item in following:
      option = "musicianId" if len(item) == 3 else "id"
      if option == "musicianId":
          musicianId=item["musicianId"]
      else:
          musicianId=item["id"]
      posts = Post.query.filter_by(musicianId=musicianId).options(selectinload('musicians')).all()
      for post in posts:
          post1 = post.to_dict()
          post1["firstName"] = post.musicians.firstName
          post1["lastName"] = post.musicians.lastName
          postlist.append(post1)
  return {"Posts": postlist}

@post_routes.route('/<id>')
def myposts(id):
    postlist = []
    posts = Post.query.filter_by(musicianId=id).options(selectinload('musicians')).all()
    for post in posts:
          post1 = post.to_dict()
          post1["firstName"] = post.musicians.firstName
          post1["lastName"] = post.musicians.lastName
          postlist.append(post1)
    return {"Posts": postlist}
