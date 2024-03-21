from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from backend.models.model import Employee
from backend.database.database import get_db

app = FastAPI()


@app.post("/upload_data")
def upload_data(data: list[Employee], db: Session = Depends(get_db)):
    try:
        for entry in data:
            db.add(entry)
        db.commit()
        return {"message": "Data uploaded successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    


