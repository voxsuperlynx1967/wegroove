from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Musician(db.Model):
  __tablename__ = 'musicians'

  id = db.Column(db.Integer, primary_key = True)
  firstName = db.Column(db.String(40), nullable = False)
  lastName = db.Column(db.String(40))
  longitude = db.Column(db.Float, nullable=False)
  latitude = db.Column(db.Float, nullable=False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  bio = db.Column(db.String(2000))
  mediaLink = db.Column(db.String(2000))
  hashed_password = db.Column(db.Binary(100), nullable=False)
  gear = db.relationship('Gear', backref='musicians', lazy=True)
  follows = db.relationship('Follow', backref='musicians', primaryjoin="or_(Musician.id==Follow.musicianId, Musician.id==Follow.followerId)", lazy=True)
  post = db.relationship('Post', backref='musicians', lazy=True)
  comment = db.relationship('Comment', backref='musicians', lazy=True)
  like = db.relationship('Like', backref='musicians', lazy=True)

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "longitude": self.longitude,
      "latitude": self.latitude,
      "bio": self.bio,
      "email": self.email,
      "mediaLink": self.mediaLink
    }

class GearType(db.Model):
  __tablename__ = 'geartypes'
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(500), nullable=False)
  gear = db.relationship('Gear', backref='geartypes', lazy=True)
  geartypetag = db.relationship('GearTypeTag', backref='geartypes', lazy=True)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }

class Gear(db.Model):
  __tablename__ = 'gear'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(500))
  gearTypeId = db.Column(db.Integer, db.ForeignKey('geartypes.id'), nullable=False)
  musicianId = db.Column(db.Integer, db.ForeignKey('musicians.id'), nullable=False)
  mediaLink = db.Column(db.String(2000))
  gearattribute = db.relationship('GearAttribute', backref='gear', lazy=True)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "gearTypeId": self.gearTypeId,
      "musicianId": self.musicianId,
      "mediaLink": self.mediaLink
    }

class Tag(db.Model):
  __tablename__ = 'tags'
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(100), nullable=False)
  type = db.Column(db.String(100), nullable=False)
  is_required = db.Column(db.Binary)
  geartypetag = db.relationship('GearTypeTag', backref='tags', lazy=True)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "type": self.type,
      "is_required": self.is_required
    }

class GearTypeTag(db.Model):
  __tablename__ = 'geartypetags'
  id = db.Column(db.Integer, primary_key = True)
  gearTypeId = db.Column(db.Integer, db.ForeignKey('geartypes.id'), nullable=False)
  tagId = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "gearTypeId": self.gearTypeId,
      "tagId": self.tagId
    }


class GearAttribute(db.Model):
    __tablename__ = 'gearattributes'
    gearId = db.Column(db.Integer, db.ForeignKey('gear.id'), primary_key = True)
    tag = db.Column(db.String(500), primary_key = True)
    value = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
        "gearId": self.gearId,
        "tag": self.tag,
        "value": self.value
    }

class Follow(db.Model):
    __tablename__ = 'follows'
    musicianId = db.Column(db.Integer, db.ForeignKey('musicians.id'), primary_key = True)
    followerId = db.Column(db.Integer, db.ForeignKey('musicians.id'), primary_key = True)

    def to_dict(self):
        return {
        "musicianId": self.musicianId,
        "followerId": self.followerId,
    }

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key = True)
    musicianId = db.Column(db.Integer, db.ForeignKey('musicians.id'), nullable=False)
    postType = db.Column(db.String(200), nullable=False)
    mediaLink = db.Column(db.String(2000), nullable=True)
    objectId = db.Column(db.Integer, nullable=True)
    caption = db.Column(db.String(2000), nullable=True)
    likeCount = db.Column(db.Integer, default=0)
    commentCount = db.Column(db.Integer, default=0)
    datePosted = db.Column(db.DateTime, default=datetime.now())
    comment = db.relationship('Comment', backref='posts', lazy=True)
    like = db.relationship('Like', backref='posts', lazy=True)
    musician = db.relationship('Musician', backref='posts', lazy=True)

    def to_dict(self):
        return {
        "musicianId": self.musicianId,
        "postType": self.postType,
        "mediaLink": self.mediaLink,
        "objectId": self.objectId,
        "caption": self.caption,
        "likeCount": self.likeCount,
        "commentCount": self.commentCount,
        "datePosted": self.datePosted
    }

class Comment(db.Model):
    __tablename__ = 'comments'
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key = True)
    musicianId = db.Column(db.Integer, db.ForeignKey('musicians.id'), primary_key = True)
    dateCommented = db.Column(db.DateTime, default=datetime.now())


    def to_dict(self):
        return {
        "postId": self.postId,
        "musicianId": self.musicianId,
    }

class Like(db.Model):
    __tablename__ = 'likes'
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key = True)
    musicianId = db.Column(db.Integer, db.ForeignKey('musicians.id'), primary_key = True)

    def to_dict(self):
        return {
        "postId": self.postId,
        "musicianId": self.musicianId,

    }
