from pydantic import BaseModel


class DataStored(BaseModel):
    month: int | str
    date: int | str
    day: int | str
    id: int
    name: str
    department: str
    in_time: str
    out_time: str
    work_hour: str