from flask_sqlalchemy import SQLAlchemy

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
    gearId = db.Column(db.Integer, db.ForeignKey('gear.id'), primary_key = True)
    tag = db.Column(db.String(500), primary_key = True)
    value = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
        "gearId": self.gearId,
        "tag": self.tag,
        "value": self.value
    }
