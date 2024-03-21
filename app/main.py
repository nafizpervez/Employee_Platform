from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models.model import Employee
from database.database import get_db
import pandas as pd
import shutil

# Create the FastAPI instance
app = FastAPI()

# Allow all origins, methods, and headers for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.post("/upload_data")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Check if the uploaded file is an Excel file
    if not file.filename.endswith('.xlsx'):
        raise HTTPException(status_code=400, detail="Uploaded file must be in .xlsx format")
    
    # Save the uploaded file temporarily
    with open(file.filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load Excel file into a pandas DataFrame
    try:
        df = pd.read_excel(file.filename)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading Excel file: {str(e)}")
    
    # Iterate through DataFrame rows and save data to the database
    for _, row in df.iterrows():
        data = Employee(
            # Modify this part to match your Excel columns
            month=row['month'],
            date=row['date'],
            day=row['day'],
            e_id=row['id'],
            name=row['name'],
            department=row['department'],
            in_time=row['in_time'],
            out_time=row['out_time'],
            work_hours=row['Work_hour']
        )
        db.add(data)
    db.commit()

    return {"message": f"File '{file.filename}' uploaded and data saved to the database successfully"}