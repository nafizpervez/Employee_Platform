from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from models.model import DataModel
from schemas.schemas import DataStored
from database.database import engine, get_db
from typing import List
import pandas as pd
import io

# Create the FastAPI instance
app = FastAPI()
class UploadResponse(BaseModel):
    message: str

# Allow all origins, methods, and headers for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.post("/upload_data")
async def upload_data(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_excel(io.BytesIO(contents))
        # Process the DataFrame and save it to the SQLite database
        df.to_sql('dataStored', engine, if_exists='append', index=False)
        return JSONResponse(content=UploadResponse(message="Data uploaded successfully").dict(), status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to fetch all values from the database
@app.get("/data_stored", response_model=List[DataStored])
async def get_data_stored(db: Session = Depends(get_db)):
    dataStored = db.query(DataModel).all()
    return dataStored