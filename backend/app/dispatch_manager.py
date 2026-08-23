from datetime import datetime

from app.database import (
    dispatch_requests_collection,
    reports_collection
)


class DispatchManager:

    def create_requests(
        self,
        report_id,
        eligible_captains
    ):

        requests = []

        for captain in eligible_captains:

            request = {

                "report_id": report_id,

                "captain_id": captain["captain_id"],

                "vehicle_id": captain["vehicle_id"],

                "vehicle_number": captain["vehicle_number"],

                "distance_km": captain["distance_km"],

                "status": "pending",

                "created_at": datetime.utcnow()
            }

            result = dispatch_requests_collection.insert_one(
                request
            )

            request["request_id"] = str(
                result.inserted_id
            )

            requests.append(request)

        return requests


    def get_captain_requests(
        self,
        captain_id
    ):

        requests = list(
            dispatch_requests_collection.find({
                "captain_id": captain_id,
                "status": "pending"
            })
        )

        for request in requests:

            request["request_id"] = str(
                request["_id"]
            )

            del request["_id"]

        return requests


    def accept_request(
        self,
        request_id,
        captain_id
    ):

        # Find the captain's request
        request = dispatch_requests_collection.find_one({
            "_id": request_id,
            "captain_id": captain_id,
            "status": "pending"
        })

        if not request:
            return {
                "success": False,
                "message": "Request not found or already processed"
            }


        report_id = request["report_id"]


        # --------------------------------
        # FIRST CAPTAIN WINS
        # --------------------------------

        result = reports_collection.update_one(

            {
                "report_id": report_id,
                "status": "pending"
            },

            {
                "$set": {
                    "status": "assigned",
                    "captain_id": captain_id,
                    "vehicle_id": request["vehicle_id"],
                    "assigned_at": datetime.utcnow()
                }
            }
        )


        # Someone else already accepted
        if result.modified_count == 0:

            dispatch_requests_collection.update_one(
                {
                    "_id": request["_id"]
                },
                {
                    "$set": {
                        "status": "cancelled"
                    }
                }
            )

            return {
                "success": False,
                "message": "Request already accepted by another captain"
            }


        # --------------------------------
        # THIS CAPTAIN WON
        # --------------------------------

        dispatch_requests_collection.update_one(

            {
                "_id": request["_id"]
            },

            {
                "$set": {
                    "status": "accepted",
                    "accepted_at": datetime.utcnow()
                }
            }
        )


        # Cancel all other captain requests
        dispatch_requests_collection.update_many(

            {
                "report_id": report_id,
                "_id": {
                    "$ne": request["_id"]
                },
                "status": "pending"
            },

            {
                "$set": {
                    "status": "cancelled",
                    "cancelled_at": datetime.utcnow()
                }
            }
        )


        return {
            "success": True,
            "message": "Waste collection request accepted",
            "report_id": report_id,
            "captain_id": captain_id,
            "vehicle_id": request["vehicle_id"]
        }