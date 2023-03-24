
from firebase_admin import firestore

def get_today_limit(db, today):
    current = db.collection(u'limits').document(today).get()

    print(f'CURRENT: {current.to_dict()}')
    if(current):
        return current.to_dict()
    
    return None

def create_limit(db, date):
    new_limit = db.collection(u'limits').document(date).set({"calls": 1, "id": date}, merge=True)
    return new_limit

def add_call_to_db(db, data):

    updated = db.collection(u'limits').document(data["id"]).update({"calls": firestore.Increment(1)})

    if updated:
        return True
    return None