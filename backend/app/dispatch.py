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
            },
            
            {
                "id": 6,
                "vehicle_no": "TS09GV106",
                "vehicle_type": "Mixed",
                "driver": "Naveen",
                "phone": "9876543215",
                "status": "Maintenance"
            },
            {
                "id": 7,
                "vehicle_no": "TS09GV107",
                "vehicle_type": "Mixed",
                "driver": "Kiran",
                "phone": "9876543216",
                "status": "Available"
            },
            {
                "id": 8,
                "vehicle_no": "TS09GV108",
                "vehicle_type": "Mixed",
                "driver": "Praveen",
                "phone": "9876543217",
                "status": "On Duty"
            },
            {
                "id": 9,
                "vehicle_no": "TS09GV109",
                "vehicle_type": "Organic",
                "driver": "Rakesh",
                "phone": "9876543218",
                "status": "Available"
            },
            {
                "id": 10,
                "vehicle_no": "TS09GV110",
                "vehicle_type": "Plastic",
                "driver": "Vijay",
                "phone": "9876543219",
                "status": "Available"
            },
            {
                "id": 11,
                "vehicle_no": "TS09GV111",
                "vehicle_type": "Mixed",
                "driver": "Santosh",
                "phone": "9876543220",
                "status": "Available"
            },
            {
                "id": 12,
                "vehicle_no": "TS09GV112",
                "vehicle_type": "Mixed",
                "driver": "Deepak",
                "phone": "9876543221",
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