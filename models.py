from app import db
from sqlalchemy import desc
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime


class Scenario(db.Model):
    __tablename__ = 'Scenario'

    scenario_id = db.Column(db.Integer, primary_key=True)
    scenario_name = db.Column(db.String())
    created_dt = db.Column(db.TIMESTAMP())
    last_modified_dt = db.Column(db.TIMESTAMP())
    deleted_dt = db.Column(db.TIMESTAMP())
    is_deleted = db.Column(db.Boolean())

    def __init__(self, name):
        prev_id = Scenario.get_most_recent_id()
        self.scenario_id = 1 if prev_id is None else prev_id + 1
        self.scenario_name = name
        self.created_dt = datetime.now()
        self.last_modified_dt = datetime.now()
        self.is_deleted = False

    def __repr__(self):
        return '<id {}, name {}>'.format(self.scenario_id, self.scenario_name)

    @staticmethod
    def get_all():
        scenarios = Scenario.query.filter_by(is_deleted=False).all()
        return [{
            'id': scenario.scenario_id,
            'name': scenario.scenario_name,
            'created_dt': scenario.created_dt.strftime('%Y-%m-%d %H:%M:%S'),
            'last_modified_dt': scenario.last_modified_dt.strftime('%Y-%m-%d %H:%M:%S'),
        } for scenario in scenarios]

    @staticmethod
    def get_one(id):
        scenario = Scenario.query.filter_by(scenario_id=id, is_deleted=False).one()
        return {
            'id': scenario.scenario_id,
            'name': scenario.scenario_name,
            'created_dt': scenario.created_dt.strftime('%Y-%m-%d %H:%M:%S'),
            'last_modified_dt': scenario.last_modified_dt.strftime('%Y-%m-%d %H:%M:%S')
        }

    @staticmethod
    def get_most_recent_id():
        most_recent_id = db.session.query(Scenario.scenario_id).order_by(desc(Scenario.scenario_id)).first()
        return most_recent_id[0]

    @staticmethod
    def insert(new_scenario):
        new_scenario = Scenario(new_scenario['name'])
        db.session.add(new_scenario)
        db.session.commit()
        return new_scenario.scenario_id

    @staticmethod
    def update(edited_scenario):
        print('### ' + str(edited_scenario))
        scenario = Scenario.query.filter_by(scenario_id=edited_scenario['id'], is_deleted=False).one()
        scenario.scenario_name = edited_scenario['name']
        scenario.last_modified_dt = datetime.now()
        db.session.commit()
        return scenario.scenario_id

    @staticmethod
    def delete(id):
        scenario = Scenario.query.filter_by(scenario_id=id, is_deleted=False).one()
        scenario.is_deleted = True
        scenario.last_modified_dt = datetime.now()
        scenario.deleted_dt = datetime.now()
        db.session.commit()
        return id

db.create_all()
db.session.commit()


