from app import db
from sqlalchemy.dialects.postgresql import JSON


class Scenario(db.Model):
    __tablename__ = 'Scenario'

    scenario_id = db.Column(db.Integer, primary_key=True)
    scenario_name = db.Column(db.String())

    def __init__(self, name):
        self.scenario_name = name

    def __repr__(self):
        return '<id {}>'.format(self.scenario_id)

    @staticmethod
    def get_all():
        return Scenario.query.all()

    @staticmethod
    def get_one(id):
        return Scenario.query.filter_by(scenario_id=id).one()

    @staticmethod
    def get_most_recent_id():
        return db.session.query(Scenario.name)

db.create_all()
db.session.commit()
