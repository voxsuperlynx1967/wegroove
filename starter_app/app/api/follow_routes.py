from flask import Blueprint, jsonify, request, session
from app.models import Musician, Follow, db
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/')
def index():
  response = Follow.query.all()
  return {"Follows": [follow.to_dict() for follow in response]}
@follow_routes.route('/<qid>', methods=['GET', 'POST', 'DELETE'])
def mylists(qid):
  if request.method == 'GET':
    followers = Follow.query.filter_by(musicianId=qid).all()
    followers1 = [follower.to_dict() for follower in followers]
    for follower1 in followers1:
        follower = Musician.query.filter_by(id=follower1["followerId"]).first()
        followerz = follower.to_dict()
        follower1["followerinfo"] = followerz
    followings = Follow.query.filter_by(followerId=qid).all()
    followings1 = [following.to_dict() for following in followings]
    for following1 in followings1:
        following = Musician.query.filter_by(id=following1["musicianId"]).first()
        followingz = following.to_dict()
        following1["followinginfo"] = followingz
    return {"Follows": {"Followers": followers1, "Following": followings1}}
  if request.method == 'POST':
    data = request.get_json()
    musicianId = data["id2"]
    followerId = data["currentUserId"]
    follow = Follow(
        musicianId=musicianId,
        followerId=followerId
    )
    db.session.add(follow)
    db.session.commit()
    return {'msg': "success"}
  if request.method == 'DELETE':
    data = request.get_json()
    musicianId = data["id2"]
    followerId = data["currentUserId"]
    follow = Follow.query.filter_by(followerId=followerId).filter_by(musicianId=musicianId).first()
    db.session.delete(follow)
    db.session.commit()
    return {'msg': "success"}
