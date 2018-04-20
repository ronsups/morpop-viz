# morpop-viz
Visualization for Medical Operations Research Laboratory Pandemic Outbreak Planner

To set up database, add a file called "config.py" in the root directory of the application. File should look like this:

DEBUG = False
TESTING = False
SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/db_name'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

