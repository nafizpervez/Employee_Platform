from sqlalchemy import Column, Integer, String
from backend.database.database import Base

class Employee(Base):
    __tablename__ = 'employees'

    id = Column(String, Integer, primary_key=True)
    month = Column(String)
    date = Column(String)
    day = Column(String)
    e_id = Column(Integer)
    name = Column(String)
    department = Column(String)
    in_time = Column(String)
    out_time = Column(String)
    work_hours = Column(String)


