from app.utils.geo_utils import calculate_distance

garbage_lat = 17.3850
garbage_lon = 78.4867

vehicle_lat = 17.3900
vehicle_lon = 78.4800

distance = calculate_distance(
    garbage_lat,
    garbage_lon,
    vehicle_lat,
    vehicle_lon
)

print("Distance:", round(distance, 2), "km")