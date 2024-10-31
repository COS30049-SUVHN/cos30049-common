from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.requests import Request

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    # return {"message": f"Oops! {exc.detail}"}
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": f"Oops! {exc.detail}"}
    )

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id <= 0:
        raise HTTPException(detail="Invalid item ID", status_code=400)
    return {"item_id": item_id}


@app.get("/divide")
async def divide(x: int, y: int):
    try:
        result = x / y
    except ZeroDivisionError:
        raise HTTPException(status_code=400, detail="Cannot divide by zero")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    else:
        return {"result": result}
