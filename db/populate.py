import json
import random
import pymongo

# populate the database
# insert two collections where each collection has 10k documents each
# with a random statistical area level 2 code name and a random value

if __name__ == "__main__":
    with open("./SA2_MAIN16.json", 'r') as file:
        codes = json.load(file)
        random.shuffle(codes)

        category1 = []
        category2 = []

        weight = [random.random() for c in codes]

        for i in range(10000):
            category1.append({
                "sa2": random.choices(codes, weight)[0],
                "value": random.randrange(0, 100)
            })
        
        weight = [random.random() for c in codes]

        for i in range(10000):
            category2.append({
                "sa2": random.choices(codes, weight)[0],
                "value": random.randrange(0, 100)
            })

        conn_str = "mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT"
        client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)

        try:
            client.drop_database("dataVisualizer")

            db = client.dataVisualizer
            db.category1.insert_many(category1)
            db.category2.insert_many(category2)

        except Exception:
            print("Unable to connect to the server.")
