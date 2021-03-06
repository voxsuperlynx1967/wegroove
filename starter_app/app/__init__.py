import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_login import LoginManager

from .models import db, Musician, Gear, GearAttribute, GearType, GearTypeTag, Tag, Follow, Post, Comment, Like
from .api.user_routes import user_routes
from .api.gear_routes import gear_routes
from .api.photo_routes import photo_routes
from .api.follow_routes import follow_routes
from .api.post_routes import post_routes
from .api.like_routes import like_routes



from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(gear_routes, url_prefix='/api/gear')
app.register_blueprint(photo_routes, url_prefix='/api/photo')
app.register_blueprint(follow_routes, url_prefix='/api/follow')
app.register_blueprint(post_routes, url_prefix='/api/post')
app.register_blueprint(like_routes, url_prefix='/api/like')
db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
login = LoginManager(app)

## Application Security
CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        print("favicon route_____")
        return app.send_static_file('favicon.ico')
    print("index route_____")
    return app.send_static_file('index.html')
