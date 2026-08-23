from datetime import datetime
import uuid

from app.database import reports_collection


class ReportManager:

    def create_report(self, report_data):

        report = {
            "report_id": str(uuid.uuid4())[:8],
            **report_data,
            "status": "pending",
            "created_at": datetime.utcnow()
        }

        result = reports_collection.insert_one(report)

        # Convert MongoDB ObjectId
        report["_id"] = str(result.inserted_id)

        return report


    def get_report(self, report_id):

        report = reports_collection.find_one({
            "report_id": report_id
        })

        if report:
            report["_id"] = str(report["_id"])

        return report


    def get_all_reports(self):

        reports = list(
            reports_collection.find()
        )

        for report in reports:
            report["_id"] = str(report["_id"])

        return reports


    def get_reports_by_citizen(self, citizen_id):

        reports = list(
            reports_collection.find({
                "citizen_id": citizen_id
            }).sort("created_at", -1)
        )

        for report in reports:
            report["_id"] = str(report["_id"])

        return reports


    def update_status(self, report_id, status):

        result = reports_collection.update_one(
            {
                "report_id": report_id
            },
            {
                "$set": {
                    "status": status
                }
            }
        )

        if result.matched_count == 0:
            return None

        return self.get_report(report_id)