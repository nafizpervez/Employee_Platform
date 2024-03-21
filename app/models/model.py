from sqlalchemy import Column, Integer, String
from database.database import Base

class DataModel(Base):
    __tablename__ = 'dataStored'

    month = Column(String)
    date = Column(String)
    day = Column(String)
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    department = Column(String)
    in_time = Column(String)
    out_time = Column(String)
    work_hour = Column(String)