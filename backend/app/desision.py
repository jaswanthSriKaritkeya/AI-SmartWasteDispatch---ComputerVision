class DecisionEngine:

    def generate_report(self, waste_type, garbage_count, coverage):

        # -------- Severity --------
        if coverage < 10:
            severity = "Low"
        elif coverage < 30:
            severity = "Medium"
        elif coverage < 60:
            severity = "High"
        else:
            severity = "Critical"

        # -------- Personnel --------
        if garbage_count <= 5:
            personnel = 2
        elif garbage_count <= 15:
            personnel = 3
        elif garbage_count <= 30:
            personnel = 4
        else:
            personnel = 5

        # -------- Vehicle --------
        vehicle_map = {
            "Plastic": "Dry Waste Collection Vehicle",
            "Metal": "Metal Recycling Vehicle",
            "Organic": "Organic Waste Vehicle",
            "Mixed": "Municipal Garbage Truck",
            "Glass": "Glass Recycling Vehicle",
            "Paper": "Paper Recycling Vehicle",
            "E-Waste": "E-Waste Collection Vehicle"
        }

        vehicle = vehicle_map.get(
            waste_type,
            "Municipal Garbage Truck"
        )

        # -------- Recyclable --------
        recyclable = waste_type in [
            "Plastic",
            "Metal",
            "Glass",
            "Paper",
            "E-Waste"
        ]

        return {
            "waste_type": waste_type,
            "garbage_count": garbage_count,
            "coverage": coverage,
            "severity": severity,
            "recommended_vehicle": vehicle,
            "personnel_required": personnel,
            "recyclable": recyclable
        }