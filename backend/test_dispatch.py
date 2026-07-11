from app.dispatch import DispatchEngine

dispatch = DispatchEngine()

vehicle = dispatch.assign_vehicle("Mixed")

print(vehicle)