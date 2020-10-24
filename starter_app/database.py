from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import Musician, GearType, Gear, Tag, GearTypeTag, GearAttribute
from app.api.user_routes import set_password

hashed = set_password('password')

with app.app_context():
  db.drop_all()
  db.create_all()

  Jimi = Musician(firstName = 'Jimi', lastName = 'Hendrix', email = 'ian@aa.io', hashed_password=hashed, latitude=38.9980431, longitude=-77.41605369999999, bio="I am the best guitarist ever... Who are you?", mediaLink="https://www.gstatic.com/tv/thumb/persons/31690/31690_v9_ba.jpg")
  Neil = Musician(firstName = 'Neil', lastName = 'Young', email = 'javier@aa.io', hashed_password=hashed, latitude=42.3520045,longitude=-71.14634459999999, bio="Old man look at my life, you're a lot like I am right now", mediaLink="https://www.rollingstone.com/wp-content/uploads/2018/10/neil-young-1976-live-album-songs-for-judy.jpg")
  Anton = Musician(firstName = 'Anton', lastName = 'Newcombe', email = 'dunston@aa.io', hashed_password=hashed, latitude=42.3520045,longitude=-71.14634459999999, bio="I AM the Brian Jonestown Massacre. No one else in my band matters. Okay??", mediaLink="https://s3.amazonaws.com/quietus_production/images/articles/15620/Anton_Newcombe_1403792689_crop_550x555.jpg")
  Simon = Musician(firstName = 'Simon', lastName = 'Carroll', email = 'snc40@georgetown.edu', hashed_password=hashed, latitude=42.3520045,longitude=-71.14634459999999, bio="Just a regular guy", mediaLink="https://scontent-bos3-1.xx.fbcdn.net/v/t31.0-8/28828695_877121324746_5175806898433144366_o.jpg?_nc_cat=111&_nc_sid=cdbe9c&_nc_ohc=W4yVoUA_6wwAX9JF833&_nc_ht=scontent-bos3-1.xx&oh=09ce4920c3551e46d1a646c5a2799819&oe=5FA86A62")
  John = Musician(firstName = 'John', lastName = 'Lennon', email = 'jlennon@gmail.com', hashed_password=hashed, latitude=42.863334,longitude=-71.369324, bio="Jai guru deva om", mediaLink="https://i.pinimg.com/originals/c1/61/50/c16150c3ef51107f16da504d552da3f0.jpg")
  George = Musician(firstName = 'George', lastName = 'Harrison', email = 'gharrison@gmail.com', hashed_password=hashed, latitude=42.271168,longitude=-71.425219, bio="Stop throwing jelly beans at me", mediaLink="https://i.pinimg.com/originals/5f/98/8f/5f988ff29a92dd2abda7daffc4f1e379.png")
  db.session.add(Jimi)
  db.session.add(Neil)
  db.session.add(Anton)
  db.session.add(Simon)
  db.session.add(John)
  db.session.add(George)

  db.session.commit()

  cab = GearType(name='Speaker Cabinet')
  amp = GearType(name='Amplifier')
  guitar = GearType(name='Electric Guitar')

  db.session.add(cab)
  db.session.add(amp)
  db.session.add(guitar)

  db.session.commit()



  antonamp = Gear(name='My Favorite Amp', gearTypeId=2, musicianId=3, mediaLink="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUb3gpJ5NjVCMB10lIFx0N368WLDh7J3oCEg&usqp=CAU")
  antonguitar = Gear(name='My Phantom', gearTypeId=3, musicianId=3, mediaLink="https://images.equipboard.com/uploads/item/image/27822/vox-phantom-special-vii-xl.jpg")
  neilamp = Gear(name='My Tweed', gearTypeId=2, musicianId=2, mediaLink="https://images.equipboard.com/uploads/item/image/22649/fender-twin-tweed-xl.jpg")
  neilguitar = Gear(name='The Falcon', gearTypeId=3, musicianId=2, mediaLink="https://images.equipboard.com/uploads/item/image/16995/1961-gretsch-white-falcon-xl.jpg")
  jimiguitar = Gear(name='My Strat', gearTypeId=3, musicianId=1, mediaLink="https://www.livewiremusicnow.com/uploads/1/2/5/4/125400209/s304404583291342992_p91_i8_w833.png")
  jimicab  = Gear(name='Big Fella', gearTypeId=1, musicianId=1, mediaLink="https://lh3.googleusercontent.com/0tkJoLDz29pp6QCqfm6gzym5j287Ar_OOLObVbvCf6rGT5zFxl1ReeMDnVIVzaNmtYHE5g=s89")
  simonguit  = Gear(name='My SG', gearTypeId=3, musicianId=4, mediaLink="https://i.pinimg.com/originals/b0/38/19/b03819e46507182b5afe684ce63921cb.jpg")
  johnguit  = Gear(name='My Rick', gearTypeId=3, musicianId=5, mediaLink="https://i.pinimg.com/originals/c2/05/d9/c205d9e7626d0f162973c603388b901a.jpg")
  georgeguit  = Gear(name='My Guitar', gearTypeId=3, musicianId=6, mediaLink="https://i.pinimg.com/originals/e0/21/40/e0214081f05bd2866e2722aaad51c656.jpg")



  db.session.add(antonamp)
  db.session.add(antonguitar)
  db.session.add(neilamp)
  db.session.add(neilguitar)
  db.session.add(jimiguitar)
  db.session.add(jimicab)
  db.session.add(simonguit)
  db.session.add(johnguit)
  db.session.add(georgeguit)

  db.session.commit()


  make = Tag(name="Make", type="String")
  model = Tag(name="Model", type="String")
  ohmage = Tag(name="Ohms", type="Integer")
  scount = Tag(name="Speaker count", type="String")
  ssize = Tag(name="Speaker size", type="String")
  string = Tag(name="String", type="Integer")
  body = Tag(name="Body", type="String")
  watts = Tag(name="Watts", type="Integer")
  combo = Tag(name="Combo/Head", type="String")

  db.session.add(make)
  db.session.add(model)
  db.session.add(ohmage)
  db.session.add(scount)
  db.session.add(ssize)
  db.session.add(string)
  db.session.add(body)
  db.session.add(watts)
  db.session.add(combo)

  db.session.commit()

  cabmake = GearTypeTag(gearTypeId=1, tagId=1)
  cabmodel = GearTypeTag(gearTypeId=1, tagId=2)
  cabohmage = GearTypeTag(gearTypeId=1, tagId=3)
  cabscount = GearTypeTag(gearTypeId=1, tagId=4)
  cabssize = GearTypeTag(gearTypeId=1, tagId=5)
  ampmake = GearTypeTag(gearTypeId=2, tagId=1)
  ampmodel = GearTypeTag(gearTypeId=2, tagId=2)
  ampwatts = GearTypeTag(gearTypeId=2, tagId=8)
  ampcombo = GearTypeTag(gearTypeId=2, tagId=9)
  eguitmake = GearTypeTag(gearTypeId=3, tagId=1)
  eguitmodel = GearTypeTag(gearTypeId=3, tagId=2)
  eguitstring = GearTypeTag(gearTypeId=3, tagId=6)
  eguitbody = GearTypeTag(gearTypeId=3, tagId=7)

  db.session.add(cabmake)
  db.session.add(cabmodel)
  db.session.add(cabohmage)
  db.session.add(cabscount)
  db.session.add(cabssize)
  db.session.add(ampmake)
  db.session.add(ampmodel)
  db.session.add(ampwatts)
  db.session.add(ampcombo)
  db.session.add(eguitmake)
  db.session.add(eguitmodel)
  db.session.add(eguitstring)
  db.session.add(eguitbody)

  db.session.commit()

  antampmake = GearAttribute(gearId=1, tag="Make", value="Fender")
  antampmodel = GearAttribute(gearId=1, tag="Model", value="Twin Reverb")
  antampwatts = GearAttribute(gearId=1, tag="Watts", value="100")
  antampcombo = GearAttribute(gearId=1, tag="Combo/Head", value="Combo")
  antguitmake = GearAttribute(gearId=2, tag="Make", value="Vox")
  antguitmodel = GearAttribute(gearId=2, tag="Model", value="Phantom")
  antguitstring = GearAttribute(gearId=2, tag="String", value="6")
  antguitbody = GearAttribute(gearId=2, tag="Body", value="Solid")
  neilampmake = GearAttribute(gearId=3, tag="Make", value="Fender")
  neilampmodel = GearAttribute(gearId=3, tag="Model", value="Tweed Deluxe")
  neilampwatts = GearAttribute(gearId=3, tag="Watts", value="100")
  neilampcombo = GearAttribute(gearId=3, tag="Combo/Head", value="Combo")
  neilguitmake = GearAttribute(gearId=4, tag="Make", value="Gretsch")
  neilguitmodel = GearAttribute(gearId=4, tag="Model", value="Falcon")
  neilguitstring = GearAttribute(gearId=4, tag="String", value="6")
  neilguitbody = GearAttribute(gearId=4, tag="Body", value="Semi-Hollow")
  jguitmake = GearAttribute(gearId=5, tag="Make", value="Fender")
  jguitmodel = GearAttribute(gearId=5, tag="Model", value="Stratocaster")
  jguitstring = GearAttribute(gearId=5, tag="String", value="6")
  jguitbody = GearAttribute(gearId=5, tag="Body", value="Solid")
  jcabmake = GearAttribute(gearId=6, tag="Make", value="Sunn")
  jcabmodel = GearAttribute(gearId=6, tag="Model", value="4x12")
  jcabscount = GearAttribute(gearId=6, tag="Speaker count", value="4")
  jcabssize = GearAttribute(gearId=6, tag="Speaker size", value="12")
  syguitmake = GearAttribute(gearId=7, tag="Make", value="Gibson")
  syguitmodel = GearAttribute(gearId=7, tag="Model", value="SG")
  syguitstring = GearAttribute(gearId=7, tag="String", value="6")
  syguitbody = GearAttribute(gearId=7, tag="Body", value="Solid")
  joguitmake = GearAttribute(gearId=8, tag="Make", value="Rickenbacker")
  joguitstring = GearAttribute(gearId=8, tag="String", value="6")
  joguitbody = GearAttribute(gearId=8, tag="Body", value="Solid")
  gguitmake = GearAttribute(gearId=9, tag="Make", value="Gretsch")
  gguitmodel = GearAttribute(gearId=9, tag="Model", value="Country Gentleman")
  gguitstring = GearAttribute(gearId=9, tag="String", value="6")
  gguitbody = GearAttribute(gearId=9, tag="Body", value="Semi-Hollow")

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
  db.session.add(syguitmake)
  db.session.add(syguitmodel)
  db.session.add(syguitstring)
  db.session.add(syguitbody)
  db.session.add(joguitmake)
  db.session.add(joguitstring)
  db.session.add(joguitbody)
  db.session.add(gguitmake)
  db.session.add(gguitmodel)
  db.session.add(gguitstring)
  db.session.add(gguitbody)




  db.session.commit()

  follow1 = Follow(musicianId=1, followerId=2)
  follow2 = Follow(musicianId=1, followerId=3)
#   follow3 =
#   follow4
#   follow5
#   follow6
#   follow7
#   follow8
#   follow9
#   follow10
#   follow11
