from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Musician(db.Model):
  __tablename__ = 'musician'

  id = db.Column(db.Integer, primary_key = True)
  firstName = db.Column(db.String(40), nullable = False)
  lastName = db.Column(db.String(40))
  location = db.Column(db.String(500), nullable=False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  bio = db.Column(db.String(2000))
  hashed_password = db.Column(db.Binary(100), nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "location": self.location,
      "email": self.email,
    }
