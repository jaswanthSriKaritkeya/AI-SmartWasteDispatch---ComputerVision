import uuid

class ReportManager:

    def __init__(self):
        self.reports = []

    def create_report(self, report_data):

        report = {
            "report_id": str(uuid.uuid4())[:8],
            **report_data,
            "status": "Pending"
        }

        self.reports.append(report)

        return report

    def get_all_reports(self):
        return self.reports

    def update_status(self, report_id, status):

        for report in self.reports:
            if report["report_id"] == report_id:
                report["status"] = status
                return report

        return None