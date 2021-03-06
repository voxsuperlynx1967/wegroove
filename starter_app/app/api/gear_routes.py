from flask import Blueprint, jsonify, request, session
from app.models import Musician, Gear, GearAttribute, GearType, GearTypeTag, Tag, db
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt

gear_routes = Blueprint('gear', __name__)

@gear_routes.route('/')
def index():
  response = Gear.query.all()
  return {"Gear": [musician.to_dict() for musician in response]}

@gear_routes.route('/musician/<mid>')
def getspecific(mid):

    response = Gear.query.filter_by(musicianId=mid).all()
    gearList = [gear.to_dict() for gear in response]
    for gear in gearList:
        attributeList = GearAttribute.query.filter_by(gearId=gear["id"]).all()
        attributedict = [attribute.to_dict() for attribute in attributeList]
        gear["attributes"] = attributedict
    # user = User.query.filter_by(id=question.userId).first()
    # usersdict = user.to_dict()
    # questionsdict["username"] = usersdict["username"]
    return {"musiciansGear": gearList}

@gear_routes.route('/types')
def alltypes():
    response = GearType.query.all()
    geartype = [gear.to_dict() for gear in response]
    return {"gearTypes": geartype}

@gear_routes.route('/typetags')
def alltypetags():
    response = GearTypeTag.query.all()
    geartypetags = [gear.to_dict() for gear in response]
    for geartypetag in geartypetags:
        tag = Tag.query.filter_by(id=geartypetag["tagId"]).first()
        tag1 = tag.to_dict()
        geartypetag["tagName"] = tag1["name"]
        geartypetag["tagType"] = tag1["type"]
    return {"gearTypeTags": geartypetags}
@gear_routes.route('/new', methods=["POST"])
def newgear():
    data = request.get_json()
    # try:
    name = data['name']
    gearTypeId = data['gearTypeId']
    musicianId = data['musicianId']
    mediaLink = data['mediaLink']

    if not name or not gearTypeId or not mediaLink:
      return jsonify(message="Name, gear type, and mediaLink required"), 400
    gear = Gear(
        name=name,
        gearTypeId=gearTypeId,
        musicianId=musicianId,
        mediaLink=mediaLink
      )
    db.session.add(gear)
    db.session.commit()
    gear1 = gear.to_dict()
    return jsonify(gear=gear1), 200

@gear_routes.route('/attribute/new', methods=["POST"])
def newattribute():
    data = request.get_json()
    # try:
    gearId = data['gearId']
    tag = data['tag']
    value = data['value']

    if not gearId or not tag or not value:
      return jsonify(message="Tag and value are required!"), 400
    attribute = GearAttribute(
        gearId=gearId,
        tag=tag,
        value=value
      )
    db.session.add(attribute)
    db.session.commit()
    attribute1 = attribute.to_dict()
    return jsonify(attribute=attribute1), 200
