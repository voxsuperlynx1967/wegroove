from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import Musician, GearType, Gear, Tag, GearTypeTag, GearAttribute
from app.api.user_routes import set_password

hashed = set_password('password')

with app.app_context():
  # db.drop_all()
  db.create_all()

#   Jimi = Musician(firstName = 'Jimi', lastName = 'Hendrix', email = 'ian@aa.io', hashed_password=hashed, location='38.9980431,-77.41605369999999', bio="I am the best guitarist ever... Who are you?", mediaLink="https://www.gstatic.com/tv/thumb/persons/31690/31690_v9_ba.jpg")
#   Neil = Musician(firstName = 'Neil', lastName = 'Young', email = 'javier@aa.io', hashed_password=hashed, location='42.3520045,-71.14634459999999', bio="Old man look at my life, you're a lot like I am right now", mediaLink="https://www.rollingstone.com/wp-content/uploads/2018/10/neil-young-1976-live-album-songs-for-judy.jpg")
#   Anton = Musician(firstName = 'Anton', lastName = 'Newcombe', email = 'dunston@aa.io', hashed_password=hashed, location='42.3520045,-71.14634459999999', bio="I AM the Brian Jonestown Massacre. No one else in my band matters. Okay??", mediaLink="https://s3.amazonaws.com/quietus_production/images/articles/15620/Anton_Newcombe_1403792689_crop_550x555.jpg")

#   db.session.add(Jimi)
#   db.session.add(Neil)
#   db.session.add(Anton)

#   db.session.commit()

#   cab = GearType(name='Speaker Cabinet')
#   amp = GearType(name='Amplifier')
#   guitar = GearType(name='Electric Guitar')

#   db.session.add(cab)
#   db.session.add(amp)
#   db.session.add(guitar)

#   db.session.commit()



#   antonamp = Gear(name='My Favorite Amp', gearTypeId=11, musicianId=9, mediaLink="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUb3gpJ5NjVCMB10lIFx0N368WLDh7J3oCEg&usqp=CAU")
#   antonguitar = Gear(name='My Phanton', gearTypeId=12, musicianId=9, mediaLink="https://images.equipboard.com/uploads/item/image/27822/vox-phantom-special-vii-xl.jpg")
#   neilamp = Gear(name='My Tweed', gearTypeId=11, musicianId=8, mediaLink="https://images.equipboard.com/uploads/item/image/22649/fender-twin-tweed-xl.jpg")
#   neilguitar = Gear(name='The Falcon', gearTypeId=12, musicianId=8, mediaLink="https://images.equipboard.com/uploads/item/image/16995/1961-gretsch-white-falcon-xl.jpg")
#   jimiguitar = Gear(name='My Strat', gearTypeId=12, musicianId=7, mediaLink="https://www.livewiremusicnow.com/uploads/1/2/5/4/125400209/s304404583291342992_p91_i8_w833.png")
#   jimicab  = Gear(name='Big Fella', gearTypeId=10, musicianId=7, mediaLink="https://lh3.googleusercontent.com/0tkJoLDz29pp6QCqfm6gzym5j287Ar_OOLObVbvCf6rGT5zFxl1ReeMDnVIVzaNmtYHE5g=s89")



#   db.session.add(antonamp)
#   db.session.add(antonguitar)
#   db.session.add(neilamp)
#   db.session.add(neilguitar)
#   db.session.add(jimiguitar)
#   db.session.add(jimicab)

#   db.session.commit()


#   make = Tag(name="Make", type="String")
#   model = Tag(name="Model", type="String")
#   ohmage = Tag(name="Ohms", type="Integer")
#   scount = Tag(name="Speaker count", type="String")
#   ssize = Tag(name="Speaker size", type="String")
#   string = Tag(name="String", type="Integer")
#   body = Tag(name="Body", type="String")
#   watts = Tag(name="Watts", type="Integer")
#   combo = Tag(name="Combo/Head", type="String")

#   db.session.add(make)
#   db.session.add(model)
#   db.session.add(ohmage)
#   db.session.add(scount)
#   db.session.add(ssize)
#   db.session.add(string)
#   db.session.add(body)
#   db.session.add(watts)
#   db.session.add(combo)

#   db.session.commit()

#   cabmake = GearTypeTag(gearTypeId=10, tagId=28)
#   cabmodel = GearTypeTag(gearTypeId=10, tagId=29)
#   cabohmage = GearTypeTag(gearTypeId=10, tagId=30)
#   cabscount = GearTypeTag(gearTypeId=10, tagId=31)
#   cabssize = GearTypeTag(gearTypeId=10, tagId=31)
#   ampmake = GearTypeTag(gearTypeId=11, tagId=28)
#   ampmodel = GearTypeTag(gearTypeId=11, tagId=29)
#   ampwatts = GearTypeTag(gearTypeId=11, tagId=35)
#   ampcombo = GearTypeTag(gearTypeId=11, tagId=36)
#   eguitmake = GearTypeTag(gearTypeId=12, tagId=28)
#   eguitmodel = GearTypeTag(gearTypeId=12, tagId=29)
#   eguitstring = GearTypeTag(gearTypeId=12, tagId=33)
#   eguitbody = GearTypeTag(gearTypeId=12, tagId=34)

#   db.session.add(cabmake)
#   db.session.add(cabmodel)
#   db.session.add(cabohmage)
#   db.session.add(cabscount)
#   db.session.add(cabssize)
#   db.session.add(ampmake)
#   db.session.add(ampmodel)
#   db.session.add(ampwatts)
#   db.session.add(ampcombo)
#   db.session.add(eguitmake)
#   db.session.add(eguitmodel)
#   db.session.add(eguitstring)
#   db.session.add(eguitbody)

#   db.session.commit()

  antampmake = GearAttribute(gearId=2, tag="Make", value="Fender")
  antampmodel = GearAttribute(gearId=2, tag="Model", value="Twin Reverb")
  antampwatts = GearAttribute(gearId=2, tag="Watts", value="100")
  antampcombo = GearAttribute(gearId=2, tag="Combo/Head", value="Combo")
  antguitmake = GearAttribute(gearId=3, tag="Make", value="Vox")
  antguitmodel = GearAttribute(gearId=3, tag="Model", value="Phantom")
  antguitstring = GearAttribute(gearId=3, tag="String", value="6")
  antguitbody = GearAttribute(gearId=3, tag="Body", value="Semi-Hollow")
  neilampmake = GearAttribute(gearId=4, tag="Make", value="Fender")
  neilampmodel = GearAttribute(gearId=4, tag="Model", value="Tweed Deluxe")
  neilampwatts = GearAttribute(gearId=4, tag="Watts", value="100")
  neilampcombo = GearAttribute(gearId=4, tag="Combo/Head", value="Combo")
  neilguitmake = GearAttribute(gearId=5, tag="Make", value="Gretsch")
  neilguitmodel = GearAttribute(gearId=5, tag="Model", value="Falcon")
  neilguitstring = GearAttribute(gearId=5, tag="String", value="6")
  neilguitbody = GearAttribute(gearId=5, tag="Body", value="Semi-Hollow")
  jguitmake = GearAttribute(gearId=6, tag="Make", value="Fender")
  jguitmodel = GearAttribute(gearId=6, tag="Model", value="Stratocaster")
  jguitstring = GearAttribute(gearId=6, tag="String", value="6")
  jguitbody = GearAttribute(gearId=6, tag="Body", value="Solid")
  jcabmake = GearAttribute(gearId=7, tag="Make", value="Sunn")
  jcabmodel = GearAttribute(gearId=7, tag="Model", value="4x12")
  jcabscount = GearAttribute(gearId=7, tag="Speaker count", value="4")
  jcabssize = GearAttribute(gearId=7, tag="Speaker size", value="12")

  db.session.add(antampmake)
  db.session.add(antampmodel)
  db.session.add(antampwatts)
  db.session.add(antampcombo)
  db.session.add(antguitmake)
  db.session.add(antguitmodel)
  db.session.add(antguitstring)
  db.session.add(antguitbody)
  db.session.add(neilampmake)
  db.session.add(neilampmodel)
  db.session.add(neilampwatts)
  db.session.add(neilampcombo)
  db.session.add(neilguitmake)
  db.session.add(neilguitmodel)
  db.session.add(neilguitstring)
  db.session.add(neilguitbody)
  db.session.add(jguitmake)
  db.session.add(jguitmodel)
  db.session.add(jguitstring)
  db.session.add(jguitbody)
  db.session.add(jcabmake)
  db.session.add(jcabmodel)
  db.session.add(jcabscount)
  db.session.add(jcabssize)



  db.session.commit()
