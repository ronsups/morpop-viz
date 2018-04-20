# morpop-viz
Visualization for Medical Operations Research Laboratory Pandemic Outbreak Planner

## Database Set Up

To set up database, add a file called "config.py" in the root directory of the application. File should look like this:

DEBUG = False  
TESTING = False  
SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/db_name'  
SQLALCHEMY_TRACK_MODIFICATIONS = False  http://flask.pocoo.org/
SQLALCHEMY_ECHO = True  

Also install postgresql or any relational database (MySQL, SQLite, etc)

## Documentation Links
### Back end
Flask (Web development framework): http://flask.pocoo.org/  
SQLAlchemy (to use SQL in python): http://docs.sqlalchemy.org/en/latest/orm/tutorial.html  
Flask-SQLAlchemy (To connect the above two frameworks): http://flask-sqlalchemy.pocoo.org/2.3/  

### Front end
Dojo (javascript framework): https://dojotoolkit.org/documentation/#tutorials  
ArcGIS Javascript API (for maps): https://developers.arcgis.com/javascript/latest/guide/index.html  


