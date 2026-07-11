class DispatchEngine:

    def __init__(self):

        self.vehicles = [

            {
                "id": 1,
                "vehicle_no": "TS09GV101",
                "vehicle_type": "Mixed",
                "driver": "Ramesh",
                "phone": "9876543210",
                "status": "Available"
            },

            {
                "id": 2,
                "vehicle_no": "TS09GV102",
                "vehicle_type": "Plastic",
                "driver": "Suresh",
                "phone": "9876543211",
                "status": "Available"
            },

            {
                "id": 3,
                "vehicle_no": "TS09GV103",
                "vehicle_type": "Metal",
                "driver": "Mahesh",
                "phone": "9876543212",
                "status": "Busy"
            },

            {
                "id": 4,
                "vehicle_no": "TS09GV104",
                "vehicle_type": "Organic",
                "driver": "Kiran",
                "phone": "9876543213",
                "status": "Available"
            },

            {
                "id": 5,
                "vehicle_no": "TS09GV105",
                "vehicle_type": "Mixed",
                "driver": "Arjun",
                "phone": "9876543214",
                "status": "Available"
            }

        ]
    def find_matching_vehicles(self, waste_type):

        matched = []

        for vehicle in self.vehicles:

            if (
                vehicle["vehicle_type"] == waste_type and
                vehicle["status"] == "Available"
            ):
                matched.append(vehicle)

        return matched

    import random 
    def assign_vehicle(self, waste_type):

        matching = self.find_matching_vehicles(waste_type)

        if not matching:
            return None

        # Simulate the first vehicle accepting the request
        accepted_vehicle = self.random.choice(matching)

        accepted_vehicle["status"] = "Assigned"

        return accepted_vehicle