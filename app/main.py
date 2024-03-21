from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models.model import DataModel
from database.database import engine
import pandas as pd
import io
import shutil

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
        # Assuming the uploaded file is in Excel format
        df = pd.read_excel(io.BytesIO(contents))
        # Process the DataFrame and save it to the SQLite database
        df.to_sql('dataStored', engine, if_exists='append', index=False)
        return JSONResponse(content=UploadResponse(message="Data uploaded successfully").dict(), status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
#     # Check if the uploaded file is an Excel file
#     if not file.filename.endswith('.xlsx'):
#         raise HTTPException(status_code=400, detail="Uploaded file must be in .xlsx format")
    
#     # Save the uploaded file temporarily
#     with open(file.filename, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Load Excel file into a pandas DataFrame
#     try:
#         df = pd.read_excel(file.filename)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Error reading Excel file: {str(e)}")
    
#     # Iterate through DataFrame rows and save data to the database
#     for _, row in df.iterrows():
#         data = DataModel(
#             # Modify this part to match your Excel columns
#             month=row['month'],
#             date=row['date'],
#             day=row['day'],
#             id=row['id'],
#             name=row['name'],
#             department=row['department'],
#             in_time=row['in_time'],
#             out_time=row['out_time'],
#             work_hour=row['Work_hour']
#         )
#         db.add(data)
#     db.commit()

#     return {"message": f"File '{file.filename}' uploaded and data saved to the database successfully"}