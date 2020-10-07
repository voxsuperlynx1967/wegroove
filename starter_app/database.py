from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import Musician
from app.api.user_routes import set_password

hashed = set_password('password')

with app.app_context():
  # db.drop_all()
  db.create_all()

  ian = Musician(firstName = 'Guy', lastName = 'Whatever', email = 'ian@aa.io', hashed_password=hashed, location='38.9980431,-77.41605369999999')
  javier = Musician(firstName = 'Party', lastName = 'Man', email = 'javier@aa.io', hashed_password=hashed, location='42.3520045,-71.14634459999999')

  db.session.add(ian)
  db.session.add(javier)


  db.session.commit()
