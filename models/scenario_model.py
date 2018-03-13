from app import db
from sqlalchemy.dialects.postgresql import JSON


class Scenario(db.Model):
    __tablename__ = 'scenario'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<id {}>'.format(self.id)