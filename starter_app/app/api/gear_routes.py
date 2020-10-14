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
