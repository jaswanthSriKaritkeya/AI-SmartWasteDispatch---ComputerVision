from math import radians, sin, cos, sqrt, atan2

from app.database import vehicles_collection


class DispatchEngine:

    MAX_DISTANCE_KM = 5

    def calculate_distance(
        self,
        lat1,
        lon1,
        lat2,
        lon2
    ):
        """
        Calculate distance between two GPS coordinates
        using the Haversine formula.
        """

        R = 6371  # Earth radius in KM

        lat1 = radians(lat1)
        lat2 = radians(lat2)

        delta_lat = radians(lat2 - lat1)
        delta_lon = radians(lon2 - lon1)

        a = (
            sin(delta_lat / 2) ** 2
            +
            cos(lat1)
            * cos(lat2)
            * sin(delta_lon / 2) ** 2
        )

        c = 2 * atan2(
            sqrt(a),
            sqrt(1 - a)
        )

        return R * c


    def find_eligible_captains(self, report):

        eligible = []

        waste_type = report["waste_type"]

        latitude = report["location"]["latitude"]
        longitude = report["location"]["longitude"]

        required_capacity = self.calculate_required_capacity(
            report
        )

        vehicles = vehicles_collection.find({
            "status": "available"
        })

        for vehicle in vehicles:

            # --------------------------------
            # 1. Check waste type
            # --------------------------------

            supported_waste_types = vehicle.get(
                "waste_types",
                []
            )

            if waste_type not in supported_waste_types:
                continue


            # --------------------------------
            # 2. Check capacity
            # --------------------------------

            vehicle_capacity = vehicle.get(
                "capacity",
                0
            )

            if vehicle_capacity < required_capacity:
                continue


            # --------------------------------
            # 3. Check location
            # --------------------------------

            vehicle_location = vehicle.get(
                "location"
            )

            if not vehicle_location:
                continue

            vehicle_latitude = vehicle_location.get(
                "latitude"
            )

            vehicle_longitude = vehicle_location.get(
                "longitude"
            )

            if (
                vehicle_latitude is None
                or vehicle_longitude is None
            ):
                continue


            # --------------------------------
            # 4. Calculate distance
            # --------------------------------

            distance = self.calculate_distance(
                latitude,
                longitude,
                vehicle_latitude,
                vehicle_longitude
            )


            # --------------------------------
            # 5. Check maximum range
            # --------------------------------

            if distance > self.MAX_DISTANCE_KM:
                continue


            # --------------------------------
            # Eligible captain
            # --------------------------------

            eligible.append({

                "captain_id": str(
                    vehicle["captain_id"]
                ),

                "vehicle_id": str(
                    vehicle["_id"]
                ),

                "vehicle_number": vehicle.get(
                    "vehicle_number"
                ),

                "vehicle_type": vehicle.get(
                    "vehicle_type"
                ),

                "capacity": vehicle_capacity,

                "distance_km": round(
                    distance,
                    2
                )
            })


        # Closest captain first

        eligible.sort(
            key=lambda x: x["distance_km"]
        )

        return eligible


    def calculate_required_capacity(self, report):

        garbage_count = report.get(
            "garbage_count",
            0
        )

        coverage = report.get(
            "coverage",
            0
        )

        # Temporary estimation
        # 1 detected object ≈ 100L

        estimated_capacity = (
            garbage_count * 100
        )

        # Increase requirement for high coverage

        if coverage >= 60:
            estimated_capacity *= 2

        elif coverage >= 30:
            estimated_capacity *= 1.5

        return estimated_capacity